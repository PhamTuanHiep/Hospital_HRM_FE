import {
  AccountDetail,
  ContractDetail,
  ContractHistoryDetail,
  DepartmentDetail,
  PositionDetail,
  SalaryHistoryShortInfo,
  UserDetail,
} from "../../../common/common.type";

export interface AccountsData {
  key: React.Key;
  email: string;
  password: string;
  roleName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  actions: AccountDetail;
}

export interface UsersData {
  key: React.Key;
  fullName: string;
  email: string;
  gender: number;
  address: string;
  phoneNumber: string;
  nation: string;
  birthday: string;
  departmentName: string;
  positionName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  actions: UserDetail;
}

export interface EmployeeColumnType {
  key: React.Key;
  email: string;
  fullName: string;
  gender: number;
  departmentName: string;
  positionName: string;
  // averageScore: ReactNode;
  status: string;
  createdAt: string;
  updatedAt: string;
  actions: UserDetail;
}

export interface DepartmentColumnType {
  key: React.Key;
  departmentId: string;
  departmentName: string;
  location: string;
  funcDescription: string;
  // users: ReactNode;
  createdAt: string;
  updatedAt: string;
  actions: DepartmentDetail;
}

export interface DepartmentForm {
  departmentId: string;
  departmentName: string;
  location: string;
  funcDescription: string;
}

export interface PositionColumnType {
  key: React.Key;
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
  // users: UserShortInfo[] | null;
  // positionAllowances: PositionAllowanceShortInfo[] | null;
  createdAt: string;
  updatedAt: string;
  actions: PositionDetail;
}

export interface PositionForm {
  key: React.Key;
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
}

export interface EvaluateForm {
  workLoad: number;
  workResult: number;
  workSpirit: number;
  workingStyle: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  responsibilityForWork: number;
  workInitiatives: number;
}

export interface EvaluatePost extends EvaluateForm {
  userId: number;
}

export interface ContractHistoryColumnType {
  key: React.Key;
  fullName: string;
  positionName: string;
  gender: number;
  startDay: string;
  endDay: string;
  actions: ContractHistoryDetail;
}

export interface ContractHistoryPost {
  userId?: number;
  contractId: string;
  startDay: string;
  endDay: string;
  note: string;
}

export interface ContractHistoryForm {
  contractId: string;
  startDay: string;
  endDay: string;
  note: string;
}

export interface ContractColumnType {
  key: React.Key;
  contractId: string;
  contractName: string;
  // note: ReactNode;
  createdAt: string;
  updatedAt: string;
  actions: ContractDetail;
}

export interface ContractPost {
  contractId?: string;
  contractNameVI: string;
  contractNameEN: string;
  note: string[];
}
export interface ContractForm extends ContractPost {
  contractId: string;
}

export interface AttendanceData {
  employeeId: number;
  employeeName: string;
  sickLeave: number; //nghi om
  compensatoryLeave: number; //nghi bu //nghi ko luong
  annualLeave: number; //nghi phep
  publicHoliday: number; //nghi le
  leaveOfAbsence: number; //nghi che do
  unpaidLeave: number; //nghi khong luong
  attendance: number;
  standardWorkDays: number;
  bonus: number;
}

export interface SalaryHistoryColumnData {
  key: React.Key;
  userId: number;
  employeeName: string;
  departmentName: string;
  positionName: string;
  time: string;
  paidLeave: number;
  unpaidLeave: number;
  attendance: number;
  bonus: number;
  allowance: number;
  salary: number;
  actions: SalaryHistoryPost;
  // actions: SalaryHistoryDetail;
}
export interface SalaryHistoryColumnType {
  employeeName: string;
  departmentName: string;
  positionName: string;
  time: string;
  paidLeave: number;
  unpaidLeave: number;
  attendance: number;
  bonus: number;
  allowance: number;
  salary: number;
  actions: SalaryHistoryPost;
}

export interface SalaryHistoryPost {
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

export interface PaidPayrollColumnData {
  key: React.Key;
  userId: number;
  employeeName: string;
  departmentName: string;
  positionName: string;
  time: string;
  paidLeave: number;
  unpaidLeave: number;
  attendance: number;
  bonus: number;
  allowance: number;
  salary: number;
  actions: SalaryHistoryShortInfo;
}

export interface UnPaidPayrollColumnData {
  key: React.Key;
  userId: number;
  employeeName: string;
  departmentName: string;
  positionName: string;
}

export interface RecruitmentPostCreate {
  title: string;
  subtitle: string;
  generalRequirements: string;
  benefits: string;
  requiredDocuments: string;
  contact: string;
  image: string;
  userId: number;
}

export interface AnnouncementPostCreate {
  title: string;
  abstract: string;
  notificationType: string;
  contentDetail: string;
  contact: string;
  image: string;
  userId: number;
}

export interface RecruitmentPostUpdate {
  title?: string;
  subtitle?: string;
  generalRequirements?: string;
  benefits?: string;
  requiredDocuments?: string;
  contact?: string;
  image?: string;
  userId?: number;
}

export interface AnnouncementPostUpdate {
  title?: string;
  abstract?: string;
  notificationType?: string;
  contentDetail?: string;
  contact?: string;
  image?: string;
  userId?: number;
}
