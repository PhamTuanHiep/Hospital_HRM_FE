import { Button, Form, FormProps, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { PositionDetail } from "../../../../../../common/common.type";
import { putPosition } from "../../../../../../api/apiServices";
import { PositionForm } from "../../../../constants/manager.type";

interface UpdateJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  position: PositionDetail;
  confirmLoading: boolean;
}
const UpdateJobModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  position,
  confirmLoading,
}: UpdateJobModalProps) => {
  const [form] = Form.useForm();

  const defaultValues = useMemo(() => {
    return {
      positionId: `${position.positionId}`,
      positionName: `${position.positionName}`,
      salaryCoefficient: `${position.salaryCoefficient}`,
    };
  }, [position]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<PositionForm>["onFinish"] = async (values) => {
    const positionUpdate = values as PositionForm;
    const res = await putPosition(position.positionId, positionUpdate);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<PositionForm>["onFinishFailed"] = (
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
      title="Update Position"
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button
          form="updatePositionForm"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "50%" }}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="updatePositionForm"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<PositionForm> label="positionId" name="positionId">
          <Input disabled />
        </Form.Item>

        <Form.Item<PositionForm>
          label="positionName"
          name="positionName"
          rules={[
            { required: true, message: "Please input your positionName!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<PositionForm>
          label="salaryCoefficient"
          name="salaryCoefficient"
          rules={[
            { required: true, message: "Please input salaryCoefficient!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateJobModal;
