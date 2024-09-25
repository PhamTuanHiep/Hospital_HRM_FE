import instance from "./api";
import { apiPaths } from "./api.constant";

export const getRole = (roleId: string) => {
  return instance.get(`${apiPaths.ROLES}/${roleId}`);
};
export const getUser = (userId: number) => {
  return instance.get(`${apiPaths.USERS}/${userId}`);
};

export const getInsurances = () => {
  return instance.get(`${apiPaths.INSURANCES}`);
};

export const getAllowances = () => {
  return instance.get(`${apiPaths.ALLOWANCES}`);
};

export const getUsers = async () => {
  return instance.get(`${apiPaths.USERS}`);
};

export const getDepartments = async () => {
  return instance.get(`${apiPaths.DEPARTMENTS}`);
};

export const getOvertimes = async () => {
  return instance.get(`${apiPaths.OVERTIMES}`);
};

export const getOvertimeHistories = async () => {
  return instance.get(`${apiPaths.OVERTIMEHISTORIES}`);
};

export const getPositions = () => {
  return instance.get(`${apiPaths.POSITIONS}`);
};
