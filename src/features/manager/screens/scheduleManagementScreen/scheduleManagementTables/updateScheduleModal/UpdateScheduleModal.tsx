import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  DatePicker,
  Button,
  Form,
  Modal,
  List,
  Flex,
  SelectProps,
  Input,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { PlusOutlined } from "@ant-design/icons";
import {
  FinishOvertimeHistoryFormType,
  overtimeDurations,
  OvertimeType,
  overtimeType,
  UpdateOvertimeHistoryFormType,
} from "../../../../constants/manager.type";
import { DefaultOptionType } from "antd/es/select";
import {
  DepartmentDetail,
  DepartmentUserShortInfo,
} from "../../../../../../common/common.type";
import {
  DEFAULT_DATE_FORMAT,
  TIME_FORMATS,
} from "../../../../../../common/common.constant";
import {
  deleteOvertimeHistory,
  postOvertimeHistory,
} from "../../../../../../api/apiServices";
import "./UpdateScheduleModal.scss";

const optionOvertimeDurations: SelectProps["options"] = Object.entries(
  overtimeType
).map(([key, value]): DefaultOptionType => {
  return {
    label: value,
    value: key,
  };
});

interface UpdateScheduleModelProps {
  modalKey?: string | number;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  confirmLoading: boolean;
  employee: DepartmentUserShortInfo;
  department: DepartmentDetail;
}

