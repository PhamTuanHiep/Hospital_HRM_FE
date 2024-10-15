import { Button, Form, FormProps, Input, List, Modal, Select } from "antd";

import { Account, AccountDetail } from "../../../../../common/common.type";
import { RoleId, RoleName } from "../../../../../common/common.constant";
import { deleteAccount, putAccount } from "../../../../../api/apiServices";

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

  console.log(" account:", account);
  return (
    <Modal
      title="Update Account"
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
