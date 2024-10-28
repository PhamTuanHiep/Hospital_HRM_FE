import { Button, DatePicker, Form, FormProps, Input, Modal } from "antd";
import { useEffect, useMemo } from "react";
import { ContractHistoryDetail } from "../../../../../../common/common.type";
import { putContractHistory } from "../../../../../../api/apiServices";
import {
  ContractHistoryForm,
  ContractHistoryPost,
} from "../../../../constants/manager.type";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface UpdateContractHisotryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  contractHistory: ContractHistoryDetail;
  confirmLoading: boolean;
}
const UpdateContractHisotryModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  contractHistory,
  confirmLoading,
}: UpdateContractHisotryModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const dateFormatList = ["DD/MM/YYYY"];

  const defaultValues = useMemo(() => {
    return {
      contractId: contractHistory.contract?.contractId,
      startDay: [dayjs(contractHistory.startDay, dateFormatList)],
      endDay: dayjs(contractHistory.endDay, dateFormatList),
      note: contractHistory.note,
    };
  }, [contractHistory]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<ContractHistoryPost>["onFinish"] = async (
    values
  ) => {
    const contractHistoryUpdate = values;

    values.startDay = dayjs(values.startDay).format("DD/MM/YYYY");
    values.endDay = dayjs(values.endDay).format("DD/MM/YYYY");

    const res = await putContractHistory(
      contractHistory.contractHistoryId,
      contractHistoryUpdate
    );
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<ContractHistoryForm>["onFinishFailed"] = (
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<ContractHistoryPost>
          label={t("content.contract.StartDay")}
          name="startDay"
        >
          <DatePicker className="input-profile-item" format={dateFormatList} />
        </Form.Item>

        <Form.Item<ContractHistoryPost>
          label={t("content.contract.EndDay")}
          name="endDay"
          rules={[{ required: true, message: "Please input your EndDay!" }]}
        >
          <DatePicker className="input-profile-item" format={dateFormatList} />
        </Form.Item>

        <Form.Item<ContractHistoryPost>
          label={t("content.common.Note")}
          name="note"
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
export default UpdateContractHisotryModal;
