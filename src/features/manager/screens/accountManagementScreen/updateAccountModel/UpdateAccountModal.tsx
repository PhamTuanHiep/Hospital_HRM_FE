import { Button, Form, FormProps, Input, Modal, Select } from "antd";

import { Account, AccountDetail } from "../../../../../common/common.type";
import { RoleId, RoleName } from "../../../../../common/common.constant";
import { putAccount } from "../../../../../api/apiServices";
import { useEffect, useMemo } from "react";

interface UpdateAccountModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  account: AccountDetail;
  confirmLoading: boolean;
}
const UpdateAccountModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  account,
  confirmLoading,
}: UpdateAccountModalProps) => {
  const [form] = Form.useForm();

  const defaultValues = useMemo(() => {
    return {
      email: `${account.email}`,
      password: `${account.password}`,
      roleId: `${account.role?.roleId}`,
    };
  }, [account]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<Account>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const accountUpdate = values as Account;
    const res = await putAccount(account.accountId, accountUpdate);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<Account>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Update Account"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={
        <Button
          form="myForm"
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
        id="myForm"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          email: `${account.email}`,
          password: `${account.password}`,
          roleId: `${account.role?.roleId}`,
        }}
      >
        <Form.Item<Account>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<Account>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<Account>
          label="Role"
          name="roleId"
          rules={[{ required: true, message: "Please input your role!" }]}
        >
          <Select
            options={[
              { value: RoleId.ADMIN, label: RoleName.ADMIN },
              { value: RoleId.MANAGER, label: RoleName.MANAGER },
              { value: RoleId.USER, label: RoleName.USER },
            ]}
          />
        </Form.Item>

        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
export default UpdateAccountModal;
