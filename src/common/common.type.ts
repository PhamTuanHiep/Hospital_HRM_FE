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
  image: string;
  fatherFullName: string;
  fatherBirthday: string;
  motherFullName: string;
  motherBirthday: string;
  departmentId: string;
  weeklySchedule: number[];
  insuranceIds: string[];
  allowances: string[];
  allowanceIds: number[];
  evaluateId: number;
  jobDescription: string[];
  otherDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}

export interface Account {
  accountId: number;
  email: string;
  password: string;
  roleId: string;
  userId: number;
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface Position {
  positionId: string;
  positionName: string;
  salaryCoefficient: number;
  leaveId: string;
}
export interface Leave {
  leaveId: string;
  leaveTypes: string;
  MaxLeaveEntitlement: number;
}

export interface Insurance {
  insuranceId: string;
  insuranceName: string;
  insuranceType: string;
  monthlyPercentage: number;
  note: string;
}

export interface Evaluate {
  evaluateId: number;
  userId: number;
  workLoad: number;
  quanlityOfWork: number;
  capacityOfWork: number;
  quantityOfScientificWorks: number;
  workInitiatives: number;
  professionalEthics: number;
  workingStyle: number;
  responsibilityForWork: number;
  workAttitude: number;
  workSpirit: number;
  workResult: number;
}

export interface Department {
  departmentId: string;
  departmentName: string;
}

export interface Allowance {
  allowanceId: number;
  allowanceAcronym: string;
  allowanceType: string;
  allowanceName: string;
  allowanceRate: number;
  allowanceFee: number;
  note: string;
}

export interface Overtime {
  overtimeId: string;
  overtimeName: string;
  overtimePay: number;
  note: string[];
}

export interface OvertimeHistory {
  overtimeHistoryId: number;
  userId: number;
  overtimeId: string;
  departmentId: string;
  days: string;
  note: string;
}

export enum Gender {
  FEMALE = 0,
  MALE,
}

export interface OvertimeScheduleIndex {
  order: string;
  departmentName: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
