import { Button, Flex, Form, FormProps, Input, Modal, Select } from "antd";
import {
  DepartmentDetail,
  PositionDetail,
  UserDetail,
  UserPost,
} from "../../../../../common/common.type";
import { useEffect, useMemo, useState } from "react";
import {
  GenderId,
  GenderName,
  INIT_DEPARTMENT,
  INIT_POSITION,
} from "../../../../../common/common.constant";
import { weeklyScheduleOptions } from "../../../constants/manager.help";
import {
  getDepartments,
  getPositions,
  putUser,
} from "../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

interface UpdateEmployeeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  employee: UserDetail;
  confirmLoading: boolean;
}
const UpdateEmployeeModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  employee,
  confirmLoading,
}: UpdateEmployeeModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [departments, setDepartments] = useState<DepartmentDetail[]>([
    INIT_DEPARTMENT,
  ]);
  const [positions, setPositions] = useState<PositionDetail[]>([INIT_POSITION]);

  const fetchDepartments = async () => {
    const res = await getDepartments();
    if (res) {
      const departmentsApi = res.data.data as DepartmentDetail[];
      setDepartments(departmentsApi);
    }
  };
  const fetchPositions = async () => {
    const res = await getPositions();
    if (res) {
      const positionsApi = res.data.data as PositionDetail[];
      setPositions(positionsApi);
    }
  };
  const departmentOptions = useMemo(() => {
    return departments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName,
    }));
  }, [departments]);
  const positionOptions = useMemo(() => {
    return positions.map((position) => ({
      value: position.positionId,
      label: position.positionName,
    }));
  }, [positions]);

  const defaultValues = useMemo(() => {
    return {
      email: employee.account?.email,
      fullName: employee.fullName,
      gender: employee.gender,
      positionId: employee.position?.positionId,
      departmentId: employee.department?.departmentId,
      weeklySchedule: employee.weeklySchedule,
      jobDescription: employee.jobDescription,
      otherDescription: employee.otherDescription,
      status: employee.status || "Đang làm",
    };
  }, [employee]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const onFinish: FormProps<UserPost>["onFinish"] = async (values) => {
    const { email, ...employeeUpdate } = values as UserPost;
    const res = await putUser(employee.userId, employeeUpdate);
    if (res?.data.affected != 0) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<UserPost>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeWeeklySchedule = (value: number[]) => {
    console.log(`selected ${value}`);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={t("content.employee.UpdateEmployeeTitle")}
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-modal"
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          form="update_employee_form"
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={handleOk}
        >
          {t("content.common.Submit")}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="update_employee_form"
        name="update_employee_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Flex vertical={false} justify="space-between" wrap>
          <Form.Item<UserPost>
            label={t("content.info.FullName")}
            name="fullName"
          >
            <Input className="input-profile-item" disabled />
          </Form.Item>
          <Form.Item<UserPost> label={t("content.info.Email")} name="email">
            <Input className="input-profile-item" disabled />
          </Form.Item>

          <Form.Item<UserPost> label={t("content.info.Gender")} name="gender">
            <Select
              className="input-profile-item"
              options={[
                {
                  value: GenderId.FEMALE,
                  label: t(`content.common.${GenderName.FEMALE}`),
                },
                {
                  value: GenderId.MALE,
                  label: t(`content.common.${GenderName.MALE}`),
                },
              ]}
            />
          </Form.Item>

          <Form.Item<UserPost>
            label={t("content.info.PositionName")}
            name="positionId"
          >
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={positionOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.DepartmentName")}
            name="departmentId"
          >
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={departmentOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.WeeklySchedule")}
            name="weeklySchedule"
          >
            <Select
              className="input-profile-item"
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChangeWeeklySchedule}
              options={weeklyScheduleOptions}
            />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.JobDescription")}
            name="jobDescription"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label={t("content.info.OtherDescription")}
            name="otherDescription"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost> label={t("content.info.Status")} name="status">
            <Input className="input-profile-item" />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
export default UpdateEmployeeModal;
