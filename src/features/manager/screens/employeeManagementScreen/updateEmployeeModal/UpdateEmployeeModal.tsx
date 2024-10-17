import { Button, Flex, Form, FormProps, Input, Modal, Select } from "antd";
import { UserDetail, UserPost } from "../../../../../common/common.type";
import { useEffect, useMemo } from "react";
import { GenderId, GenderName } from "../../../../../common/common.constant";
import {
  departmentOptions,
  positionOptions,
  weeklyScheduleOptions,
} from "../../../constants/manager.help";
import { putUser } from "../../../../../api/apiServices";

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

  const onFinish: FormProps<UserPost>["onFinish"] = async (values) => {
    const { email, ...employeeUpdate } = values as UserPost;
    const res = await putUser(employee.userId, employeeUpdate);
    console.log(res);
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
      title="Update Employee"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-model "
      okText={
        <Button
          form="updateEmployeeForm"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      }
    >
      <Form
        form={form}
        id="addUserForm"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Flex vertical={false} justify="space-between" wrap>
          <Form.Item<UserPost> label="Full Name" name="fullName">
            <Input className="input-profile-item" disabled />
          </Form.Item>
          <Form.Item<UserPost> label="email" name="email">
            <Input className="input-profile-item" disabled />
          </Form.Item>

          <Form.Item<UserPost> label="Gender" name="gender">
            <Select
              className="input-profile-item"
              options={[
                { value: GenderId.FEMALE, label: GenderName.FEMALE },
                { value: GenderId.MALE, label: GenderName.MALE },
              ]}
            />
          </Form.Item>

          <Form.Item<UserPost> label="PositionName" name="positionId">
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={positionOptions}
            />
          </Form.Item>
          <Form.Item<UserPost> label="DepartmentName" name="departmentId">
            <Select
              className="input-profile-item"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={departmentOptions}
            />
          </Form.Item>
          <Form.Item<UserPost> label="Weekly Schedule" name="weeklySchedule">
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
          <Form.Item<UserPost> label="Job Description" name="jobDescription">
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost>
            label="Other Description"
            name="otherDescription"
          >
            <Input className="input-profile-item" />
          </Form.Item>
          <Form.Item<UserPost> label="Status" name="status">
            <Input className="input-profile-item" />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};
export default UpdateEmployeeModal;
