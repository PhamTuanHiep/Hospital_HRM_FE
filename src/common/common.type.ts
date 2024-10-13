interface AccountShortInfo {
  accountId: string;
  email: string;
  avatar: string;
}

interface UserShortInfo {
  userId: number;
  fullName: string;
}

interface RoleShortInfo {
  roleId: string;
  roleName: string;
}

interface LeaveHistoryShortInfo {
  leaveHistoryId: number;
  leaveId: string;
  startDay: string;
  endDay: string;
}
export interface OvertimeHistoryUserShortInfo {
  overtimeHistoryId: number;
  overtimeId: string;
  startDay: string;
  endDay: string;
}
interface UserInsuranceShortInfo {
  id: number;
  insuranceId: string;
}

interface PositionShortInfo {
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
}

interface AllowanceShortInfo {
  allowanceId: number;
  allowanceAcronym: string;
  allowanceType: string;
  allowanceName: string;
  allowanceRate: number;
  allowanceFee: number;
  note: string;
}

interface PositionAllowanceShortInfo {
  id: number;
  positionId: string;
  allowanceId: number;
}

interface LeaveShortInfo {
  leaveId: string;
  leaveTypes: string;
  maxLeaveEntitlement: number;
}
interface InsuranceShortInfo {
  insuranceId: string;
  insuranceName: string;
  insuranceType: string;
  monthlyPercentage: number;
}

interface UserInsuranceShortInfo {
  id: number;
  userId: number;
}

interface DepartmentShortInfo {
  departmentId: string;
  departmentName: string;
}

interface OvertimeShortInfo {
  overtimeId: string;
  overtimeName: string;
  overtimePay: number;
}

export interface OvertimeHistoryDepartmentShortInfo {
  overtimeHistoryId: number;
  userId: number;
  overtimeId: string;
  startDay: string;
  endDay: string;
}

interface RoleShortInfo {
  roleId: string;
  roleName: string;
}

export interface Account {
  accountId: number;
  email: string;
  password: string;
  avatar: string;
  role: RoleShortInfo;
  user: UserShortInfo;
  createdById: number;
  updatedById: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  userId: number;
  fullName: string;
  gender: string;
  address: string;
  phoneNumber: string;
  nation: string;
  nationality: string;
  hometown: string;
  positionId: string;
  birthday: string;
  fatherFullName: string;
  fatherBirthday: string;
  motherFullName: string;
  motherBirthday: string;
  weeklySchedule: number[];
  jobDescription: string[];
  otherDescription: string;
  departmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}

