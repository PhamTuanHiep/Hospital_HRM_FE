import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  SelectProps,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ContractHistoryDetail,
  UserDetail,
} from "../../../../../../../common/common.type";
import {
  getContractHistories,
  postContractHistory,
} from "../../../../../../../api/apiServices";
import {
  ContractHistoryPost,
  CreateContractHistoryFormType,
} from "../../../../../constants/manager.type";
import { useTranslation } from "react-i18next";

import {
  ContractStatus,
  DEFAULT_DATE_FORMAT,
  INIT_CONTRACT_HISTORY,
} from "../../../../../../../common/common.constant";

import {
  ContractType,
  optionContractType,
} from "../../../../../constants/manager.constant";
import _ from "lodash";
import { formatDateToDDMMYYYY } from "../../../../../../../common/common.helper";

interface NumberOfContract {
  numberCT01: number;
  numberCT02: number;
  numberCT03: number;
  numberCT04: number;
  numberCT05: number;
  numberCT06: number;
}
interface CreateContractHistoryModelProps {
  modalKey: string | number;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  confirmLoading: boolean;
  employee: UserDetail;
}
const CreateContractHistoryModel = ({
  modalKey,
  isModalOpen,
  setIsModalOpen,
  setReset,
  confirmLoading,
  employee,
}: CreateContractHistoryModelProps) => {
  const [addContractHistoryForm] = Form.useForm();
  const { t } = useTranslation();
  const dateFormatList = [DEFAULT_DATE_FORMAT];
  const defaultContractType = ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT;
  const [contractType, setContractType] =
    useState<ContractType>(defaultContractType);

  const [contractHistories, setContractHistories] = useState<
    ContractHistoryDetail[]
  >([INIT_CONTRACT_HISTORY]);

  const [filteredOptionContractType, setFilteredOptionContractType] =
    useState<SelectProps["options"]>(optionContractType);

  const [numberOfContracts, setNumberOfContracts] = useState<NumberOfContract>({
    numberCT01: 0,
    numberCT02: 0,
    numberCT03: 0,
    numberCT04: 0,
    numberCT05: 0,
    numberCT06: 0,
  });

  const noteValue = useMemo(() => {
    if (contractType === ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT) {
      return `Kí kết lần ${numberOfContracts.numberCT01 + 1}`;
    } else if (
      contractType === ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT
    ) {
      return `Kí kết lần ${numberOfContracts.numberCT02 + 1}`;
    } else if (contractType === ContractType.FIXED_TERM_LABOR_CONTRACT) {
      return `Kí kết lần ${numberOfContracts.numberCT03 + 1}`;
    } else if (contractType === ContractType.INDEFINITE_TERM_LABOR_CONTRACT) {
      return `Kí kết lần ${numberOfContracts.numberCT04 + 1}`;
    } else if (contractType === ContractType.COLLABORATION_CONTRACT) {
      return `Kí kết lần ${numberOfContracts.numberCT05 + 1}`;
    } else if (contractType === ContractType.PROBATIONARY_CONTRACT) {
      return `Kí kết lần ${numberOfContracts.numberCT06 + 1}`;
    } else {
      return "-";
    }
  }, [numberOfContracts, contractType]);

  const defaultValues = useMemo(() => {
    return {
      employeeName: employee.fullName,
      status: ContractStatus.ACTIVE,
      contractId: defaultContractType,
      note: noteValue,
    };
  }, [employee, defaultContractType, noteValue]);

  const isTermContract = useMemo(() => {
    return (
      contractType !== ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT &&
      contractType !== ContractType.INDEFINITE_TERM_LABOR_CONTRACT
    );
  }, [contractType]);

  const fetchContractHistories = async () => {
    const res = await getContractHistories();
    if (res) {
      const contractHistoriesApi = res.data.data;
      setContractHistories(contractHistoriesApi);
    }
  };

  const handleOptionContractType = useCallback(() => {
    const newOptionContractType = _.cloneDeep(optionContractType);

    const employeeContractHistory = contractHistories.filter(
      (contractHistory) => {
        return contractHistory.user.userId === employee.userId;
      }
    );
    const countNumberOfContract: NumberOfContract = {
      numberCT01: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT
        );
      }).length,
      numberCT02: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.INDEFINITE_TERM_EMPLOYMENT_CONTRACT
        );
      }).length,
      numberCT03: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.FIXED_TERM_LABOR_CONTRACT
        );
      }).length,
      numberCT04: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.INDEFINITE_TERM_LABOR_CONTRACT
        );
      }).length,
      numberCT05: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.COLLABORATION_CONTRACT
        );
      }).length,
      numberCT06: employeeContractHistory.filter((contractHistory) => {
        return (
          contractHistory.contract.contractId ===
          ContractType.PROBATIONARY_CONTRACT
        );
      }).length,
    };
    setNumberOfContracts(countNumberOfContract);
    if (newOptionContractType && countNumberOfContract.numberCT01 > 2) {
      const index = newOptionContractType?.findIndex(
        (obj) => obj.value === ContractType.FIXED_TERM_EMPLOYMENT_CONTRACT
      );
      if (index !== -1) {
        newOptionContractType?.splice(index, 1);
      }
    } else if (newOptionContractType && countNumberOfContract.numberCT03 > 1) {
      const index = newOptionContractType?.findIndex(
        (obj) => obj.value === ContractType.FIXED_TERM_LABOR_CONTRACT
      );
      if (index !== -1) {
        newOptionContractType?.splice(index, 1);
      }
    } else if (newOptionContractType && countNumberOfContract.numberCT06 != 0) {
      const index = newOptionContractType?.findIndex(
        (obj) => obj.value === ContractType.PROBATIONARY_CONTRACT
      );
      if (index !== -1) {
        newOptionContractType?.splice(index, 1);
      }
    }
    setFilteredOptionContractType(newOptionContractType);
  }, [contractHistories, employee]);

  const handleChangeContractType = (value: ContractType) => {
    console.log("value:", value);
    setContractType(value);
  };

  const onFinish: FormProps<CreateContractHistoryFormType>["onFinish"] = async (
    values
  ) => {
    const newContractHistory: ContractHistoryPost = {
      userId: employee.userId,
      contractId: values.contractId,
      startDay: formatDateToDDMMYYYY(values.startDay) || "",
      endDay: formatDateToDDMMYYYY(values.endDay) || "",
      note: values.note,
      status: values.status,
    };
    const res = await postContractHistory(newContractHistory);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<CreateContractHistoryFormType>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

  const handleOk = () => {
    addContractHistoryForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleOptionContractType();
  }, [contractHistories, employee, handleOptionContractType]);

  useEffect(() => {
    addContractHistoryForm.setFieldsValue(defaultValues);
  }, [addContractHistoryForm, defaultValues]);

  useEffect(() => {
    fetchContractHistories();
  }, [contractType]);

  return (
    <Modal
      key={modalKey}
      title={t("content.contract.AddContractHistory")}
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
        form={addContractHistoryForm}
        id="extend_contract_form"
        name="extend_contract_form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<CreateContractHistoryFormType>
          label={t("content.contract.UserName")}
          name="employeeName"
          key="employeeName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<CreateContractHistoryFormType>
          label={t("content.contract.ContractType")}
          name="contractId"
          key="contractId"
          rules={[
            { required: true, message: "Please input your contract type!" },
          ]}
        >
          <Select
            options={filteredOptionContractType}
            onChange={handleChangeContractType}
          />
        </Form.Item>
        {isTermContract ? (
          <div>
            <Form.Item<CreateContractHistoryFormType>
              label={t("content.contract.StartDay")}
              name="startDay"
              key="startDay"
            >
              <DatePicker
                className="input-profile-item"
                format={dateFormatList}
              />
            </Form.Item>
            <Form.Item<CreateContractHistoryFormType>
              label={t("content.contract.EndDay")}
              name="endDay"
              key="endDay"
            >
              <DatePicker
                className="input-profile-item"
                format={dateFormatList}
              />
            </Form.Item>
          </div>
        ) : (
          <div></div>
        )}

        <Form.Item<CreateContractHistoryFormType>
          label={t("content.contract.Note")}
          name="note"
          key="note"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateContractHistoryModel;
