import { RouteObject } from "react-router-dom";
import { RecruitmentPaths } from "../constants/constant.path";
import RecruitmentScreen from "../screens/RecruitmentScreen";
import TrainScreen from "../screens/TrainScreen";

const RECRUITMENT_ROUTE: RouteObject = {
  path: RecruitmentPaths.RECRUITMENT,
  element: <RecruitmentScreen />,
};
const TRAIN_ROUTE: RouteObject = {
  path: RecruitmentPaths.TRAIN,
  element: <TrainScreen />,
};

export const RECRUITMENT_ROUTES = [RECRUITMENT_ROUTE, TRAIN_ROUTE];
