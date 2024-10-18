import { List, Modal } from "antd";
import { PositionDetail } from "../../../../../../common/common.type";
import { deletePosition } from "../../../../../../api/apiServices";

interface DeleteJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  position: PositionDetail;
  confirmLoading: boolean;
}
const DeleteJobModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  position,
  confirmLoading,
}: DeleteJobModalProps) => {
  const handleOk = async () => {
    const res = await deletePosition(position.positionId);
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
      title="Delete position"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <List>Would you like delete department: {position.positionName}</List>
    </Modal>
  );
};
export default DeleteJobModal;
