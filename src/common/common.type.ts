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
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
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

export const dayOfWeekVN = {
  [DayOfWeek.MONDAY]: "Thứ hai",
  [DayOfWeek.TUESDAY]: "Thứ ba",
  [DayOfWeek.WEDNESDAY]: "Thứ tư",
  [DayOfWeek.THURSDAY]: "Thứ năm",
  [DayOfWeek.FRIDAY]: "Thứ sáu",
  [DayOfWeek.SATURDAY]: "Thứ bảy",
  [DayOfWeek.SUNDAY]: "Chủ nhật",
};

export enum DepartmentId {
  D001 = "D001",
  D002 = "D002",
  D003 = "D003",
  D004 = "D004",
  D005 = "D005",
  D006 = "D006",
  D007 = "D007",
  D008 = "D008",
  D009 = "D009",
  D010 = "D010",
  D011 = "D011",
  D012 = "D012",
  D013 = "D013",
  D014 = "D014",
  D015 = "D015",
  D016 = "D016",
  D017 = "D017",
  D018 = "D018",
  D019 = "D019",
  D020 = "D020",
  D021 = "D021",
  D022 = "D022",
  D023 = "D023",
}

export const departmentName = {
  [DepartmentId.D001]: "Phòng giám đốc",
  [DepartmentId.D002]: "Phòng phó giám đốc",
  [DepartmentId.D003]: "Khoa phòng khám",
  [DepartmentId.D004]: "Khoa nội tổng hợp",
  [DepartmentId.D005]: "Khoa hồi sức chống độc",
  [DepartmentId.D006]: "Khoa lão khoa",
  [DepartmentId.D007]: "Khoa nhi",
  [DepartmentId.D008]: "Khoa châm cứu",
  [DepartmentId.D009]: "Khoa phục hồi chấn thương",
  [DepartmentId.D010]: "Khoa ngũ quan",
  [DepartmentId.D011]: "Khoa ngoại",
  [DepartmentId.D012]: "Khoa sản",
  [DepartmentId.D013]: "Khoa phòng mổ",
  [DepartmentId.D014]: "Khoa xét nghiệm",
  [DepartmentId.D015]: "Chuẩn đoán hình ảnh",
  [DepartmentId.D016]: "Khoa dược",
  [DepartmentId.D017]: "Khoa dinh dưỡng",
  [DepartmentId.D018]: "Khoa kiểm soát nhiễm khuẩn",
  [DepartmentId.D019]: "Phòng tổ chức hành chính",
  [DepartmentId.D020]: "Phòng kế hoạch tổng hợp",
  [DepartmentId.D021]: "Phòng tài chính kế toán",
  [DepartmentId.D022]: "Phòng đào tạo",
  [DepartmentId.D023]: "Phòng điều dưỡng",
};

export enum PositionId {
  P001 = "P001",
  P002 = "P002",
  P003 = "P003",
  P004 = "P004",
  P005 = "P005",
  P006 = "P006",
  P007 = "P007",
  P008 = "P008",
  P009 = "P009",
  P010 = "P010",
}

export const positionName = {
  [PositionId.P001]: "Bác sĩ cao cấp",
  [PositionId.P002]: "Bác sĩ chính",
  [PositionId.P003]: "Bác sĩ",
  [PositionId.P004]: "Bác sĩ y học dự phòng cao cấp",
  [PositionId.P005]: "Bác sĩ y học dự phòng chính",
  [PositionId.P006]: "Bác sĩ y học dự phòng",
  [PositionId.P007]: "Y sĩ",
  [PositionId.P008]: "Y tá cao cấp",
  [PositionId.P009]: "Y tá chính",
  [PositionId.P010]: "Y tá",
};
