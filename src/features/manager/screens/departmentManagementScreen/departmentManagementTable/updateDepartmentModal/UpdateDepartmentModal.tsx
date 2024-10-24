import { Button, Form, FormProps, Input, Modal } from "antd";

import { useEffect, useMemo } from "react";
import { DepartmentDetail } from "../../../../../../common/common.type";
import { DepartmentForm } from "../../../../constants/manager.type";
import { putDepartment } from "../../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

interface UpdateDepartmentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  department: DepartmentDetail;
  confirmLoading: boolean;
}
const UpdateDepartmentModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  department,
  confirmLoading,
}: UpdateDepartmentModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const defaultValues = useMemo(() => {
    return {
      departmentId: `${department.departmentId}`,
      departmentName: `${department.departmentName}`,
      location: `${department.location}`,
      funcDescription: `${department.funcDescription}`,
    };
  }, [department]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<DepartmentForm>["onFinish"] = async (values) => {
    const departmentUpdate = values as DepartmentForm;
    const res = await putDepartment(department.departmentId, departmentUpdate);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<DepartmentForm>["onFinishFailed"] = (
    errorInfo
  ) => {
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
      title={t("content.department.UpdateDepartmentTitle")}
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          form="updateDepartmentForm"
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
        id="updateDepartmentForm"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<DepartmentForm>
          label={t("content.department.DepartmentId")}
          name="departmentId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<DepartmentForm>
          label={t("content.department.DepartmentName")}
          name="departmentName"
          rules={[
            { required: true, message: "Please input your departmentName!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<DepartmentForm>
          label={t("content.department.Location")}
          name="location"
          rules={[{ required: true, message: "Please input location!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DepartmentForm>
          label={t("content.department.FuncDescription")}
          name="funcDescription"
          rules={[{ required: true, message: "Please input funcDescription!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateDepartmentModal;
