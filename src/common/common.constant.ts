import dayjs from "dayjs";
import {
  AccountDetail,
  AllowanceDetail,
  DepartmentDetail,
  EvaluateDetail,
  InsuranceDetail,
  LeaveDetail,
  LeaveHistoryDetail,
  MedicalTrainingResultsDetail,
  NursingTrainingResults,
  OvertimeDetail,
  OvertimeHistoryDetail,
  PositionAllowanceDetail,
  PositionDetail,
  RoleDetail,
  UserDetail,
  UserInsuranceDetail,
} from "./common.type";

export const INIT_ACCOUNT: AccountDetail = {
  accountId: 0,
  email: "",
  password: "",
  avatar: "",
  role: null,
  user: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_USER: UserDetail = {
  userId: 1,
  fullName: "-",
  gender: "-",
  address: "-",
  phoneNumber: "-",
  nation: "-",
  nationality: "-",
  hometown: "-",
  birthday: "-",
  fatherFullName: "-",
  fatherBirthday: "-",
  motherFullName: "-",
  motherBirthday: "-",
  weeklySchedule: [2, 3, 4, 5, 6],
  jobDescription: [""],
  otherDescription: "-",
  account: null,
  department: null,
  leaveHistories: null,
  overtimeHistories: null,
  userInsurances: null,
  position: null,
  status: "-",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_ROLE: RoleDetail = {
  roleId: "user",
  roleName: "User",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_POSITION_ALLOWANCE_DETAIL: PositionAllowanceDetail = {
  id: 0,
  position: null,
  allowance: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_POSITION: PositionDetail = {
  positionId: "",
  positionName: "",
  salaryCoefficient: 0,
  users: null,
  positionAllowances: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_LEAVE_HISTORY_DETAIL: LeaveHistoryDetail = {
  leaveHistoryId: 0,
  startDay: "",
  endDay: "",
  user: null,
  leave: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_LEAVE: LeaveDetail = {
  leaveId: "",
  leaveTypes: "",
  maxLeaveEntitlement: 0,
  unit: "day",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_USER_INSURANCE_DETAIL: UserInsuranceDetail = {
  id: 0,
  user: null,
  insurance: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_INSURANCE: InsuranceDetail = {
  insuranceId: "-",
  insuranceName: "-",
  insuranceType: "-",
  monthlyPercentage: 0,
  note: "-",
  userInsurances: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_EVALUATE: EvaluateDetail = {
  evaluateId: 0,
  userId: 0,
  workLoad: 0,
  qualityOfWork: 0,
  capacityOfWork: 0,
  quantityOfScientificWorks: 0,
  workInitiatives: 0,
  professionalEthics: 0,
  workingStyle: 0,
  responsibilityForWork: 0,
  workAttitude: 0,
  workSpirit: 0,
  workResult: 0,
  averageScore: 0,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_DEPARTMENT: DepartmentDetail = {
  departmentId: "",
  departmentName: "",
  users: null,
  overtimeHistories: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_OVERTIME: OvertimeDetail = {
  overtimeId: "",
  overtimeName: "",
  overtimePay: 0,
  note: [""],
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_OVERTIME_HISTORY: OvertimeHistoryDetail = {
  overtimeHistoryId: 1,
  note: "",
  startDay: "",
  endDay: "",
  user: null,
  department: null,
  overtime: null,
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_ALLOWANCE: AllowanceDetail = {
  allowanceId: 0,
  allowanceAcronym: "-",
  allowanceName: "-",
  allowanceType: "-",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "-",
  createdAt: dayjs("2000-01-01").toDate(),
  updatedAt: dayjs("2000-01-01").toDate(),
};

export const INIT_MEDICAL_TRAINING_RESULTS: MedicalTrainingResultsDetail = {
  trainingResultsId: 1,
  user: null,
  understandingOfMedicalTheory: 1,
  knowledgeOfTreatmentProtocols: 1,
  abilityToLearnNewKnowledge: 1,
  diagnosticSkills: 1,
  treatmentSkills: 1,
  decisionMakingSkills: 1,
  communicationSkillsWithPatientsAndTheirFamilies: 1,
  communicationSkillsWithColleagues: 1,
  patientMonitoringAndCare: 1,
  participationInMedicalResearch: 1,
  averageScore: 1,
};

export const INIT_NURSING_TRAINING_RESULTS: NursingTrainingResults = {
  trainingResultsId: 1,
  userId: 1,
  understandingOfNursingTheory: 1,
  clinicalSkills: 1,
  medicationAndTreatmentManagementSkills: 1,
  basicCareSkills: 1,
  communicationSkillsWithPatientsAndTheirFamilies: 1,
  patientRecordManagementSkills: 1,
  patientMonitoringAndAssessmentSkills: 1,
  abilityToAdaptToTheWorkEnvironment: 1,
  averageScore: 1,
};

export enum RoleName {
  USER = "User",
  MANAGER = "Manager",
  ADMIN = "Admin",
}

export const enum RoleId {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}
