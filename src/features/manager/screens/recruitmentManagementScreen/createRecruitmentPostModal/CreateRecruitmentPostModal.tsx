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
import { RecruitmentPostCreate } from "../../../constants/manager.type";
import { useAppSelector } from "../../../../../app/hooks";
import TextArea from "antd/es/input/TextArea";
import { postRecruitmentPost } from "../../../../../api/apiServices";
import FileUpload from "../../../../../components/fileUpload/FileUpload";

interface CreateRecruitmentPostModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
}
const CreateRecruitmentPostModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
}: CreateRecruitmentPostModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { account: currentAccount, isAuthen } = useAppSelector(
    (state) => state.account_user
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const defaultValues = useMemo(() => {
    return {
      userId: currentAccount.user?.userId,
      title: "Tuỷển kế toán thuế",
      subtitle: "Bệnh viện A cần tuyển kế toán thuế ",

      generalRequirements:
        "Tuyển 2 kế toán thuế, yêu cầu:\n- Tốt nghiệp các ngành kế toán\n- Có tối thiếu 1 năm kinh nghiệm\n- Làm toàn thời gian\n\n\n",
      benefits:
        "Khi trở thành 1 thành viên của bệnh viện với vai trò kế toán thuế, bạn sẽ có các quyền lợi:\n- Lương 15tr/tháng\n- Có thưởng nếu làm tốt\n- Team building 2lần/năm\n",
      requiredDocuments:
        "Hồ sơ yêu cầu:\n- Các giấy chứng nhận liên quan\n- Sơ yếu lí lịch",
      contact: "liên hệ....",
    };
  }, [currentAccount]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  useEffect(() => {
    form.setFieldValue("image", fileList);
  }, [fileList]);

  const onFinish: FormProps<RecruitmentPostCreate>["onFinish"] = async (
    values
  ) => {
    console.log("values:", values);
    console.log("fileList:", fileList);
    values.image = fileList[0].originFileObj;
    const res = await postRecruitmentPost(values);
    console.log("res:", res);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<RecruitmentPostCreate>["onFinishFailed"] = (
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
      title={t("content.department.UpdateDepartmentTitle")}
      className="extend-modal_one-column"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          form="create_recruitment-post_form"
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
        id="create_recruitment-post_form"
        name="create_recruitment-post_form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Title")}
          name="title"
          key="title"
          rules={[{ required: true, message: "Please input your Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Subtitle")}
          name="subtitle"
          key="subtitle"
          rules={[{ required: true, message: "Please input your subtitle!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.GeneralRequirements")}
          name="generalRequirements"
          key="generalRequirements"
          rules={[
            { required: true, message: "Please input General Requirements!" },
          ]}
        >
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Benefits")}
          name="benefits"
          key="benefits"
          rules={[{ required: true, message: "Please input Benefits!" }]}
        >
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.RequiredDocuments")}
          name="requiredDocuments"
          key="requiredDocuments"
          rules={[
            { required: true, message: "Please input Required Documents!" },
          ]}
        >
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Contact")}
          name="contact"
          key="contact"
          rules={[{ required: true, message: "Please input Contact!" }]}
        >
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={{ minRows: 4, maxRows: 6 }}
            rows={4}
            maxLength={500}
          />
        </Form.Item>
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Image")}
          rules={[{ required: true, message: "Please input Image!" }]}
          name="image"
          key="image"
        >
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item<RecruitmentPostCreate>
          label={t("content.recruitmentPost.Author")}
          name="userId"
          key="userId"
        >
          <Typography.Text> {currentAccount.user?.fullName}</Typography.Text>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateRecruitmentPostModal;
