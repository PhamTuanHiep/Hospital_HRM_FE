import { AccountForm, UserPost } from "../common/common.type";
import instance from "./api";
import { apiPaths } from "./api.constant";

//account

export const getAccounts = async () => {
  try {
    return await instance.get(`${apiPaths.ACCOUNTS}`, {});
  } catch (error) {
    console.log("Error calling API getAccounts :", error);
  }
};

export const getAccount = async (accountId: number) => {
  try {
    return await instance.get(`${apiPaths.ACCOUNTS}/${accountId}`, {});
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putAccount = async (accountId: number, account: AccountForm) => {
  try {
    return await instance.put(`${apiPaths.ACCOUNTS}/${accountId}`, account);
  } catch (error) {
    console.log("Error calling API putAccount:", error);
  }
};

export const deleteAccount = async (accountId: number) => {
  try {
    return await instance.delete(`${apiPaths.ACCOUNTS}/${accountId}`);
  } catch (error) {
    console.log("Error calling API putAccount:", error);
  }
};

//USER

export const getUsers = async () => {
  try {
    return await instance.get(`${apiPaths.USERS}`);
  } catch (error) {
    console.log("Error calling API getUsers :", error);
  }
};

export const getUser = async (userId: number) => {
  try {
    return await instance.get(`${apiPaths.USERS}/${userId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const postUser = async (user: UserPost) => {
  try {
    return await instance.post(`${apiPaths.USERS}/`, user);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putUser = async (userId: number, user: UserPost) => {
  try {
    return await instance.put(`${apiPaths.USERS}/${userId}`, user);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteUser = async (userId: number) => {
  try {
    return await instance.delete(`${apiPaths.USERS}/${userId}`);
  } catch (error) {
    console.log("Error calling API putAccount:", error);
  }
};

//ROLE

export const getRoles = async () => {
  try {
    return await instance.get(`${apiPaths.ROLES}`);
  } catch (error) {
    console.log("Error calling API getRoles :", error);
  }
};

export const getRole = async (roleId: string) => {
  try {
    return await instance.get(`${apiPaths.ROLES}/${roleId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//POSITION-ALLOWANCE

export const getPositionAllowances = async () => {
  try {
    return await instance.get(`${apiPaths.POSITION_ALLOWANCE}`);
  } catch (error) {
    console.log("Error calling API getPositionAllowances :", error);
  }
};

export const getPositionAllowance = async (id: number) => {
  try {
    return await instance.get(`${apiPaths.POSITION_ALLOWANCE}/${id}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//POSITION

export const getPositions = async () => {
  try {
    return await instance.get(`${apiPaths.POSITIONS}`);
  } catch (error) {
    console.log("Error calling API getPositions :", error);
  }
};

export const getPosition = async (positionId: string) => {
  try {
    return await instance.get(`${apiPaths.POSITIONS}/${positionId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//LEAVE-HISTORY
export const getLeaveHistories = async () => {
  try {
    return await instance.get(`${apiPaths.LEAVE_HISTORIES}`);
  } catch (error) {
    console.log("Error calling API getLeaveHistories :", error);
  }
};

export const getLeaveHistory = async (leaveHistoryId: number) => {
  try {
    return await instance.get(`${apiPaths.LEAVE_HISTORIES}/${leaveHistoryId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};
//LEAVES
export const getLeaves = async () => {
  try {
    return await instance.get(`${apiPaths.LEAVES}`);
  } catch (error) {
    console.log("Error calling API getLeaves :", error);
  }
};

export const getLeave = async (leaveId: string) => {
  try {
    return await instance.get(`${apiPaths.LEAVES}/${leaveId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//USER-INSURANCE
export const getUserInsurances = async () => {
  try {
    return await instance.get(`${apiPaths.USER_INSURANCE}`);
  } catch (error) {
    console.log("Error calling API getUserInsurances :", error);
  }
};

export const getUserInsurance = async (id: number) => {
  try {
    return await instance.get(`${apiPaths.USER_INSURANCE}/${id}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//INSURANCES
export const getInsurances = async () => {
  try {
    return await instance.get(`${apiPaths.INSURANCES}`);
  } catch (error) {
    console.log("Error calling API getInsurances :", error);
  }
};

export const getInsurance = async (insuranceId: string) => {
  try {
    return await instance.get(`${apiPaths.INSURANCES}/${insuranceId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//EVALUATES

export const getEvaluates = async () => {
  try {
    return await instance.get(`${apiPaths.EVALUATES}`);
  } catch (error) {
    console.log("Error calling API getEvaluates :", error);
  }
};

export const getEvaluate = async (evaluateId: number) => {
  try {
    return await instance.get(`${apiPaths.EVALUATES}/${evaluateId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//DEPARTMENTS

export const getDepartments = async () => {
  try {
    return await instance.get(`${apiPaths.DEPARTMENTS}`);
  } catch (error) {
    console.log("Error calling API getDepartments :", error);
  }
};

export const getDepartment = async (departmentId: string) => {
  try {
    return await instance.get(`${apiPaths.DEPARTMENTS}/${departmentId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//ALLOWANCES

export const getAllowances = async () => {
  try {
    return await instance.get(`${apiPaths.ALLOWANCES}`);
  } catch (error) {
    console.log("Error calling API getAllowances :", error);
  }
};

export const getAllowance = async (allowanceId: number) => {
  try {
    return await instance.get(`${apiPaths.ALLOWANCES}/${allowanceId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//OVERTIMES

export const getOvertimes = async () => {
  try {
    return await instance.get(`${apiPaths.OVERTIMES}`);
  } catch (error) {
    console.log("Error calling API getOvertimes :", error);
  }
};

export const getOvertime = async (overtimeId: string) => {
  try {
    return await instance.get(`${apiPaths.OVERTIMES}/${overtimeId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//OVERTIME-HISTORIES

export const getOvertimeHistories = async () => {
  try {
    return await instance.get(`${apiPaths.OVERTIME_HISTORIES}`);
  } catch (error) {
    console.log("Error calling API getOvertimeHistories :", error);
  }
};

export const getOvertimeHistory = async (overtimeHistoryId: number) => {
  try {
    return await instance.get(
      `${apiPaths.OVERTIME_HISTORIES}/${overtimeHistoryId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//MedicalTrainingResults

export const getMedicalTrainingResults = async () => {
  try {
    return await instance.get(`${apiPaths.MEDICAL_TRAINING_RESULTS}`);
  } catch (error) {
    console.log("Error calling API getMedicalTrainingResults :", error);
  }
};

export const getMedicalTrainingResult = async (trainingResultsId: number) => {
  try {
    return await instance.get(
      `${apiPaths.MEDICAL_TRAINING_RESULTS}/${trainingResultsId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//NursingTrainingResults

export const getNursingTrainingResults = async () => {
  try {
    return await instance.get(`${apiPaths.NURSING_TRAINING_RESULTS}`);
  } catch (error) {
    console.log("Error calling API getNursingTrainingResults  :", error);
  }
};

export const getNursingTrainingResult = async (trainingResultsId: number) => {
  try {
    return await instance.get(
      `${apiPaths.NURSING_TRAINING_RESULTS}/${trainingResultsId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};
