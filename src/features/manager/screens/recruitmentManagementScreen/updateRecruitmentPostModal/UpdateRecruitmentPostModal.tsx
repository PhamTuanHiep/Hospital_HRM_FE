import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Typography,
  UploadFile,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import { putRecruitmentPost } from "../../../../../api/apiServices";
import FileUpload from "../../../../../components/fileUpload/FileUpload";
import { RecruitmentPostDetail } from "../../../../../common/common.type";
import { RecruitmentPostUpdate } from "../../../constants/manager.type";

interface UpdateRecruitmentPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  recruitmentPost: RecruitmentPostDetail;
  confirmLoading: boolean;
}
const UpdateRecruitmentPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  recruitmentPost,
  confirmLoading,
}: UpdateRecruitmentPostModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultValues = useMemo(() => {
    return {
      userId: recruitmentPost.user?.userId || "",
      title: recruitmentPost.title || "",
      subtitle: recruitmentPost.subtitle || "",
      generalRequirements: recruitmentPost.generalRequirements || "",
      benefits: recruitmentPost.benefits || "",
      requiredDocuments: recruitmentPost.recruitmentPostId || "",
      contact: recruitmentPost.contact || "",
    };
  }, [recruitmentPost]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    form.setFieldValue("image", fileList);
  }, [fileList]);

  const onFinish: FormProps<RecruitmentPostUpdate>["onFinish"] = async (
    values
  ) => {
    if (fileList.length) {
      values.image = fileList[0].originFileObj;
    }
    values.image = undefined;

    const res = await putRecruitmentPost(
      recruitmentPost.recruitmentPostId,
      values
    );
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<RecruitmentPostUpdate>["onFinishFailed"] = (
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
      title={t("content.recruitmentPost.UpdateRecruitmentTitle")}
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
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Title")}
          name="title"
          key="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Subtitle")}
          name="subtitle"
          key="subtitle"
          rules={[{ required: true, message: "Please input your subtitle!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.GeneralRequirements")}
          name="generalRequirements"
          key="generalRequirements"
          rules={[
            { required: true, message: "Please input General Requirements!" },
          ]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Benefits")}
          name="benefits"
          key="benefits"
          rules={[{ required: true, message: "Please input Benefits!" }]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.RequiredDocuments")}
          name="requiredDocuments"
          key="requiredDocuments"
          rules={[
            { required: true, message: "Please input Required Documents!" },
          ]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Contact")}
          name="contact"
          key="contact"
          rules={[{ required: true, message: "Please input Contact!" }]}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Image")}
          name="image"
          key="image"
        >
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item<RecruitmentPostUpdate>
          label={t("content.recruitmentPost.Author")}
          name="userId"
          key="userId"
        >
          <Typography.Text> {recruitmentPost.user?.fullName}</Typography.Text>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateRecruitmentPostModal;
