import React from "react";
import {
  AccountDetail,
  ContractDetail,
  ContractHistoryDetail,
  DepartmentDetail,
  DepartmentUserShortInfo,
  PositionDetail,
  RowType,
  SalaryHistoryShortInfo,
  UserDetail,
  UserShortInfo,
} from "../../../common/common.type";
import { RcFile } from "antd/es/upload";
import { Dayjs } from "dayjs";

export interface AccountsData extends RowType {
  email: string;
  password: string;
  roleName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  actions: AccountDetail;
}

export interface EmployeeNotHaveAccountColumns extends RowType {
  userId?: number;
  fullName?: string;
  gender: number;
  departmentName: string;
  positionName: string;
  createdAt?: Date;
  updatedAt?: Date;
  actions: UserDetail;
}

export interface CreateAccountFormType {
  fullName: string;
  gender: string;
  departmentName?: string;
  positionName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  roleId: string;
}

export interface UsersData extends RowType {
  fullName: string;
  email: string;
  gender: number;
  address: string;
  phoneNumber: string;
  nation: string;
  birthday: string;
  departmentName: string;
  salaryCoefficient: number;
  positionName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  actions: UserDetail;
}

export interface EmployeeWorkColumnType extends RowType {
  email: string;
  fullName: string;
  gender: number;
  departmentName: string;
  salaryCoefficient: number;
  positionName: string;
  // averageScore: ReactNode;
  status: string;
  createdAt: string;
  updatedAt: string;
  actions: UserDetail;
}

export interface EmployeeTrainingColumnType extends RowType {
  email: string;
  fullName: string;
  gender: number;
  departmentName: string;
  positionName: string;
  createdAt: string;
  updatedAt: string;
  actions: UserDetail;
}

export interface DepartmentColumnType extends RowType {
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

export interface PositionColumnType extends RowType {
  positionId: string;
  positionName: string;
  users: React.ReactNode;
  allowanceRelationship: React.ReactNode;
  createdAt: string;
  updatedAt: string;
  actions: PositionDetail;
}

export interface PositionForm {
  key: React.Key;
  positionId: string;
  positionName: string;
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

export interface MedicalForm {
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
}

export interface UpdateMedicalTrainingResult {
  understandingOfMedicalTheory?: number;
  knowledgeOfTreatmentProtocols?: number;
  abilityToLearnNewKnowledge?: number;
  diagnosticSkills?: number;
  treatmentSkills?: number;
  decisionMakingSkills?: number;
  communicationSkillsWithPatientsAndTheirFamilies?: number;
  communicationSkillsWithColleagues?: number;
  patientMonitoringAndCare?: number;
  participationInMedicalResearch?: number;
}

export interface CreateMedicalTrainingResult {
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
  userId: number;
  contractId: string;
  startDay: string;
  endDay: string;
  note: string;
  status: number;
}
export interface ContractHistoryPut {
  contractHistoryId?: number;
  userId?: number;
  contractId?: string;
  startDay?: string;
  endDay?: string;
  note?: string;
  suspensionTime?: number;
  status?: number;
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
  month: number;
}

export interface SalaryHistoryColumnData extends RowType {
  userId: number;
  employeeName: string;
  departmentName: string;
  positionName: string;
  time: string;
  paidLeave: number;
  unpaidLeave: number;
  attendance: number;
  bonus: number;
  overtimeCost: number;
  allowance: number;
  salary: number;
  actions: SalaryHistoryPost;
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
  overtimeCost: number;
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

export interface PaidPayrollColumnData extends RowType {
  userId: number;
  employeeName: string;
  departmentName: string;
  positionName: string;
  time: string;
  paidLeave: number;
  unpaidLeave: number;
  attendance: number;
  bonus: number;
  overtimeCost: number;
  allowance: number;
  salary: number;
  actions: SalaryHistoryShortInfo;
}

export interface UnPaidPayrollColumnData extends RowType {
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
  image: RcFile | undefined;
  userId: number;
}

export interface RecruitmentPostUpdate {
  title: string;
  subtitle: string;
  generalRequirements: string;
  benefits: string;
  requiredDocuments: string;
  contact: string;
  image?: RcFile;
  userId: number;
}

export interface AnnouncementPostCreate {
  title: string;
  abstract: string;
  notificationType: string;
  contentDetail: string;
  contact: string;
  image?: RcFile;
  userId: number;
}

export interface AnnouncementPostUpdate {
  title: string;
  abstract: string;
  notificationType: string;
  contentDetail: string;
  contact: string;
  image?: RcFile;
  userId: number;
}

// export interface RecruitmentPostDetail {
//   recruitmentPostId: number;
//   title: string;
//   subtitle: string;
//   generalRequirements: string;
//   benefits: string;
//   requiredDocuments: string;
//   contact: string;
//   image: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user: UserShortInfo | null;
// }

export interface ContractTableData extends RowType {
  userId?: number;
  fullName?: string;
  startDay: string;
  endDay: string;
  note: string;
  contractStatus: number;
  createdAt?: Date;
  updatedAt?: Date;
  actions: ContractHistoryDetail;
}

export interface NonContractedEmployee extends RowType {
  userId?: number;
  fullName?: string;
  gender: number;
  departmentName: string;
  positionName: string;
  createdAt?: Date;
  updatedAt?: Date;
  actions: UserDetail;
}

export interface UpdateContractHistoryFormType {
  contractName?: string;
  userName?: string;
  positionName?: string;
  departmentName?: string;
  status?: number;
  startDay?: string;
  endDay?: string;
}

export interface CreateContractHistoryFormType {
  employeeName: number;
  contractId: string;
  startDay?: string;
  endDay?: string;
  note: string;
  status: number;
}

export interface OptionStringType {
  label: string;
  value: string;
}
export interface OptionNumberType {
  label: string;
  value: number;
}

export interface ScheduleWorkColumnType extends RowType {
  userId: number;
  fullName: string;
  gender: number;
  address: string;
  actions: DepartmentUserShortInfo;
}

export interface UpdateOvertimeHistoryFormType {
  termId: number;
  overtimeHistoryId?: number;
  departmentName?: string;
  overtimeId: string;
  note?: string[];
  startDay: Dayjs;
  endDay: Dayjs;
}

export interface FinishOvertimeHistoryFormType {
  termId: number;
  overtimeHistoryId?: number;
  userId: number;
  overtimeId: string;
  departmentId: string;
  note?: string[];
  startDay: string;
  endDay: string;
}
export interface CreateOvertimeHistory {
  userId: number;
  overtimeId: string;
  departmentId: string;
  note?: string[];
  startDay: string;
  endDay: string;
}

export enum OvertimeType {
  OT001 = "OT001",
  OT002 = "OT002",
  OT003 = "OT003",
  OT004 = "OT004",

