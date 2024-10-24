import { List, Modal } from "antd";
import { PositionDetail } from "../../../../../../common/common.type";
import { deletePosition } from "../../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      title={t("content.position.DeletePositionTitle")}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <List>
        {" "}
        {` ${t("content.position.AskAboutDeletePosition")}: ${
          position.positionName
        }?`}
      </List>
    </Modal>
  );
};
export default DeleteJobModal;
