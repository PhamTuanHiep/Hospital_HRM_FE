import { AccountDetail, UserDetail } from "../../../common/common.type";

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
