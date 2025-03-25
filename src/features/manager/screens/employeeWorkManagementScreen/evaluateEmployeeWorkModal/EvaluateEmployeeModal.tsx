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
import { postEvaluate, putEvaluate } from "../../../../../api/apiServices";
import { useTranslation } from "react-i18next";

interface EvaluateEmployeeWorkModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  setReset: Function;
  employee: UserDetail;
  confirmLoading: boolean;
}
const EvaluateEmployeeWorkModal = ({
  isModalOpen,
  setIsModalOpen,
  setReset,
  employee,
  confirmLoading,
}: EvaluateEmployeeWorkModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { isUpdate, evaluateId }: { isUpdate: boolean; evaluateId: number } =
    useMemo(() => {
      return {
        isUpdate: isUpdateEvaluate(employee.evaluateHistories),
        evaluateId:
          getNowEvaluateHistory(employee.evaluateHistories)?.evaluateId || 0,
      };
    }, [employee]);

  const defaultValues = useMemo(() => {
    const oldEvaluateHistory = getNowEvaluateHistory(
      employee.evaluateHistories
    );
    return {
      averageScore: oldEvaluateHistory?.averageScore,
      workLoad: oldEvaluateHistory?.workLoad, //Khối lượng công việc
      workResult: oldEvaluateHistory?.workResult, //Kết quả làm việc
      workSpirit: oldEvaluateHistory?.workSpirit, //Tinh thần làm việc
      workingStyle: oldEvaluateHistory?.workingStyle, //Tác phong làm việc
      capacityOfWork: oldEvaluateHistory?.capacityOfWork, //Khả năng làm việc
      quantityOfScientificWorks: getNowEvaluateHistory(
        employee.evaluateHistories
      )?.quantityOfScientificWorks, //Đóng góp các công trình khoa học
      responsibilityForWork: oldEvaluateHistory?.responsibilityForWork, //Trách nhiệm đối với công việc
      workInitiatives: oldEvaluateHistory?.workInitiatives, //Sáng kiến ​​công việc
    };
  }, [employee]);

  console.log("employee:", employee);
  console.log("defaultValues:", defaultValues);

  console.log("isUpdate:", isUpdate);

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const onFinish: FormProps<EvaluateForm>["onFinish"] = async (values) => {
    console.log("values:", values);
    const newEvaluate = { userId: employee.userId, ...values };
    if (isUpdate) {
      const res = await putEvaluate(evaluateId, newEvaluate);
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
    } else {
      const res = await postEvaluate(newEvaluate);
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
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
      "evaluate_form"
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
      title={
        isUpdate
          ? t("content.employee.UpdateEvaluateTitle")
          : t("content.employee.CreateEvaluteTitle")
      }
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      className="extend-modal"
      footer={[
        <Button onClick={handleCancel}>{t("content.common.Cancel")}</Button>,
        <Button
          id="submitButton"
          form="evaluate_form"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "20%" }}
          onClick={handleOk}
          disabled={isUpdate}
        >
          {t("content.common.Submit")}
        </Button>,
      ]}
    >
      <Flex vertical gap={8}>
        <Card>
          <Typography>
            {`${t("content.employee.Employee")}: ${employee.fullName}`}
          </Typography>
          <Typography>
            {`${t("content.employee.PositionName")}: ${
              employee.position?.positionName
            }`}
          </Typography>
          <Typography>
            {`${t("content.employee.DepartmentWorking")}: ${
              employee.department?.departmentName
            }`}
          </Typography>
          <Typography>
            {`${t("content.common.Gender")}: ${
              employee.gender === GenderId.MALE
                ? t(`content.common.${GenderName.MALE}`)
                : t(`content.common.${GenderName.FEMALE}`)
            }`}{" "}
          </Typography>
          {isUpdate ? (
            <Flex justify="flex-start" gap={24} align="center">
              <Typography>
                {t("content.employee.AskAboutUpdateEvaluation")} ?
              </Typography>
              <Button onClick={handleDisable} type="primary">
                {t("content.common.Yes")}
              </Button>
            </Flex>
          ) : (
            <Typography>{t("content.employee.NoticeEvaluation")} !</Typography>
          )}
        </Card>
        <Card>
          <Form
            form={form}
            id="evaluate_form"
            name="evaluate_form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Flex vertical={true} justify="space-between" wrap>
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

export default EvaluateEmployeeWorkModal;
