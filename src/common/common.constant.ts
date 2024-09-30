import {
  Account,
  Allowance,
  Department,
  Evaluate,
  Insurance,
  Leave,
  MedicalTrainingResults,
  NursingTrainingResults,
  Overtime,
  OvertimeHistory,
  Position,
  Role,
  User,
} from "./common.type";

export const INIT_ACCOUNT: Account = {
  accountId: 0,
  email: "",
  password: "",
  roleId: "",
  userId: 0,
  createdById: 0,
  updatedById: 0,
};

export const INIT_USER: User = {
  userId: 1,
  fullName: "-",
  gender: "-",
  address: "-",
  phoneNumber: "-",
  nation: "-",
  nationality: "-",
  hometown: "-",
  positionId: "-",
  birthday: "-",
  image: "-",
  fatherFullName: "-",
  fatherBirthday: "-",
  motherFullName: "-",
  motherBirthday: "-",
  departmentId: "-",
  weeklySchedule: [0],
  insuranceIds: ["-"],
  allowances: [""],
  allowanceIds: [0],
  evaluateId: 1,
  jobDescription: [""],
  otherDescription: "-",
  createdById: 0,
  updatedById: 0,
  status: "-",
};

export const INIT_ROLE: Role = {
  roleId: "user",
  roleName: "User",
  createdById: 0,
  updatedById: 0,
};

export const INIT_POSITION: Position = {
  positionId: "",
  positionName: "",
  salaryCoefficient: 0,
  leaveId: "",
  createdById: 0,
  updatedById: 0,
};

export const INIT_LEAVE: Leave = {
  leaveId: "",
  leaveTypes: "",
  MaxLeaveEntitlement: 0,
};

export const INIT_INSURANCE: Insurance = {
  insuranceId: "-",
  insuranceName: "-",
  insuranceType: "-",
  monthlyPercentage: 0,
  note: "-",
};

export const INIT_EVALUATE: Evaluate = {
  evaluateId: 0,
  userId: 0,
  workLoad: 0,
  quanlityOfWork: 0,
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
};

export const INIT_DEPARTMENT: Department = {
  departmentId: "",
  departmentName: "",
  createdById: 0,
  updatedById: 0,
};

export const INIT_ALLOWANCE: Allowance = {
  allowanceId: 0,
  allowanceAcronym: "-",
  allowanceName: "-",
  allowanceType: "-",
  allowanceRate: 0,
  allowanceFee: 0,
  note: "-",
};

export const INIT_OVERTIME: Overtime = {
  overtimeId: "",
  overtimeName: "",
  overtimePay: 0,
  note: [""],
};

export const INIT_OVERTIME_HISTORY: OvertimeHistory = {
  overtimeHistoryId: 1,
  userId: 0,
  overtimeId: "",
  departmentId: "",
  days: "",
  note: "",
};

export const INIT_MEDICAL_TRAINING_RESULTS: MedicalTrainingResults = {
  trainingResultsId: 1,
  userId: 1,
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
