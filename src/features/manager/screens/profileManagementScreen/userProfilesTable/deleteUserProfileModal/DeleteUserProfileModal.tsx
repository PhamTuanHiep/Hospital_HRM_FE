import { List, Modal } from "antd";
import { UserDetail } from "../../../../../../common/common.type";
import { deleteUser } from "../../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  return (
    <Modal
      title={t("content.common.DeleteUserInfo")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>{`${t("content.common.UserDeletionWarning")}: ${
        user.fullName
      }`}</List>
    </Modal>
  );
};
export default DeleteUserProfileModal;
