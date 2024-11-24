import { Flex, Form, Input, Modal } from "antd";

import { useEffect, useMemo } from "react";
import { UserDetail, UserForm } from "../../../../../../common/common.type";
import { transformCamelToPascal } from "../../../../../../common/common.helper";
import { useTranslation } from "react-i18next";

interface ViewUserProfileModelProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  user: UserDetail;
  confirmLoading: boolean;
}

const ViewUserProfileModel = ({
  isModalOpen,
  setIsModalOpen,
  user,
  confirmLoading,
}: ViewUserProfileModelProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const defaultValues = useMemo(() => {
    return {
      fullName: `${user.fullName}`,
      email: `${user.account?.email || ""}`,
      gender: `${user.gender}`,
      address: `${user.address}`,
      phoneNumber: `${user.phoneNumber}`,
      nation: `${user.nation}`,
      nationality: `${user.nationality}`,
      hometown: `${user.hometown}`,
      birthday: `${user.birthday}`,
      fatherFullName: `${user.fatherFullName}`,
      fatherBirthday: `${user.fatherBirthday}`,
      motherFullName: `${user.motherFullName}`,
      motherBirthday: `${user.motherBirthday}`,
      weeklySchedule: `${user.weeklySchedule}`,

      positionName: `${user.position?.positionName || ""}`,
      salaryCoefficient: `${user.salaryCoefficient}`,

      departmentName: `${user.department?.departmentName || ""}`,
      jobDescription: `${user.jobDescription}`,
      otherDescription: `${user.otherDescription}`,
      status: user.status ? `${user.status}` : "",
    };
  }, [user]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  type UserKeys = keyof UserForm;

  return (
    <Modal
      title="View Account"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-modal"
      okText={t("content.common.Submit")}
      cancelText={t("content.common.Cancel")}
    >
      <Form
        form={form}
        name="view_account"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Flex vertical={false} justify="space-between" wrap>
          {Object.entries(defaultValues).map(([key, value]) => {
            const keyName = key as string;
            console.log("value:", value);

            return (
              <div className="container-form-item">
                <Form.Item<UserForm>
                  label={t(`content.info.${transformCamelToPascal(keyName)}`)}
                  name={keyName as UserKeys}
                >
                  <Input disabled />
                </Form.Item>
              </div>
            );
          })}
        </Flex>
      </Form>
    </Modal>
  );
};
export default ViewUserProfileModel;
