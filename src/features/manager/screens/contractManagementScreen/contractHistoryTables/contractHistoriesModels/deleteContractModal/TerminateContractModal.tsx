import { List, Modal } from "antd";
import { ContractDetail } from "../../../../../../../common/common.type";

import { useTranslation } from "react-i18next";
import { deleteContract } from "../../../../../../../api/apiServices";
import { useMemo } from "react";
import i18n from "../../../../../../../utils/i18n";

interface TerminateContractModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  contract: ContractDetail;
  confirmLoading: boolean;
}
const TerminateContractModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  contract,
  confirmLoading,
}: TerminateContractModalProps) => {
  const { t } = useTranslation();
  const isVN = useMemo(() => i18n.language === "vi", [i18n.language]);

  const handleOk = async () => {
    const res = await deleteContract(contract.contractId);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    } else {
      setIsModalOpen(false);
      alert("Delete Fail !");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={t("content.contract.DeleteContractHistoryTile")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>
        {" "}
        {` ${t("content.contract.AskAboutDeleteContractHistory")}: ${
          isVN ? contract.contractNameVI : contract.contractNameEN
        }?`}
      </List>
    </Modal>
  );
};
export default TerminateContractModal;
