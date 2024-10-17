import { List, Modal } from "antd";
import { DepartmentDetail } from "../../../../../common/common.type";
import { deleteDepartment } from "../../../../../api/apiServices";

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
      title="Delete department"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <List>Would you like delete department: {department.departmentName}</List>
    </Modal>
  );
};
export default DeleteDepartmentModal;
