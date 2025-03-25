import { RouteObject } from "react-router-dom";
import { managerChildPaths, managerPaths } from "../constants/constant.path";

import AccountManagementScreen from "../screens/accountManagementScreen/AccountManagementScreen";
import ProfileManagementScreen from "../screens/profileManagementScreen/ProfileManagementScreen";
import DepartmentManagementScreen from "../screens/departmentManagementScreen/DepartmentManagementScreen";
import ContractManagementScreen from "../screens/contractManagementScreen/ContractManagementScreen";
import RecruitmentManagementScreen from "../screens/recruitmentAndTrainingScreen/recruitmentManagementScreen/RecruitmentManagementScreen";

import ErrorPage from "../../../error-page";
import UserProfilesTable from "../screens/profileManagementScreen/userProfilesTable/UserProfilesTable";
import AddUserProfileScreen from "../screens/profileManagementScreen/addUserProfileScreen/AddUserProfileScreen";
import AddDepartmentScreen from "../screens/departmentManagementScreen/addDepartmentScreen/AddDepartmentScreen";
import DepartmentManagementTable from "../screens/departmentManagementScreen/departmentManagementTable/DepartmentManagementTable";
import SalaryManagementScreen from "../screens/salaryManagementScreen/SalaryManagementScreen";
import SalaryManagement from "../screens/salaryManagementScreen/salaryManagement/SalaryManagement";
import BenefitsManagementScreen from "../screens/salaryManagementScreen/benefitsManagementScreen/BenefitsManagementScreen";
import AnnouncementManagementScreen from "../screens/announcementManagementScreen/AnnouncementManagementScreen";
import ContractHistoryTables from "../screens/contractManagementScreen/contractHistoryTables/ContractHistoryTables";
import CreateContractTable from "../screens/contractManagementScreen/contractHistoryTables/createContractTable/CreateContractTable";
import AccountManagementTable from "../screens/accountManagementScreen/accountManagementTable/AccountManagementTable";
import CreateAccountScreen from "../screens/accountManagementScreen/createAccountScreen/CreateAccountScreen";
import PositionManagementScreen from "../screens/positionManagementScreen/PositionManagementScreen";
import PositionManagementTable from "../screens/positionManagementScreen/positionManagementTable/PositionManagementTable";
import AddPositionScreen from "../screens/positionManagementScreen/addPositionScreen/AddPositionScreen";
import EmployeeWorkManagementScreen from "../screens/employeeWorkManagementScreen/EmployeeWorkManagementScreen";
import ScheduleManagementScreen from "../screens/scheduleManagementScreen/ScheduleManagementScreen";
import ScheduleManagementTables from "../screens/scheduleManagementScreen/scheduleManagementTables/ScheduleManagementTables";
import RecruitmentAndTrainingScreen from "../screens/recruitmentAndTrainingScreen/RecruitmentAndTrainingScreen";
import TrainingManagementScreen from "../screens/recruitmentAndTrainingScreen/trainingManagementScreen/TrainingManagementScreen";

const ACCOUNT_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.ACCOUNT_MANAGEMENT,
  element: <AccountManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <AccountManagementTable />,
    },
    {
      path: managerChildPaths.ADD_ACCOUNT,
      element: <CreateAccountScreen />,
    },
  ],
};

const EMPLOYEE_WORK_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.EMPLOYEE_WORK_MANAGEMENT,
  element: <EmployeeWorkManagementScreen />,
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
      element: <CreateContractTable />,
    },
  ],
};

const SCHEDULE_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.SCHEDULE_MANAGEMENT,
  element: <ScheduleManagementScreen />,
  children: [
    {
      index: true,
      element: <ScheduleManagementTables />,
    },
    // {
    //   path: managerChildPaths.APPROVE_LEAVE_REQUEST,
    //   element: <ContractHistoryTables isCancelledContractList={true} />,
    // },
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

const POSITION_MANAGEMENTS_ROUTE: RouteObject = {
  path: managerPaths.POSITION_MANAGEMENT,
  element: <PositionManagementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <PositionManagementTable />,
    },
    {
      path: managerChildPaths.ADD_POSITION,
      element: <AddPositionScreen />,
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

const RECRUITMENT_AND_TRAINING_MANAGEMENT_ROUTE: RouteObject = {
  path: managerPaths.RECRUITMENT_AND_TRAINING_MANAGEMENT,
  element: <RecruitmentAndTrainingScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <RecruitmentManagementScreen />,
    },
    {
      path: managerChildPaths.TRAINING_MANAGEMENT,
      element: <TrainingManagementScreen />,
    },
  ],
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
  EMPLOYEE_WORK_MANAGEMENT_ROUTE,
  PROFILE_MANAGEMENT_ROUTE,
  CONTRACT_MANAGEMENT_ROUTE,
  DEPARTMENT_MANAGEMENT_ROUTE,
  POSITION_MANAGEMENTS_ROUTE,
  BENEFITS_MANAGEMENT_ROUTE,
  RECRUITMENT_AND_TRAINING_MANAGEMENT_ROUTE,
  TRAINING_ROUTE,
  SCHEDULE_MANAGEMENT_ROUTE,
];
