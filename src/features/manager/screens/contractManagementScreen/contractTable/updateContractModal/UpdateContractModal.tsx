import { Button, Form, FormProps, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { ContractDetail } from "../../../../../../common/common.type";
import { putContract } from "../../../../../../api/apiServices";
import { ContractForm } from "../../../../constants/manager.type";
import { useTranslation } from "react-i18next";

interface UpdateContractModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  contract: ContractDetail;
  confirmLoading: boolean;
}
const UpdateContractModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  contract,
  confirmLoading,
}: UpdateContractModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const defaultValues = useMemo(() => {
    return {
      contractId: contract.contractId,
      contractNameVI: contract.contractNameVI,
      contractNameEN: contract.contractNameEN,
    };
  }, [contract]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<ContractForm>["onFinish"] = async (values) => {
    console.log("values onFinish:", values);
    const { contractId, ...contractUpdate } = values;

    const res = await putContract(contractId, contractUpdate);
    if (res) {
      console.log("res onFinish:", res);

      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<ContractForm>["onFinishFailed"] = (
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
      title={t("content.contract.UpdateContractHistoryTitle")}
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          form="updateContractHistoryForm"
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
        form={form}
        id="updateContractHistoryForm"
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ContractForm>
          label={t("content.contract.ContractId")}
          name="contractId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<ContractForm>
          label={t("content.contract.ContractNameVI")}
          name="contractNameVI"
          rules={[
            { required: true, message: "Please input your ContractNameVI!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ContractForm>
          label={t("content.contract.ContractNameEN")}
          name="contractNameEN"
          rules={[{ required: true, message: "Please input ContractNameEN!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateContractModal;
