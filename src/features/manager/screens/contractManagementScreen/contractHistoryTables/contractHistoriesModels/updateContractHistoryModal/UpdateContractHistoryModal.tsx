import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
} from "antd";
import { useEffect, useMemo } from "react";
import { ContractHistoryDetail } from "../../../../../../../common/common.type";
import {
  deleteContractHistory,
  putContractHistory,
} from "../../../../../../../api/apiServices";
import { UpdateContractHistoryFormType } from "../../../../../constants/manager.type";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  ContractStatus,
  DEFAULT_DATE_FORMAT,
} from "../../../../../../../common/common.constant";
import { parseDate } from "../../../../../../../common/common.helper";
import {
  ContractModalType,
  ContractType,
  optionContractStatusType,
} from "../../../../../constants/manager.constant";

interface UpdateContractHistoryModalProps {
  modalKey: string | number;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  contractHistory: ContractHistoryDetail;
  confirmLoading: boolean;
  contractModalType?: number;
}
const UpdateContractHistoryModal = ({
  modalKey,
  isModalOpen,
  setIsModalOpen,
  setReset,
  contractHistory,
  confirmLoading,
  contractModalType,
}: UpdateContractHistoryModalProps) => {
  const isTermContract =
    contractHistory.contract.contractId !==
      ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT &&
    contractHistory.contract.contractId !==
      ContractType.INDEFINITE_TERM_LABOR_CONTRACT;

  const [extendContractForm] = Form.useForm();
  const { t } = useTranslation();
  const dateFormatList = [DEFAULT_DATE_FORMAT];

  const defaultValues = useMemo(() => {
    return {
      contractName: contractHistory.contract.contractNameVI,
      userName: contractHistory.user.fullName,
      positionName: contractHistory.user.position.positionName,
      departmentName: contractHistory.user.department.departmentName,
      status: contractHistory.status,
      startDay: parseDate(contractHistory.startDay),
      endDay: parseDate(contractHistory.endDay),
    };
  }, [contractHistory]);

  useEffect(() => {
    extendContractForm.setFieldsValue(defaultValues);
  }, [extendContractForm, defaultValues]);

  const onFinish: FormProps<UpdateContractHistoryFormType>["onFinish"] = async (
    values
  ) => {
    console.log("values:", values);
    if (contractModalType === ContractModalType.DELETE) {
      const res = await deleteContractHistory(
        contractHistory.contractHistoryId
      );
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
    } else {
      let updateContractHistory = {};
      if (contractModalType === ContractModalType.EXTEND) {
        updateContractHistory = {
          startDay: dayjs(values.startDay).format(DEFAULT_DATE_FORMAT),
          endDay: dayjs(values.endDay).format(DEFAULT_DATE_FORMAT),
        };
      } else if (contractModalType === ContractModalType.CANCEL) {
        updateContractHistory = {
          status: ContractStatus.CANCELLED,
        };
      } else {
        updateContractHistory = {
          status: values.status,
        };
      }
      const res = await putContractHistory(
        contractHistory.contractHistoryId,
        updateContractHistory
      );
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
    }
  };

  const onFinishFailed: FormProps<UpdateContractHistoryFormType>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

  const handleOk = () => {
    extendContractForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("cancel");
  };

  const getTitleModal = (contractModalType?: number): string => {
    if (contractModalType === ContractModalType.EXTEND) {
      return t("content.contract.AskAboutExtendContractHistory");
    } else if (contractModalType === ContractModalType.TERMINATE) {
      return t("content.contract.AskAboutTerminateContractHistory");
    } else if (contractModalType === ContractModalType.CANCEL) {
      return t("content.contract.AskAboutCancelContractHistory");
    } else if (contractModalType === ContractModalType.DELETE) {
      return t("content.contract.AskAboutDeleteContractHistory");
    } else return "";
  };
  // console.log("optionContractStatusType:", optionContractStatusType);

  return (
    <Modal
      key={modalKey}
      title={getTitleModal(contractModalType)}
      open={isModalOpen}
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
        form={extendContractForm}
        id="extend_contract_form"
        name="extend_contract_form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<UpdateContractHistoryFormType>
          label={t("content.contract.ContractName")}
          name="contractName"
          key="contractName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<UpdateContractHistoryFormType>
          label={t("content.contract.FullName")}
          name="userName"
          key="userName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<UpdateContractHistoryFormType>
          label={t("content.contract.PositionName")}
          name="positionName"
          key="positionName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<UpdateContractHistoryFormType>
          label={t("content.contract.DepartmentName")}
          name="departmentName"
          key="departmentName"
        >
          <Input disabled />
        </Form.Item>
        {contractModalType ? (
          <div></div>
        ) : (
          <Form.Item<UpdateContractHistoryFormType>
            // label={t("content.info.Role")}
            label={t("content.contract.ContractStatus")}
            name="status"
            key="status"
            rules={[
              { required: true, message: "Please input your contract type!" },
            ]}
          >
            <Select
              options={optionContractStatusType}
              // onChange={handleChangeContractStatusType}
            />
          </Form.Item>
        )}
        {isTermContract ? (
          <div>
            <Form.Item<UpdateContractHistoryFormType>
              label={t("content.contract.StartDay")}
              name="startDay"
              key="startDay"
            >
              <DatePicker
                className="input-profile-item"
                format={dateFormatList}
                disabled={contractModalType !== ContractModalType.EXTEND}
              />
            </Form.Item>
            <Form.Item<UpdateContractHistoryFormType>
              label={t("content.contract.EndDay")}
              name="endDay"
              key="endDay"
            >
              <DatePicker
                className="input-profile-item"
                format={dateFormatList}
                disabled={contractModalType !== ContractModalType.EXTEND}
              />
            </Form.Item>
          </div>
        ) : (
          <div></div>
        )}
      </Form>
    </Modal>
  );
};
export default UpdateContractHistoryModal;
