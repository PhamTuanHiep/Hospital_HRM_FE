import { List, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { AnnouncementPostDetail } from "../../../../../common/common.type";
import { deleteAnnouncementPost } from "../../../../../api/apiServices";

interface DeleteAnnouncementPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  announcementPost: AnnouncementPostDetail;
  confirmLoading: boolean;
}
const DeleteAnnouncementPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  announcementPost,
  confirmLoading,
}: DeleteAnnouncementPostModalProps) => {
  const { t } = useTranslation();

  const handleOk = async () => {
    const res = await deleteAnnouncementPost(
      announcementPost.announcementPostId
    );

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
      title={t("content.announcementPost.DeleteAnnouncement")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>{`${t(
        "content.announcementPost.AskAboutDeleteAnnouncementPost"
      )}: ${announcementPost.title}`}</List>
    </Modal>
  );
};
export default DeleteAnnouncementPostModal;
