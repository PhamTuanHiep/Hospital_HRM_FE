import { List, Modal } from "antd";
import { DepartmentDetail } from "../../../../../../common/common.type";
import { deleteDepartment } from "../../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

interface DeleteDepartmentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  department: DepartmentDetail;
  confirmLoading: boolean;
}
const DeleteDepartmentModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  department,
  confirmLoading,
}: DeleteDepartmentModalProps) => {
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
export default DeleteDepartmentModal;
