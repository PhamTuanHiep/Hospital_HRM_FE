import { ReactNode } from "react";
import {
  AccountDetail,
  DepartmentDetail,
  PositionDetail,
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
