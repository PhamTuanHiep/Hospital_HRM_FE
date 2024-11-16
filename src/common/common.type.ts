export interface CommonQueryParams {
  page?: number;
  items_per_page?: number;
  search?: string;
}

export interface PageResponse {
  currentPage: number | null;
  lastPage: number | null;
  nextPage: number | null;
  perPage: number | null;
  prevPage: number | null;
  total: number | null;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface AccountShortInfo {
  accountId: string;
  email: string;
  avatar: string;
}

export interface UserShortInfo {
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
  month: string;
  year: string;
  numOfDaysOff: number;
  dayOffList: number[];
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

export interface PositionAllowanceShortInfo {
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

export interface ContractHistoryShortInfo {
  contractHistoryId: number;
  contractId: string;
  endDay: string;
  startDay: string;
}

export interface AccountForm {
  accountId?: number;
  email: string;
  password?: string;
  avatar?: string;
  roleId: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPost {
  email?: string;
  fullName: string;
  gender: number;
  address: string;
  phoneNumber: string;
  nation: string;
  nationality: string;
  hometown: string;
  positionId: string;
  departmentId: string;
  birthday: string;
  fatherFullName: string;
  fatherBirthday: string;
  motherFullName: string;
  motherBirthday: string;
  weeklySchedule: number[];
  jobDescription: string[];
  otherDescription: string;
  status: string;
}

export interface UserForm {
  userId?: number;
  fullName: string;
  gender: number;
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
  positionName: string;
  departmentName: string;
  jobDescription: string[];
  otherDescription: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  month: string;
  year: string;
  numOfDaysOff: number;
  dayOffList: number[];
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

export interface EvaluateShortInfo {
  evaluateId: number;
  workLoad: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  workInitiatives: number;
  workingStyle: number;
  responsibilityForWork: number;
  workSpirit: number;
  workResult: number;
  averageScore: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SalaryHistoryShortInfo {
  salaryHistoryId: number;
  month: string;
  year: string;
  attendance: number;
  paidLeave: number;
  unpaidLeave: number;
  numOfDaysOff: number;
  standardWorkDays: number;
  bonus: number;
  allowance: number;
  salary: number;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  location: string;
  funcDescription: string;
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
  gender: number;
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
  leaveHistories: LeaveHistoryShortInfo[] | [];
  overtimeHistories: OvertimeHistoryUserShortInfo[] | [];
  userInsurances: UserInsuranceShortInfo[] | [];
  position: PositionShortInfo | null;
  evaluateHistories: EvaluateShortInfo[];
  contractHistories: ContractHistoryShortInfo[] | [];
  salaryHistories: SalaryHistoryShortInfo[] | [];
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
  users: UserShortInfo[] | [];
  positionAllowances: PositionAllowanceShortInfo[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaveHistoryDetail {
  leaveHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
  month: string;
  year: string;
  numOfDaysOff: number;
  dayOffList: number[];
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
  userInsurances: UserInsuranceShortInfo[] | [];
}

export interface EvaluateDetail {
  evaluateId: number;
  workLoad: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  workInitiatives: number;
  workingStyle: number;
  responsibilityForWork: number;
  workSpirit: number;
  workResult: number;
  averageScore: number;
  user: UserShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DepartmentDetail extends Department {
  users: UserShortInfo[] | [];
  overtimeHistories: OvertimeHistoryDepartmentShortInfo[] | [];
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

export interface ContractShortInfo {
  contractId: string;
  contractNameVI: string;
  contractNameEN: string;
}

export interface ContractDetail {
  contractId: string;
  contractNameVI: string;
  contractNameEN: string;
  note: string[];
  createdAt?: Date;
  updatedAt?: Date;
  contractHistories: ContractHistoryShortInfo | [];
}

export interface ContractHistoryDetail {
  contractHistoryId: number;
  startDay: string;
  endDay: string;
  note: string;
  user: UserShortInfo | null;
  contract: ContractShortInfo | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SalaryHistoryDetail {
  salaryHistoryId: number;
  userId: number;
  month: string;
  year: string;
  attendance: number;
  paidLeave: number;
  unpaidLeave: number;
  numOfDaysOff: number;
  standardWorkDays: number;
  bonus: number;
  allowance: number;
  salary: number;
}

export interface RecruitmentPostDetail {
  recruitmentPostId: number;
  title: string;
  subtitle: string;
  generalRequirements: string;
  benefits: string;
  requiredDocuments: string;
  contact: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserShortInfo | null;
}

export interface AnnouncementPostDetail {
  announcementPostId: number;
  title: string;
  abstract: string;
  notificationType: string;
  contentDetail: string;
  contact: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserShortInfo | null;
}
