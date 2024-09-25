import instance from "./api";
import { apiPaths } from "./api.constant";

//account

export const getAccounts = async () => {
  return instance.get(`${apiPaths.ACCOUNTS}`, {});
};

//USER

export const getUsers = async () => {
  return instance.get(`${apiPaths.USERS}`);
};

export const getUser = (userId: number) => {
  return instance.get(`${apiPaths.USERS}/${userId}`);
};

//ROLE

export const getRole = (roleId: string) => {
  return instance.get(`${apiPaths.ROLES}/${roleId}`);
};

//POITION
export const getPositions = () => {
  return instance.get(`${apiPaths.POSITIONS}`);
};

//LEAVE
//INURANCE

export const getInsurances = () => {
  return instance.get(`${apiPaths.INSURANCES}`);
};

//EVALUATE
//DEPARTMENT

export const getDepartments = async () => {
  return instance.get(`${apiPaths.DEPARTMENTS}`);
};

//ALLOWANCE

export const getAllowances = () => {
  return instance.get(`${apiPaths.ALLOWANCES}`);
};

//OVERTIME

export const getOvertimes = async () => {
  return instance.get(`${apiPaths.OVERTIMES}`);
};

//OVERTIMEHITORIE

export const getOvertimeHistories = async () => {
  return instance.get(`${apiPaths.OVERTIMEHISTORIES}`);
};