export interface Role {
  roleId: string;
  roleName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PositionAllowance {
  id: number;
  positionId: string;
  allowanceId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Position {
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaveHistory {
  leaveHistoryId: number;
  userId: number;
  leaveId: string;
  startDay: string;
  endDay: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Leave {
  leaveId: string;
  leaveTypes: string;
  maxLeaveEntitlement: number;
  unit: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInsurance {
  id: number;
  userId: number;
  insuranceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Insurance {
  insuranceId: string;
  insuranceName: string;
  insuranceType: string;
  monthlyPercentage: number;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Evaluate {
  evaluateId: number;
  userId: number;
  workLoad: number;
  qualityOfWork: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  workInitiatives: number;
  professionalEthics: number;
  workingStyle: number;
  responsibilityForWork: number;
  workAttitude: number;
  workSpirit: number;
  workResult: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Allowance {
  allowanceId: number;
  allowanceAcronym: string;
  allowanceType: string;
  allowanceName: string;
  allowanceRate: number;
  allowanceFee: number;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Overtime {
  overtimeId: string;
  overtimeName: string;
  overtimePay: number;
  note: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OvertimeHistoryAccordingDepartment {
  overtimeHistoryId: number;
  userId: number;
  overtimeId: string;
  note?: string;
  startDay: string;
  endDay: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OvertimeHistory extends OvertimeHistoryAccordingDepartment {
  departmentId: string;
}

export interface CustomDataSets {
  type?: string;
  label?: string;
  backgroundColor?: string[];
  data?: number[];
  time?: Date;
}

export interface MedicalTrainingResults {
  trainingResultsId: number;
  userId: number;
  understandingOfMedicalTheory: number;
  knowledgeOfTreatmentProtocols: number;
  abilityToLearnNewKnowledge: number;
  diagnosticSkills: number;
  treatmentSkills: number;
  decisionMakingSkills: number;
  communicationSkillsWithPatientsAndTheirFamilies: number;
  communicationSkillsWithColleagues: number;
  patientMonitoringAndCare: number;
  participationInMedicalResearch: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NursingTrainingResults {
  trainingResultsId: number;
  userId: number;
  understandingOfNursingTheory: number;
  clinicalSkills: number;
  medicationAndTreatmentManagementSkills: number;
  basicCareSkills: number;
  communicationSkillsWithPatientsAndTheirFamilies: number;
  patientRecordManagementSkills: number;
  patientMonitoringAndAssessmentSkills: number;
  abilityToAdaptToTheWorkEnvironment: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountDetail {
  accountId: number;
  email: string;
  password: string;
  avatar: string;
  role: RoleShortInfo | null;
  user: UserShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDetail {
  userId: number;
  fullName: string;
  gender: string;
  address: string;
  phoneNumber: string;
  nation: string;
  nationality: string;
  hometown: string;
  birthday: string;
  fatherFullName: string;
  fatherBirthday: string;
  motherFullName: string;
  motherBirthday: string;
  weeklySchedule: number[];
  jobDescription: string[];
  otherDescription: string;
  account: AccountShortInfo | null;
  department: DepartmentShortInfo | null;
  leaveHistories: LeaveHistoryShortInfo[] | null;
  overtimeHistories: OvertimeHistoryUserShortInfo[] | null;
  userInsurances: UserInsuranceShortInfo[] | null;
  position: PositionShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}

export interface RoleDetail extends Role {}

export interface PositionAllowanceDetail {
  id: number;
  position: PositionShortInfo | null;
  allowance: AllowanceShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PositionDetail {
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
  users: UserShortInfo[] | null;
  positionAllowances: PositionAllowanceShortInfo[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaveHistoryDetail {
  leaveHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
  startDay: string;
  endDay: string;
  user: UserShortInfo | null;
  leave: LeaveShortInfo | null;
}
export interface LeaveDetail extends Leave {}

export interface UserInsuranceDetail {
  id: number;
  user: UserShortInfo | null;
  insurance: InsuranceShortInfo | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceDetail {
  insuranceId: string;
  insuranceName: string;
  insuranceType: string;
  monthlyPercentage: number;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
  userInsurances: UserInsuranceShortInfo[] | null;
}

export interface EvaluateDetail {
  evaluateId: number;
  userId: number;
  workLoad: number;
  qualityOfWork: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  workInitiatives: number;
  professionalEthics: number;
  workingStyle: number;
  responsibilityForWork: number;
  workAttitude: number;
  workSpirit: number;
  workResult: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepartmentDetail extends Department {
  users: UserShortInfo[] | null;
  overtimeHistories: OvertimeHistoryDepartmentShortInfo[] | null;
}

export interface OvertimeDetail extends Overtime {}

export interface OvertimeHistoryDetail {
  overtimeHistoryId: number;
  note: string;
  startDay: string;
  endDay: string;
  user: UserShortInfo | null;
  department: DepartmentShortInfo | null;
  overtime: OvertimeShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AllowanceDetail extends Allowance {}

export interface MedicalTrainingResultsDetail {
  trainingResultsId: number;
  user: UserShortInfo | null;
  understandingOfMedicalTheory: number;
  knowledgeOfTreatmentProtocols: number;
  abilityToLearnNewKnowledge: number;
  diagnosticSkills: number;
  treatmentSkills: number;
  decisionMakingSkills: number;
  communicationSkillsWithPatientsAndTheirFamilies: number;
  communicationSkillsWithColleagues: number;
  patientMonitoringAndCare: number;
  participationInMedicalResearch: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Gender {
  FEMALE = 0,
  MALE,
}

export enum DayOfWeek {
  MONDAY = 2,
  TUESDAY = 3,
  WEDNESDAY = 4,
  THURSDAY = 5,
  FRIDAY = 6,
  SATURDAY = 7,
  SUNDAY = 8,
}

export const dayOfWeek = {
  [DayOfWeek.MONDAY]: "Monday",
  [DayOfWeek.TUESDAY]: "Tuesday",
  [DayOfWeek.WEDNESDAY]: "Wednesday",
  [DayOfWeek.THURSDAY]: "Thursday",
  [DayOfWeek.FRIDAY]: "Friday",
  [DayOfWeek.SATURDAY]: "Saturday",
  [DayOfWeek.SUNDAY]: "Sunday",
};
