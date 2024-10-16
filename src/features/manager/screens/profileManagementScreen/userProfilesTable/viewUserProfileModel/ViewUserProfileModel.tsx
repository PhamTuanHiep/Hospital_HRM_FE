import { Flex, Form, Input, Modal } from "antd";

import { useEffect, useMemo } from "react";
import { UserDetail, UserForm } from "../../../../../../common/common.type";
import { transformCamelToTitleCaseHaveSpace } from "../../../../../../common/common.helper";

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

  const defaultValues = useMemo(() => {
    return {
      fullName: `${user.fullName}`,
      email: `${user.account?.email}`,
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

      positionName: `${user.position?.positionName}`,
      departmentName: `${user.department?.departmentName}`,
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

  return (
    <Modal
      title="View Account"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-model"
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Flex vertical={false} justify="space-between" wrap>
          {Object.entries(defaultValues).map(([key, value]) => {
            const keyName = key as string;
            return (
              <div className="container-form-item">
                <Form.Item<UserForm>
                  label={`${transformCamelToTitleCaseHaveSpace(keyName)}`}
                  name={keyName}
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
