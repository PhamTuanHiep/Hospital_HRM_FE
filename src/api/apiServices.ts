import { AccountForm, QueryParams, UserPost } from "../common/common.type";
import {
  AnnouncementPostUpdate,
  ContractHistoryPost,
  ContractPost,
  DepartmentForm,
  EvaluatePost,
  PositionForm,
  RecruitmentPostCreate,
  RecruitmentPostUpdate,
  SalaryHistoryPost,
} from "../features/manager/constants/manager.type";
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

export const postPosition = async (position: PositionForm) => {
  try {
    return await instance.post(`${apiPaths.POSITIONS}`, position);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putPosition = async (
  positionId: string,
  position: PositionForm
) => {
  try {
    return await instance.put(`${apiPaths.POSITIONS}/${positionId}`, position);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deletePosition = async (positionId: string) => {
  try {
    return await instance.delete(`${apiPaths.POSITIONS}/${positionId}`);
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

export const postEvaluate = async (evaluate: EvaluatePost) => {
  try {
    return await instance.post(`${apiPaths.EVALUATES}`, evaluate);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putEvaluate = async (
  evaluateId: number,
  evaluate: EvaluatePost
) => {
  try {
    return await instance.put(`${apiPaths.EVALUATES}/${evaluateId}`, evaluate);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//DEPARTMENTS

export const getDepartments = async (queryParams?: QueryParams) => {
  try {
    if (queryParams) {
      return await instance.get(`${apiPaths.DEPARTMENTS}`, {
        params: queryParams,
      });
    } else {
      return await instance.get(`${apiPaths.DEPARTMENTS}`);
    }
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

export const putDepartment = async (
  departmentId: string,
  department: DepartmentForm
) => {
  try {
    return await instance.put(
      `${apiPaths.DEPARTMENTS}/${departmentId}`,
      department
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const postDepartment = async (department: DepartmentForm) => {
  try {
    return await instance.post(`${apiPaths.DEPARTMENTS}`, department);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteDepartment = async (departmentId: string) => {
  try {
    return await instance.delete(`${apiPaths.DEPARTMENTS}/${departmentId}`);
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

//CONTRACT

export const getContracts = async () => {
  try {
    return await instance.get(`${apiPaths.CONTRACTS}`);
  } catch (error) {
    console.log("Error calling API getOvertimes :", error);
  }
};

export const getContract = async (contractId: string) => {
  try {
    return await instance.get(`${apiPaths.CONTRACTS}/${contractId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putContract = async (
  contractId: string,
  contract: ContractPost
) => {
  try {
    return await instance.put(`${apiPaths.CONTRACTS}/${contractId}`, contract);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteContract = async (contractId: string) => {
  try {
    return await instance.delete(`${apiPaths.CONTRACTS}/${contractId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//CONTRACT-HISTORIES

export const getContractHistories = async () => {
  try {
    return await instance.get(`${apiPaths.CONTRACT_HISTORIES}`);
  } catch (error) {
    console.log("Error calling API getOvertimeHistories :", error);
  }
};

export const getContractHistory = async (contractHistoryId: number) => {
  try {
    return await instance.get(
      `${apiPaths.CONTRACT_HISTORIES}/${contractHistoryId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putContractHistory = async (
  contractHistoryId: number,
  contractHistory: ContractHistoryPost
) => {
  try {
    return await instance.put(
      `${apiPaths.CONTRACT_HISTORIES}/${contractHistoryId}`,
      contractHistory
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteContractHistory = async (contractHistoryId: number) => {
  try {
    return await instance.delete(
      `${apiPaths.CONTRACT_HISTORIES}/${contractHistoryId}`
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

//SALARY-HISTORIES

export const getSalaryHistories = async () => {
  try {
    return await instance.get(`${apiPaths.SALARY_HISTORY}`);
  } catch (error) {
    console.log("Error calling API getOvertimes :", error);
  }
};

export const getSalaryHistory = async (salaryHistoryId: number) => {
  try {
    return await instance.get(`${apiPaths.SALARY_HISTORY}/${salaryHistoryId}`);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const postSalaryHistory = async (salaryHistory: SalaryHistoryPost) => {
  try {
    return await instance.post(`${apiPaths.SALARY_HISTORY}`, salaryHistory);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putSalaryHistory = async (
  salaryHistoryId: number,
  salaryHistory: SalaryHistoryPost
) => {
  try {
    return await instance.put(
      `${apiPaths.SALARY_HISTORY}/${salaryHistoryId}`,
      salaryHistory
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteSalaryHistory = async (salaryHistoryId: number) => {
  try {
    return await instance.delete(
      `${apiPaths.SALARY_HISTORY}/${salaryHistoryId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//RECRUITMENT_POST

export const getRecruitmentPosts = async () => {
  try {
    return await instance.get(`${apiPaths.RECRUITMENT_POSTS}`);
  } catch (error) {
    console.log("Error calling API getRecruitmentPosts :", error);
  }
};

export const getRecruitmentPost = async (recruitmentPostId: number) => {
  try {
    return await instance.get(
      `${apiPaths.RECRUITMENT_POSTS}/${recruitmentPostId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const postRecruitmentPost = async (
  recruitmentPostCreate: RecruitmentPostCreate
) => {
  const formData = new FormData();

  formData.append("image", recruitmentPostCreate.image);
  formData.append("title", recruitmentPostCreate.title);
  formData.append("subtitle", recruitmentPostCreate.subtitle);
  formData.append(
    "generalRequirements",
    recruitmentPostCreate.generalRequirements
  );
  formData.append("requiredDocuments", recruitmentPostCreate.requiredDocuments);
  formData.append("contact", recruitmentPostCreate.contact);
  formData.append("benefits", recruitmentPostCreate.benefits);

  formData.append("userId", recruitmentPostCreate.userId.toString());

  try {
    return await instance.post(`${apiPaths.RECRUITMENT_POSTS}`, formData);
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const putRecruitmentPost = async (
  recruitmentPostId: number,
  recruitmentPostUpdate: RecruitmentPostUpdate
) => {
  try {
    return await instance.put(
      `${apiPaths.RECRUITMENT_POSTS}/${recruitmentPostId}`,
      recruitmentPostUpdate
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteRecruitmentPost = async (recruitmentPostId: number) => {
  try {
    return await instance.delete(
      `${apiPaths.RECRUITMENT_POSTS}/${recruitmentPostId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

//ANNOUNCEMENT_POSTS

export const getAnnouncementPosts = async () => {
  try {
    return await instance.get(`${apiPaths.ANNOUNCEMENT_POSTS}`);
  } catch (error) {
    console.log("Error calling API getAnnouncementPosts :", error);
  }
};

export const getAnnouncementPost = async (announcementPostId: number) => {
  try {
    return await instance.get(
      `${apiPaths.ANNOUNCEMENT_POSTS}/${announcementPostId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const createAnnouncementPost = async (
  recruitmentPostCreate: RecruitmentPostCreate
) => {
  try {
    return await instance.post(
      `${apiPaths.ANNOUNCEMENT_POSTS}`,
      recruitmentPostCreate
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const updateAnnouncementPost = async (
  announcementPostId: number,
  announcementPostUpdate: AnnouncementPostUpdate
) => {
  try {
    return await instance.put(
      `${apiPaths.ANNOUNCEMENT_POSTS}/${announcementPostId}`,
      announcementPostUpdate
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};

export const deleteAnnouncementPost = async (announcementPostId: number) => {
  try {
    return await instance.delete(
      `${apiPaths.ANNOUNCEMENT_POSTS}/${announcementPostId}`
    );
  } catch (error) {
    console.log("Error calling API:", error);
  }
};
