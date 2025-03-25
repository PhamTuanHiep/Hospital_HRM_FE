import { Button, Card, Flex, Form, FormProps, Modal, Rate } from "antd";
import { useEffect, useMemo } from "react";

import Typography from "antd/es/typography/Typography";

import { useTranslation } from "react-i18next";
import { UserDetail } from "../../../../../../common/common.type";
import {
  checkPosition,
  getNowTrainingResult,
} from "../../../../constants/manager.help";
import { MedicalForm } from "../../../../constants/manager.type";
import {
  postMedicalTrainingResult,
  putMedicalTrainingResult,
} from "../../../../../../api/apiServices";
import { GenderId, GenderName } from "../../../../../../common/common.constant";

interface TrainingResultsEvaluationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  reset: boolean;
  setReset: Function;
  employee: UserDetail;
  confirmLoading: boolean;
}
const TrainingResultsEvaluationModal = ({
  isModalOpen,
  setIsModalOpen,
  reset,
  setReset,
  employee,
  confirmLoading,
}: TrainingResultsEvaluationModalProps) => {
  const [trainingResultModalForm] = Form.useForm();
  const { t } = useTranslation();

  const {
    isUpdate,
    positionType,
    trainingResultsId,
  }: { isUpdate: boolean; positionType: number; trainingResultsId: number } =
    useMemo(() => {
      const number = checkPosition(employee);
      console.log("number:", number);
      console.log(
        "getNowTrainingResult(employee, number):",
        getNowTrainingResult(employee, number)
      );

      return {
        isUpdate: !!number,
        positionType: number,
        trainingResultsId:
          getNowTrainingResult(employee, number)?.trainingResultsId || 0,
      };
    }, [employee]);

  console.log("employee:", employee);

  console.log("trainingResultsId:", trainingResultsId);

  const defaultValues = useMemo(() => {
    const oldTrainingResult = getNowTrainingResult(employee, positionType);
    return {
      understandingOfMedicalTheory:
        oldTrainingResult?.understandingOfMedicalTheory || 0,
      knowledgeOfTreatmentProtocols:
        oldTrainingResult?.knowledgeOfTreatmentProtocols || 0,
      abilityToLearnNewKnowledge:
        oldTrainingResult?.abilityToLearnNewKnowledge || 0,
      diagnosticSkills: oldTrainingResult?.diagnosticSkills || 0,
      treatmentSkills: oldTrainingResult?.treatmentSkills || 0,
      decisionMakingSkills: oldTrainingResult?.decisionMakingSkills || 0,
      communicationSkillsWithPatientsAndTheirFamilies:
        oldTrainingResult?.communicationSkillsWithPatientsAndTheirFamilies || 0,
      communicationSkillsWithColleagues:
        oldTrainingResult?.communicationSkillsWithColleagues || 0,
      patientMonitoringAndCare:
        oldTrainingResult?.patientMonitoringAndCare || 0,
      participationInMedicalResearch:
        oldTrainingResult?.participationInMedicalResearch || 0,
      averageScore: oldTrainingResult?.averageScore || 0,
    };
  }, [employee, positionType]);

  // console.log("employee:", employee);
  // console.log("defaultValues:", defaultValues);

  // console.log("positionType:", positionType);

  const onFinish: FormProps<MedicalForm>["onFinish"] = async (values) => {
    console.log("----values:", values);
    const newEvaluate = { userId: employee.userId, ...values };
    if (isUpdate) {
      console.log("----update:");

      const res = await putMedicalTrainingResult(trainingResultsId, values);
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
    } else {
      console.log("----post:");

      const res = await postMedicalTrainingResult(newEvaluate);
      if (res) {
        setIsModalOpen(false);
        setReset(true);
      }
    }
  };

  const onFinishFailed: FormProps<MedicalForm>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    trainingResultModalForm.submit();
    console.log("????");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDisable = (values: any) => {
    console.log("values:", values);
    const MedicalForm = document.getElementById(
      "evaluate_form"
    ) as HTMLFormElement;
    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLButtonElement;
    console.log("MedicalForm:", MedicalForm);
    // Vô hiệu hóa các phần tử
    submitButton.disabled = false;
    MedicalForm.disabled = false;
  };

  const tooltips = ["Tệ", "Không tốt lắm", "Bình thường", "Tốt", "Rất tốt"];

  useEffect(() => {
    trainingResultModalForm.setFieldsValue(defaultValues);
  }, [trainingResultModalForm, defaultValues]);
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
          form="form"
          key="submit"
          type="primary"
          htmlType="submit"
          style={{ width: "20%" }}
          onClick={handleOk}
          // disabled={isUpdate}
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
            form={trainingResultModalForm}
            id="evaluate_form"
            name="evaluate_form"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Flex vertical={true} justify="space-between" wrap>
              <Form.Item<MedicalForm>
                label={t(
                  "content.recruitmentPost.UnderstandingOfMedicalTheory"
                )}
                name="understandingOfMedicalTheory"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>

              <Form.Item<MedicalForm>
                label={t(
                  "content.recruitmentPost.KnowledgeOfTreatmentProtocols"
                )}
                name="knowledgeOfTreatmentProtocols"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>

              <Form.Item<MedicalForm>
                label={t("content.recruitmentPost.AbilityToLearnNewKnowledge")}
                name="abilityToLearnNewKnowledge"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t("content.recruitmentPost.DiagnosticSkills")}
                name="diagnosticSkills"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t("content.recruitmentPost.TreatmentSkills")}
                name="treatmentSkills"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t("content.recruitmentPost.DecisionMakingSkills")}
                name="decisionMakingSkills"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t(
                  "content.recruitmentPost.CommunicationSkillsWithPatientsAndTheirFamilies"
                )}
                name="communicationSkillsWithPatientsAndTheirFamilies"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t(
                  "content.recruitmentPost.CommunicationSkillsWithColleagues"
                )}
                name="communicationSkillsWithColleagues"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t("content.recruitmentPost.PatientMonitoringAndCare")}
                name="patientMonitoringAndCare"
              >
                <Rate tooltips={tooltips} />
              </Form.Item>
              <Form.Item<MedicalForm>
                label={t(
                  "content.recruitmentPost.ParticipationInMedicalResearch"
                )}
                name="participationInMedicalResearch"
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

export default TrainingResultsEvaluationModal;
