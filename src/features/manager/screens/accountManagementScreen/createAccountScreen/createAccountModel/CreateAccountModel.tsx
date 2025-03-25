import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  UploadFile,
} from "antd";
import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import FileUpload from "../../../../../../components/fileUpload/FileUpload";
import {
  AccountCreate,
  AccountDetail,
  UserDetail,
} from "../../../../../../common/common.type";
import { CreateAccountFormType } from "../../../../constants/manager.type";
import { optionRoleType } from "../../../../constants/manager.constant";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  EMAIL_PATTERN,
  GenderId,
  genderName,
  PASSWORD_PATTERN,
} from "../../../../../../common/common.constant";
import { getAccounts, postAccount } from "../../../../../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { managerPaths } from "../../../../constants/constant.path";

interface CreateContractHistoryModelProps {
  modalKey: string | number;
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  confirmLoading: boolean;
  employee: UserDetail;
}
const CreateContractHistoryModel = ({
  modalKey,
  isModalOpen,
  setIsModalOpen,
  setReset,
  confirmLoading,
  employee,
}: CreateContractHistoryModelProps) => {
  const [addAccountForm] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [emailList, setEmailList] = useState<{ email: string }[]>();

  const fetchAccounts = async () => {
    const res = await getAccounts();
    console.log("res:", res);

    if (res) {
      const accountsApi = res.data.data as AccountDetail[];
      const emailListApi = accountsApi.map((accountApi) => ({
        email: accountApi.email,
      }));
      setEmailList(emailListApi);
    }
  };

  const defaultValues = useMemo(() => {
    return {
      fullName: employee.fullName,
      gender: genderName[employee.gender as GenderId],
      departmentName: employee.department?.departmentName,
      positionName: employee.position?.positionName,
    };
  }, [employee]);

  const onFinish: FormProps<CreateAccountFormType>["onFinish"] = async (
    values
  ) => {
    if (fileList[0].originFileObj) {
      const accountCreate: AccountCreate = {
        email: values.email,
        password: values.password,
        roleId: values.roleId,
        userId: employee.userId,
        avatar: fileList[0].originFileObj,
      };
      console.log("accountCreate:", accountCreate);

      const res = await postAccount(accountCreate);
      if (res) {
        // setIsModalOpen(false);
        // setReset(true);
        navigate(managerPaths.ACCOUNT_MANAGEMENT);
      }
    } else {
      console.log("require import avatar");
    }
  };

  const onFinishFailed: FormProps<CreateAccountFormType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    addAccountForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    addAccountForm.setFieldsValue(defaultValues);
  }, [addAccountForm, defaultValues]);

  useEffect(() => {
    addAccountForm.setFieldValue("avatar", fileList);
  }, [fileList, addAccountForm]);

  useEffect(() => {
    fetchAccounts();
  }, []);
  console.log("emailList:", emailList);

  return (
    <Modal
      key={modalKey}
      title={t("content.account.CreateAccount")}
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={[
        <Button onClick={handleCancel} key="cancel">
          {t("content.common.Cancel")}
        </Button>,
        <Button
          form="extend_contract_form"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "50%" }}
          onClick={handleOk}
        >
          {t("content.common.Submit")}
        </Button>,
      ]}
    >
      <Form
        form={addAccountForm}
        id="extend_contract_form"
        name="extend_contract_form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<CreateAccountFormType>
          label={t("content.account.FullName")}
          name="fullName"
          key="fullName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.Gender")}
          name="gender"
          key="gender"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.DepartmentName")}
          name="departmentName"
          key="departmentName"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.PositionName")}
          name="positionName"
          key="positionName"
        >
          <Input disabled />
        </Form.Item>{" "}
        {emailList ? (
          <Form.Item<CreateAccountFormType>
            label={t("content.account.Email")}
            name="email"
            key="email"
            rules={[
              {
                required: true,
                message: "Email is valid",
                pattern: EMAIL_PATTERN,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.resolve();

                  // Kiểm tra xem email đã tồn tại trong mảng `accounts` chưa
                  const isEmailExist = emailList.some(
                    (account) => account.email === value
                  );

                  if (isEmailExist) {
                    return Promise.reject(
                      new Error("This email is already registered.")
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        ) : (
          <div></div>
        )}
        <Form.Item<CreateAccountFormType>
          label={t("content.account.Password")}
          name="password"
          key="password"
          rules={[
            {
              required: true,
              message:
                "The password must have 8-32 characters, at least 1 capital and 1 normal word !",
              pattern: PASSWORD_PATTERN,
            },
          ]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.ConfirmPassword")}
          name="confirmPassword"
          key="confirmPassword"
          dependencies={["password"]} // Đảm bảo form kiểm tra sự thay đổi của password
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onBlur={() => {
              // Hàm này sẽ được gọi khi mất focus khỏi input
              // Bạn có thể thêm logic kiểm tra hoặc xác nhận lại thông tin tại đây nếu cần
            }}
          />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.Avatar")}
          rules={[{ required: true, message: "Please input Avatar!" }]}
          name="avatar"
          key="avatar"
        >
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
        <Form.Item<CreateAccountFormType>
          label={t("content.account.Role")}
          name="roleId"
          key="roleId"
          rules={[{ required: true, message: "Please input your Role!" }]}
        >
          <Select options={optionRoleType} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateContractHistoryModel;
