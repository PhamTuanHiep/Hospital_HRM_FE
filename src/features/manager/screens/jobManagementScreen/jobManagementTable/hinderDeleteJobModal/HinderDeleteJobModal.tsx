import { Button, Flex, List, Modal, Typography } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import "./HinderDeleteJobModal.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            {t("content.position.HinderDeletePositionTitle")}
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
          {t("content.common.Yes")}
        </Button>,
      ]}
    >
      <List> {t("content.position.HinderDeletePositionContent")}</List>
    </Modal>
  );
};
export default HinderDeleteJobModal;
