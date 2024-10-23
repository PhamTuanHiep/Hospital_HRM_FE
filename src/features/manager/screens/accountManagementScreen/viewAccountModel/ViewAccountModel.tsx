import { Form, Input, Modal, Select } from "antd";
import { AccountDetail, AccountForm } from "../../../../../common/common.type";
import { RoleId, RoleName } from "../../../../../common/common.constant";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ViewAccountModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  account: AccountDetail;
  confirmLoading: boolean;
}
const ViewAccountModal = ({
  isModalOpen,
  setIsModalOpen,
  account,
  confirmLoading,
}: ViewAccountModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={t("content.common.ViewAccountTitle")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{
          email: `${account.email}`,
          password: `${account.password}`,
          roleId: `${account.role?.roleId}`,
        }}
      >
        <Form.Item<AccountForm> label={t("content.info.Email")} name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item<AccountForm>
          label={t("content.info.Password")}
          name="password"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<AccountForm> label={t("content.info.Role")} name="roleId">
          <Select
            options={[
              { value: RoleId.ADMIN, label: RoleName.ADMIN },
              { value: RoleId.MANAGER, label: RoleName.MANAGER },
              { value: RoleId.USER, label: RoleName.USER },
            ]}
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ViewAccountModal;
