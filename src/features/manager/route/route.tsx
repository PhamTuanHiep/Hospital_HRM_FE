import { RouteObject } from "react-router-dom";
import { ManagerPaths } from "../constants/constant.path";
import EmployeeManagementScreen from "../screens/employeeManagementScreen/EmployeeManagementScreen";
import AccountManagementScreen from "../screens/accountManagementScreen/AccountManagementScreen";
import ProfileManagementScreen from "../screens/profileManagementScreen/ProfileManagementScreen";
import DepartmentManagementScreen from "../screens/departmentManagementScreen/DepartmentManagementScreen";
import JobManagementScreen from "../screens/jobManagementScreen/JobManagementScreen";
import BenefitsManagementScreen from "../screens/benefitsManagementScreen/BenefitsManagementScreen";
import ContractManagementScreen from "../screens/contractManagementScreen/ContractManagementScreen";
import RecruitmentManagementScreen from "../screens/recruitmentManagementScreen/RecruitmentManagementScreen";
import TrainingScreen from "../screens/trainingScreen/TrainingScreen";

const ACCOUNT_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.ACCOUNT_MANAGEMENT,
  element: <AccountManagementScreen />,
};

const EMPLOYEE_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.EMPLOYEE_MANAGEMENT,
  element: <EmployeeManagementScreen />,
};

const PROFILE_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.PROFILE_MANAGEMENT,
  element: <ProfileManagementScreen />,
};

const CONTRACT_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.CONTRACT_MANAGEMENT,
  element: <ContractManagementScreen />,
};

const DEPARTMENT_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.DEPARTMENT_MANAGEMENT,
  element: <DepartmentManagementScreen />,
};

const JOB_MANAGEMENTS_ROUTE: RouteObject = {
  path: ManagerPaths.JOB_MANAGEMENT,
  element: <JobManagementScreen />,
};

const BENEFITS_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.BENEFITS_MANAGEMENT,
  element: <BenefitsManagementScreen />,
};

const RECRUITMENT_MANAGEMENT_ROUTE: RouteObject = {
  path: ManagerPaths.RECRUITMENT_MANAGEMENT,
  element: <RecruitmentManagementScreen />,
};

const TRAINING_ROUTE: RouteObject = {
  path: ManagerPaths.TRAINING,
  element: <TrainingScreen />,
};

export const MANAGER_ROUTES = [
  ACCOUNT_MANAGEMENT_ROUTE,
  EMPLOYEE_MANAGEMENT_ROUTE,
  PROFILE_MANAGEMENT_ROUTE,
  CONTRACT_MANAGEMENT_ROUTE,
  DEPARTMENT_MANAGEMENT_ROUTE,
  JOB_MANAGEMENTS_ROUTE,
  BENEFITS_MANAGEMENT_ROUTE,
  RECRUITMENT_MANAGEMENT_ROUTE,
  TRAINING_ROUTE,
];
