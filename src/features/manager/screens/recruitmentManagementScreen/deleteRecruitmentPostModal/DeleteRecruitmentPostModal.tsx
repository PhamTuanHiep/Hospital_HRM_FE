import { List, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface DeleteRecruitmentPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  department: DepartmentDetail;
  confirmLoading: boolean;
}
const DeleteRecruitmentPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  department,
  confirmLoading,
}: DeleteRecruitmentPostModalProps) => {
  const { t } = useTranslation();

  const handleOk = async () => {
    const res = await deleteDepartment(department.departmentId);
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
      title={t("content.department.DeleteDepartment")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>{`${t("content.department.AskAboutDeleteDepartment")}: ${
        department.departmentName
      }`}</List>
    </Modal>
  );
};
export default DeleteRecruitmentPostModal;
