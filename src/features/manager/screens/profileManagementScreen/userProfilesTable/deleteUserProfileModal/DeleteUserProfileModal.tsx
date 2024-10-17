import { List, Modal } from "antd";
import { UserDetail } from "../../../../../../common/common.type";
import { deleteUser } from "../../../../../../api/apiServices";

interface DeleteUserProfileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  user: UserDetail;
  confirmLoading: boolean;
}
const DeleteUserProfileModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  user,
  confirmLoading,
}: DeleteUserProfileModalProps) => {
  const handleOk = async () => {
    const res = await deleteUser(user.userId);
    if (res?.data.affected != 0) {
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

  console.log(" user:", user);
  return (
    <Modal
      title="Delete User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <List>Would you like delete user: {user.fullName}</List>
    </Modal>
  );
};
export default DeleteUserProfileModal;
