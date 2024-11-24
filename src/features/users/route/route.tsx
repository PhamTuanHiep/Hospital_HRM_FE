import { RouteObject } from "react-router-dom";
import { UserPaths } from "../constants/constant.path";
// import BenefitsScreen from "../screens/benefitsScreen/BenefitsScreen";
import NotificationScreen from "../screens/notificationScreen/NotificationScreen";
import RecordScreen from "../screens/recordScreen/RecordScreen";
import ScheduleScreen from "../screens/scheduleScreen/ScheduleScreen";
import WorkPerformanceScreen from "../screens/workPerformanceScreen/WorkPerformanceScreen";
import ContractScreen from "../screens/contractScreen/ContractScreen";
import TrainingResultsScreen from "../screens/trainingResultsScreen/TrainingResultsScreen";

// const BENEFITS_ROUTE: RouteObject = {
//   path: UserPaths.BENEFITS,
//   element: <BenefitsScreen />,
// };

const CONTRACT_ROUTE: RouteObject = {
  path: UserPaths.CONTRACT,
  element: <ContractScreen />,
};

const NOTIFICATION_ROUTE: RouteObject = {
  path: UserPaths.NOTIFICATION,
  element: <NotificationScreen />,
};

const RECORD_ROUTE: RouteObject = {
  path: UserPaths.RECORD,
  element: <RecordScreen />,
};

const SCHEDULE_ROUTE: RouteObject = {
  path: UserPaths.SCHEDULE,
  element: <ScheduleScreen />,
};

const TRAINING_RESULTS_ROUTE: RouteObject = {
  path: UserPaths.TRAINING_RESULTS,
  element: <TrainingResultsScreen />,
};

const WORK_PERFORMANCE_SCREEN_ROUTE: RouteObject = {
  path: UserPaths.WORK_PERFORMANCE_SCREEN,
  element: <WorkPerformanceScreen />,
};

export const USER_ROUTES = [
  // BENEFITS_ROUTE,
  CONTRACT_ROUTE,
  NOTIFICATION_ROUTE,
  RECORD_ROUTE,
  SCHEDULE_ROUTE,
  TRAINING_RESULTS_ROUTE,
  WORK_PERFORMANCE_SCREEN_ROUTE,
];
