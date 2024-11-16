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
import TextArea from "antd/es/input/TextArea";

import FileUpload from "../../../../../components/fileUpload/FileUpload";
import { AnnouncementPostDetail } from "../../../../../common/common.type";
import { AnnouncementPostUpdate } from "../../../constants/manager.type";
import { updateAnnouncementPost } from "../../../../../api/apiServices";
import { notificationOptions } from "../../../constants/manager.help";

interface UpdateAnnouncementPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  announcementPost: AnnouncementPostDetail;
  confirmLoading: boolean;
}
const UpdateAnnouncementPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  announcementPost,
  confirmLoading,
}: UpdateAnnouncementPostModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultValues = useMemo(() => {
    return {
      userId: announcementPost.user?.userId || "",
      title: announcementPost.title || "",
      abstract: announcementPost.abstract || "",
      notificationType: announcementPost.notificationType || "",
      contentDetail: announcementPost.contentDetail || "",
      contact: announcementPost.contact || "",
    };
  }, [announcementPost]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    form.setFieldValue("image", fileList);
  }, [fileList]);

  const onFinish: FormProps<AnnouncementPostUpdate>["onFinish"] = async (
    values
  ) => {
    if (fileList.length) {
      values.image = fileList[0].originFileObj;
    } else {
      values.image = undefined;
    }

    const res = await updateAnnouncementPost(
      announcementPost.announcementPostId,
      values
    );
    if (res) {
      setIsModalOpen(false);
      setReset(true);
      setFileList([]);
    }
  };

  const onFinishFailed: FormProps<AnnouncementPostUpdate>["onFinishFailed"] = (
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
      title={t("content.announcementPost.UpdateAnnouncementTitle")}
      className="extend-modal_one-column"
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("content.common.Cancel")}
        </Button>,
        <Button
          form="update_recruitment-post_form"
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
        id="update_recruitment-post_form"
        name="update_recruitment-post_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<AnnouncementPostUpdate>
          label={t("content.announcementPost.Title")}
          name="title"
          key="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AnnouncementPostUpdate>
          label={t("content.announcementPost.Abstract")}
          name="abstract"
          key="abstract"
          rules={[{ required: true, message: "Please input your abstract!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AnnouncementPostUpdate>
          label={t("content.announcementPost.NotificationName")}
          name="notificationType"
          key="notificationType"
          rules={[
            { required: true, message: "Please input notification name!" },
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
        <Form.Item<AnnouncementPostUpdate>
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

        <Form.Item<AnnouncementPostUpdate>
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
        <Form.Item<AnnouncementPostUpdate>
          label={t("content.announcementPost.Image")}
          name="image"
          key="image"
        >
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item<AnnouncementPostUpdate>
          label={t("content.announcementPost.Author")}
          name="userId"
          key="userId"
        >
          <Typography.Text> {announcementPost.user?.fullName}</Typography.Text>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateAnnouncementPostModal;