  OT005 = "OT005",
  OT006 = "OT006",
  OT007 = "OT007",
  OT008 = "OT008",

  OT009 = "OT009",
  OT010 = "OT010",
  OT011 = "OT011",
  OT012 = "OT012",

  OT013 = "OT013",
  OT014 = "OT014",
  OT015 = "OT015",

  OT016 = "OT016",
  OT017 = "OT017",
  OT018 = "OT018",
}
export const overtimeType = {
  [OvertimeType.OT001]: "Trực 24/24",
  [OvertimeType.OT002]: "Trực 24/24 (trực giao thoa tuần)",
  [OvertimeType.OT003]: "Trực 24/24 (cuối tuần)",
  [OvertimeType.OT004]: "Trực 24/24 (ngày lễ,tết)",

  [OvertimeType.OT005]: "Trực 16/24",
  [OvertimeType.OT006]: "Trực 16/24 (trực giao thoa tuần)",
  [OvertimeType.OT007]: "Trực 16/24 (cuối tuần)",
  [OvertimeType.OT008]: "Trực 16/24 (ngày lễ,tết)",

  [OvertimeType.OT009]: "Trực 12/24",
  [OvertimeType.OT010]: "Trực 12/24 (trực giao thoa tuần)",
  [OvertimeType.OT011]: "Trực 12/24 (cuối tuần)",
  [OvertimeType.OT012]: "Trực 12/24 (ngày lễ,tết)",

  [OvertimeType.OT013]: "Trực 8/24",
  [OvertimeType.OT014]: "Trực 8/24 (cuối tuần)",
  [OvertimeType.OT015]: "Trực 8/24 (ngày lễ,tết)",

  [OvertimeType.OT016]: "Trực 6/24",
  [OvertimeType.OT017]: "Trực 6/24 (cuối tuần)",
  [OvertimeType.OT018]: "Trực 6/24 (ngày lễ,tết)",
};
export const overtimeDurations = {
  [OvertimeType.OT001]: 24,
  [OvertimeType.OT002]: 24,
  [OvertimeType.OT003]: 24,
  [OvertimeType.OT004]: 24,

  [OvertimeType.OT005]: 16,
  [OvertimeType.OT006]: 16,
  [OvertimeType.OT007]: 16,
  [OvertimeType.OT008]: 16,

  [OvertimeType.OT009]: 12,
  [OvertimeType.OT010]: 12,
  [OvertimeType.OT011]: 12,
  [OvertimeType.OT012]: 12,

  [OvertimeType.OT013]: 8,
  [OvertimeType.OT014]: 8,
  [OvertimeType.OT015]: 8,

  [OvertimeType.OT016]: 6,
  [OvertimeType.OT017]: 6,
  [OvertimeType.OT018]: 6,
};

export interface OvertimeIdsObject {
  overtimeId: string;
}