const UpdateScheduleModal = ({
  modalKey,
  isModalOpen,
  setIsModalOpen,
  setReset,
  confirmLoading,
  employee,
  department,
}: UpdateScheduleModelProps) => {
  const { t } = useTranslation();
  const [addContractHistoryForm] = Form.useForm();

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<UpdateOvertimeHistoryFormType>({});

  const [shifts, setShifts] = useState<FinishOvertimeHistoryFormType[]>([]);

  const defaultValues = useMemo(() => {
    return {
      departmentName: department.departmentName,
      overtimeId: "OT001",
      note: ["Trực thông thường, không phải tình huống khẩn cấp"],
    };
  }, [department]);

  const initOvertimeHistories = useMemo(() => {
    const filterOvertimeHistories = department?.overtimeHistories.filter(
      (overtimeHistory) => overtimeHistory.user.userId === employee?.userId
    );
    if (filterOvertimeHistories && filterOvertimeHistories.length > 0) {
      return filterOvertimeHistories?.map((filterOvertimeHistory, index) => {
        return {
          termId: index,
          overtimeHistoryId: filterOvertimeHistory.overtimeHistoryId,
          userId: filterOvertimeHistory.user.userId,
          departmentId: department.departmentId,
          note: filterOvertimeHistory.note,
          overtimeId: filterOvertimeHistory.overtime.overtimeId,
          startDay: dayjs(filterOvertimeHistory.startDay, TIME_FORMATS).format(
            DEFAULT_DATE_FORMAT
          ),
          endDay: dayjs(filterOvertimeHistory.endDay, TIME_FORMATS).format(
            DEFAULT_DATE_FORMAT
          ),
        };
      });
    } else {
      return [];
    }
  }, [department, employee]);

  const watchType = watch("overtimeId");
  const watchStartDate = watch("startDay");

  const disabledDate = (current: Dayjs) => {
    const nextWeek = dayjs().add(1, "week").startOf("week");
    const twoWeeksLater = nextWeek.add(2, "weeks").endOf("week");
    return current && (current < nextWeek || current > twoWeeksLater);
  };

  const handleTypeChange = (value: OvertimeType) => {
    setValue("overtimeId", value);
    if (watchStartDate) {
      const duration = overtimeDurations[value];
      const endDay = watchStartDate.add(duration, "hours");
      setValue("endDay", endDay);
    }
  };

  const handleStartDateChange = (date: Dayjs) => {
    setValue("startDay", date);
    if (watchType) {
      const duration = overtimeDurations[watchType as OvertimeType];
      const endDay = date.add(duration, "hours");
      setValue("endDay", endDay);
    }
  };

  const onSubmit = (data: UpdateOvertimeHistoryFormType) => {
    console.log("data:", data);
    const newOvertimeHistories = {
      termId: shifts.length,
      overtimeHistoryId: data.overtimeHistoryId,
      userId: employee.userId,
      overtimeId: data.overtimeId,
      departmentId: department?.departmentId,
      note: data.note,
      startDay: dayjs(data.startDay, TIME_FORMATS).format(DEFAULT_DATE_FORMAT),
      endDay: dayjs(data.endDay, TIME_FORMATS).format(DEFAULT_DATE_FORMAT),
    };
    setShifts([...shifts, newOvertimeHistories]);
    reset();
  };

  const handleOk = async () => {
    console.log("ok");
    console.log("onOK-shifts:", shifts);
    if (shifts && shifts.length > 0) {
      //loc overtimeHistoryIds can xoa
      const allOvertimeHistory = department.overtimeHistories.filter(
        (overtimeHistory) =>
          !shifts.some(
            (shift) =>
              shift.overtimeHistoryId === overtimeHistory.overtimeHistoryId
          )
      );
      const overtimeHistoriesNeedDelete = allOvertimeHistory.filter(
        (overtimeHistory) => overtimeHistory.user.userId === employee.userId
      );
      console.log(
        "onOK-overtimeHistoriesNeedDelete:",
        overtimeHistoriesNeedDelete
      );

      if (
        overtimeHistoriesNeedDelete &&
        overtimeHistoriesNeedDelete.length > 0
      ) {
        overtimeHistoriesNeedDelete.map(async (overtimeHistory) => {
          const res = await deleteOvertimeHistory(
            overtimeHistory.overtimeHistoryId
          );
          if (res) {
            setIsModalOpen(false);
            setReset(true);
          } else {
            console.log("deleted overtimeHistory Fail !");
          }
        });
      } else {
        console.log("Not have overtimeHistoriesNeedDelete !");
      }
      //create tung overtimeHistory
      shifts.map(async (shift) => {
        if (!shift.overtimeHistoryId) {
          const newOvertimeHistory = {
            userId: shift.userId,
            overtimeId: shift.overtimeId,
            departmentId: shift.departmentId,
            note: shift.note,
            startDay: shift.startDay,
            endDay: shift.endDay,
          };
          console.log("onOK-newOvertimeHistory:", newOvertimeHistory);

          const res = await postOvertimeHistory(newOvertimeHistory);
          if (res) {
            setIsModalOpen(false);
            setReset(true);
          } else {
            console.log("created overtimeHistory Fail !");
          }
        }
      });
    } else {
      console.log("Not have shift !");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteShiftInList = (value: FinishOvertimeHistoryFormType) => {
    const newShifts = shifts.filter((shift) => shift.termId !== value.termId);

    setShifts(newShifts);
  };
  useEffect(() => {
    addContractHistoryForm.setFieldsValue(defaultValues);
    setShifts([...initOvertimeHistories]);
  }, [addContractHistoryForm, defaultValues, initOvertimeHistories]);

  const data = shifts.map((shift, index) => (
    <div key={index}>
      <Flex justify="space-between" align="center">
        <p>Loại ca: {overtimeType[shift.overtimeId as OvertimeType]}</p>
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteShiftInList(shift)}
        >
          {t("content.common.Delete")}
        </Button>
      </Flex>
      <p>Ngày bắt đầu: {shift.startDay}</p>
      <p>Ngày kết thúc: {shift.endDay}</p>
    </div>
  ));
  console.log("shifts:", shifts);

  return (
    <Modal
      key={modalKey}
      open={isModalOpen}
      title={t("content.schedule.ShiftAdjustment")}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel} key="cancel">
          {t("content.common.Cancel")}
        </Button>,
        <Button
          form="extend_contract_form"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "50%" }}
          onClick={handleOk}
        >
          {t("content.common.Submit")}
        </Button>,
      ]}
    >
      <Form
        onFinish={handleSubmit(onSubmit)}
        form={addContractHistoryForm}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item<UpdateOvertimeHistoryFormType>
          label={t("content.contract.UserName")}
          name="departmentName"
          key="departmentName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="Loại ca trực">
          <Controller
            name="overtimeId"
            control={control}
            render={() => (
              <Select
                options={optionOvertimeDurations}
                onChange={handleTypeChange}
              ></Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Ngày bắt đầu">
          <Controller
            name="startDay"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                showTime
                disabledDate={disabledDate}
                onChange={handleStartDateChange}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="Ngày kết thúc">
          <Controller
            name="endDay"
            control={control}
            render={({ field }) => <DatePicker {...field} showTime disabled />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="dashed" onClick={handleSubmit(onSubmit)}>
            <PlusOutlined />
            Thêm ca trực
          </Button>
        </Form.Item>

        <div style={{ maxHeight: 300, overflow: "auto" }}>
          <List
            size="small"
            header={<div>Danh sách ca trực </div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateScheduleModal;
