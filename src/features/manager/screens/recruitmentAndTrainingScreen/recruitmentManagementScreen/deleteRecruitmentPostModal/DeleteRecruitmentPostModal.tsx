import { List, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { RecruitmentPostDetail } from "../../../../../../common/common.type";
import { deleteRecruitmentPost } from "../../../../../../api/apiServices";

interface DeleteRecruitmentPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  recruitmentPost: RecruitmentPostDetail;
  confirmLoading: boolean;
}
const DeleteRecruitmentPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  recruitmentPost,
  confirmLoading,
}: DeleteRecruitmentPostModalProps) => {
  const { t } = useTranslation();

  const handleOk = async () => {
    const res = await deleteRecruitmentPost(recruitmentPost.recruitmentPostId);

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
      title={t("content.recruitmentPost.DeleteRecruitment")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>{`${t("content.recruitmentPost.AskAboutDeleteRecruitmentPost")}: ${
        recruitmentPost.title
      } ?`}</List>
    </Modal>
  );
};
export default DeleteRecruitmentPostModal;
