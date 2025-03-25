import { List, Modal } from "antd";

import { useTranslation } from "react-i18next";
import { AccountDetail } from "../../../../../../common/common.type";
import { deleteAccount } from "../../../../../../api/apiServices";

interface DeleteAccountModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  account: AccountDetail;
  confirmLoading: boolean;
}
const DeleteAccountModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  account,
  confirmLoading,
}: DeleteAccountModalProps) => {
  const { t } = useTranslation();

  const handleOk = async () => {
    const res = await deleteAccount(account.accountId);
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
      title={t("content.common.DeleteAccountTitle")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>
        {t("content.common.AskAboutDeleteAccount")}: {account.email} ?
      </List>
    </Modal>
  );
};
export default DeleteAccountModal;
