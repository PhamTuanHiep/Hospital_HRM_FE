import { Button, Flex, List, Modal, Typography } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import "./HinderDeleteJobModal.scss";

interface HinderDeleteJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  confirmLoading: boolean;
}
const HinderDeleteJobModal = ({
  isModalOpen,
  setIsModalOpen,
  confirmLoading,
}: HinderDeleteJobModalProps) => {
  const handleOk = async () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      className="hinder-delete-modal"
      title={
        <Flex gap={8}>
          <WarningOutlined />
          <Typography.Text type="danger">
            Hành vi của bạn không thể thực hiện
          </Typography.Text>
        </Flex>
      }
      open={isModalOpen}
      confirmLoading={confirmLoading}
      closable={false}
      footer={[
        <Button
          type="primary"
          danger
          style={{ width: "100%" }}
          onClick={handleOk}
        >
          Ok
        </Button>,
      ]}
    >
      <List>Bạn không thể xóa các chức vụ vẫn đang được áp dụng</List>
    </Modal>
  );
};
export default HinderDeleteJobModal;
