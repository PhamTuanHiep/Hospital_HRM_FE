import { Button, Card, Flex, Form, FormProps, Modal, Rate } from "antd";
import { UserDetail } from "../../../../../common/common.type";
import { useEffect, useMemo } from "react";

import { EvaluateForm } from "../../../constants/manager.type";
import Typography from "antd/es/typography/Typography";
import { GenderId, GenderName } from "../../../../../common/common.constant";
import {
  getNowEvaluateHistory,
  isUpdateEvaluate,
} from "../../../constants/manager.help";
import { postEvaluate } from "../../../../../api/apiServices";

interface EvaluateEmployeeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  employee: UserDetail;
  confirmLoading: boolean;
}
const EvaluateEmployeeModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  employee,
  confirmLoading,
}: EvaluateEmployeeModalProps) => {
  const [form] = Form.useForm();
  console.log("employee:", employee);

  const isUpdate = useMemo(() => {
    return isUpdateEvaluate(employee.evaluateHistories);
  }, [employee]);
  console.log("isUpdate:", isUpdate);

  const defaultValues = useMemo(() => {
    return {
      averageScore: getNowEvaluateHistory(employee.evaluateHistories)
        ?.averageScore,
      workLoad: getNowEvaluateHistory(employee.evaluateHistories)?.workLoad, //Khối lượng công việc

      workResult: getNowEvaluateHistory(employee.evaluateHistories)?.workResult, //Kết quả làm việc
      workSpirit: getNowEvaluateHistory(employee.evaluateHistories)?.workSpirit, //Tinh thần làm việc
      workingStyle: getNowEvaluateHistory(employee.evaluateHistories)
        ?.workingStyle, //Tác phong làm việc
      capacityOfWork: getNowEvaluateHistory(employee.evaluateHistories)
        ?.capacityOfWork, //Khả năng làm việc
      quantityOfScientificWorks: getNowEvaluateHistory(
        employee.evaluateHistories
      )?.quantityOfScientificWorks, //Đóng góp các công trình khoa học
      responsibilityForWork: getNowEvaluateHistory(employee.evaluateHistories)
        ?.responsibilityForWork, //Trách nhiệm đối với công việc
      workInitiatives: getNowEvaluateHistory(employee.evaluateHistories)
        ?.workInitiatives, //Sáng kiến ​​công việc
    };
  }, [employee]);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<EvaluateForm>["onFinish"] = async (values) => {
    console.log("values:", values);
    const newEvaluate = { userId: employee.userId, ...values };
    const res = await postEvaluate(newEvaluate);
    if (res) {
      setIsModalOpen(false);
      setReset(true);
    }
  };

  const onFinishFailed: FormProps<EvaluateForm>["onFinishFailed"] = (
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

  const handleDisable = (values: any) => {
    console.log("values:", values);
    const evaluateForm = document.getElementById(
      "evaluateForm"
    ) as HTMLFormElement;
    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLButtonElement;
    console.log("evaluateForm:", evaluateForm);
    // Vô hiệu hóa các phần tử
    submitButton.disabled = false;
    evaluateForm.disabled = false;
  };

  const tooltips = ["Tệ", "Không tốt lắm", "Bình thường", "Tốt", "Rất tốt"];

  return (
    <Modal
      title={isUpdate ? "Update Evaluate" : "Create Evaluate"}
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-model "
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button
          id="submitButton"
          form="evaluateForm"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "20%" }}
          onClick={handleOk}
          disabled={isUpdate}
        >
          Submit
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card>
          <Typography>Nhân viên: {employee.fullName}</Typography>
          <Typography>Chức vụ: {employee.position?.positionName}</Typography>
          <Typography>
            Làm việc tại khoa/phòng: {employee.department?.departmentName}
          </Typography>
          <Typography>
            Giới tính:{" "}
            {employee.gender === GenderId.MALE
              ? GenderName.MALE
              : GenderName.FEMALE}
          </Typography>
          {isUpdate ? (
            <Flex justify="flex-start" gap={24} align="center">
              <Typography>
                Nhân viên này đã được đánh giá công việc hàng năm. Bạn muốn cập
                nhật lại đánh giá ?
              </Typography>
              <Button onClick={handleDisable} type="primary">
                Yes
              </Button>
            </Flex>
          ) : (
            <Typography>
              Bạn đang thực hiện đánh giá công việc hàng năm cho nhân viên này !
            </Typography>
          )}
        </Card>
        <Card>
          <Form
            form={form}
            id="evaluateForm"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // disabled={isUpdate}
          >
            <Flex vertical={false} justify="space-between" wrap>
              <Form.Item<EvaluateForm> label="workLoad" name="workLoad">
                <Rate tooltips={tooltips} />
              </Form.Item>

              <Form.Item<EvaluateForm> label="workResult" name="workResult">
                <Rate tooltips={tooltips} />
              </Form.Item>

              <Form.Item<EvaluateForm> label="workSpirit" name="workSpirit">
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<EvaluateForm> label="workingStyle" name="workingStyle">
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<EvaluateForm>
                label="capacityOfWork"
                name="capacityOfWork"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<EvaluateForm>
                label="quantityOfScientificWorks"
                name="quantityOfScientificWorks"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<EvaluateForm>
                label="responsibilityForWork"
                name="responsibilityForWork"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<EvaluateForm>
                label="workInitiatives"
                name="workInitiatives"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </Modal>
  );
};

export default EvaluateEmployeeModal;