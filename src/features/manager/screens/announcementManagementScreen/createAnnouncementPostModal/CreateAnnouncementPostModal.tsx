import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  Typography,
  UploadFile,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../../../../app/hooks";
import TextArea from "antd/es/input/TextArea";
import FileUpload from "../../../../../components/fileUpload/FileUpload";
import { AnnouncementPostCreate } from "../../../constants/manager.type";
import { createAnnouncementPost } from "../../../../../api/apiServices";
import { notificationOptions } from "../../../constants/manager.help";

interface CreateAnnouncementPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
}
const CreateAnnouncementPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
}: CreateAnnouncementPostModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { account: currentAccount, isAuthen } = useAppSelector(
    (state) => state.account_user
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultValues = useMemo(() => {
    return {
      userId: currentAccount.user?.userId,
      title: "Mời báo giá",
      abstract: `Bệnh viện thông báo chấp nhận báo giá thiết bị y tế với các doanh nghiệp chuyên cung cấp thiết bị y tế
      - Thời gian: 7/11/2024
      - Địa điểm: Tòa C, bệnh viện A`,
      notificationType: "N005",
      contentDetail: "link",
      contact: "liên hệ....",
    };
  }, [currentAccount]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    form.setFieldValue("image", fileList);
  }, [fileList]);

  const onFinish: FormProps<AnnouncementPostCreate>["onFinish"] = async (
    values
  ) => {
    values.image = fileList[0].originFileObj;
    const res = await createAnnouncementPost(values);

    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<AnnouncementPostCreate>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={t("content.announcementPost.Create_AnnouncementPostTitle")}
      className="extend-modal_one-column"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          form="create_announcement-post_form"
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={handleOk}
        >
          {t("content.common.Submit")}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="create_announcement-post_form"
        name="create_announcement-post_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.Title")}
          name="title"
          key="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.Abstract")}
          name="abstract"
          key="abstract"
          rules={[{ required: true, message: "Please input your abstract!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.NotificationName")}
          name="notificationType"
          key="notificationType"
          rules={[
            { required: true, message: "Please input notification Name!" },
          ]}
        >
          <Select
            className="input-profile-item"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={notificationOptions}
          />
        </Form.Item>
        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.ContentDetail")}
          name="contentDetail"
          key="contentDetail"
          rules={[{ required: true, message: "Please input content detail!" }]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.Contact")}
          name="contact"
          key="contact"
          rules={[{ required: true, message: "Please input contact!" }]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.Image")}
          rules={[{ required: true, message: "Please input Image!" }]}
          name="image"
          key="image"
        >
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item<AnnouncementPostCreate>
          label={t("content.announcementPost.Author")}
          name="userId"
          key="userId"
        >
          <Typography.Text> {currentAccount.user?.fullName}</Typography.Text>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateAnnouncementPostModal;
