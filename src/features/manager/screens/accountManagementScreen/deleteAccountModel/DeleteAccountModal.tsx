import { List, Modal } from "antd";
import { AccountDetail } from "../../../../../common/common.type";
import { deleteAccount } from "../../../../../api/apiServices";

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
      title="Delete Account"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <List>Would you like delete account: {account.email}</List>
    </Modal>
  );
};
export default DeleteAccountModal;
