import { RouteObject } from "react-router-dom";
import { managerChildPaths, managerPaths } from "../constants/constant.path";

import AccountManagementScreen from "../screens/accountManagementScreen/AccountManagementScreen";
import ProfileManagementScreen from "../screens/profileManagementScreen/ProfileManagementScreen";
import DepartmentManagementScreen from "../screens/departmentManagementScreen/DepartmentManagementScreen";
import JobManagementScreen from "../screens/jobManagementScreen/JobManagementScreen";
import ContractManagementScreen from "../screens/contractManagementScreen/ContractManagementScreen";
import RecruitmentManagementScreen from "../screens/recruitmentManagementScreen/RecruitmentManagementScreen";

import ErrorPage from "../../../error-page";
import EmployeeManagementScreen from "../screens/employeeManagementScreen/EmployeeManagementScreen";
import UserProfilesTable from "../screens/profileManagementScreen/userProfilesTable/UserProfilesTable";
import AddUserProfileScreen from "../screens/profileManagementScreen/addUserProfileScreen/AddUserProfileScreen";
import AddDepartmentScreen from "../screens/departmentManagementScreen/addDepartmentScreen/AddDepartmentScreen";
import DepartmentManagementTable from "../screens/departmentManagementScreen/departmentManagementTable/DepartmentManagementTable";
import JobManagementTable from "../screens/jobManagementScreen/jobManagementTable/JobManagementTable";
import AddJobScreen from "../screens/jobManagementScreen/addJobScreen/AddJobScreen";
import SalaryManagementScreen from "../screens/salaryManagementScreen/SalaryManagementScreen";
import SalaryManagement from "../screens/salaryManagementScreen/salaryManagement/SalaryManagement";
import BenefitsManagementScreen from "../screens/salaryManagementScreen/benefitsManagementScreen/BenefitsManagementScreen";
import AnnouncementManagementScreen from "../screens/announcementManagementScreen/AnnouncementManagementScreen";
import ContractHistoryTables from "../screens/contractManagementScreen/contractHistoryTables/ContractHistoryTables";
import AddContractTable from "../screens/contractManagementScreen/contractHistoryTables/addContractTable/AddContractTable";

const ACCOUNT_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.ACCOUNT_MANAGEMENT,
  element: <AccountManagementScreen />,
};

const EMPLOYEE_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.EMPLOYEE_MANAGEMENT,
  element: <EmployeeManagementScreen />,
};

const PROFILE_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.PROFILE_MANAGEMENT,
  element: <ProfileManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <UserProfilesTable />,
    },
    {
      path: managerChildPaths.ADD_USER,
      element: <AddUserProfileScreen />,
    },
  ],
};

const CONTRACT_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.CONTRACT_MANAGEMENT,
  element: <ContractManagementScreen />,
  children: [
    {
      index: true,
      element: <ContractHistoryTables />,
    },
    {
      path: managerChildPaths.CANCELLED_CONTRACT,
      element: <ContractHistoryTables isCancelledContractList={true} />,
    },
    {
      path: managerChildPaths.ADD_CONTRACT,
      element: <AddContractTable />,
    },
  ],
};

const DEPARTMENT_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.DEPARTMENT_MANAGEMENT,
  element: <DepartmentManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <DepartmentManagementTable />,
    },
    {
      path: managerChildPaths.ADD_DEPARTMENT,
      element: <AddDepartmentScreen />,
    },
  ],
};

const JOB_MANAGEMENTS_ROUTE: RouteObject = {
  path: managerPaths.JOB_MANAGEMENT,
  element: <JobManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <JobManagementTable />,
    },
    {
      path: managerChildPaths.ADD_POSITION,
      element: <AddJobScreen />,
    },
  ],
};

const BENEFITS_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.SALARY_MANAGEMENT,
  element: <SalaryManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <SalaryManagement />,
    },
    {
      path: managerChildPaths.BENEFITS_MANAGEMENT,
      element: <BenefitsManagementScreen />,
    },
  ],
};

const RECRUITMENT_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.RECRUITMENT_MANAGEMENT,
  element: <RecruitmentManagementScreen />,
};

const TRAINING_ROUTE: RouteObject = {
  path: managerPaths.ANNOUNCEMENT_MANAGEMENT,
  element: <AnnouncementManagementScreen />,
};

// const ADD_USER_ROUTE: RouteObject = {
//   path: "/manager/employee-management/add-user",
//   element: <AddUserScreen />,
// };
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
  // ADD_USER_ROUTE,
];
