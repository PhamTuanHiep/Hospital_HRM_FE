import { List, Modal } from "antd";
import { ContractHistoryDetail } from "../../../../../../common/common.type";

import { useTranslation } from "react-i18next";
import { deleteContractHistory } from "../../../../../../api/apiServices";
import { useMemo } from "react";
import i18n from "../../../../../../utils/i18n";

interface DeleteContractHistoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  contractHistory: ContractHistoryDetail;
  confirmLoading: boolean;
}
const DeleteContractHistoryModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  contractHistory,
  confirmLoading,
}: DeleteContractHistoryModalProps) => {
  const { t } = useTranslation();
  const isVN = useMemo(() => i18n.language === "vi", [i18n.language]);

  const handleOk = async () => {
    const res = await deleteContractHistory(contractHistory.contractHistoryId);
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
          isVN
            ? contractHistory.contract?.contractNameVI
            : contractHistory.contract?.contractNameEN
        }?`}
      </List>
    </Modal>
  );
};
export default DeleteContractHistoryModal;
