import { Button, Flex, List, Modal, Typography } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import "./HinderDeleteDepartmentModal.scss";

interface HinderDeleteDepartmentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  confirmLoading: boolean;
}
const HinderDeleteDepartmentModal = ({
  isModalOpen,
  setIsModalOpen,
  confirmLoading,
}: HinderDeleteDepartmentModalProps) => {
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
      <List>Bạn không thể xóa các khoa phòng vẫn còn nhân viên</List>
    </Modal>
  );
};
export default HinderDeleteDepartmentModal;
