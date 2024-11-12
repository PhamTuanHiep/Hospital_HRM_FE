import { RouteObject } from "react-router-dom";

import TrainScreen from "../screens/TrainScreen";
import RecruitmentPostDetail from "../screens/recruitmentScreen/recruitmentPostDetail/RecruitmentPostDetail";
import ErrorPage from "../../../error-page";
import RecruitmentScreen from "../screens/recruitmentScreen/RecruitmentScreen";
import RecruitmentPosts from "../screens/recruitmentScreen/recruitmentPosts/RecruitmentPosts";
import { recruitmentPaths, recruitmentPost } from "../constants/constant.path";

const RECRUITMENT_ROUTE: RouteObject = {
  path: recruitmentPaths.RECRUITMENT,
  element: <RecruitmentScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <RecruitmentPosts />,
    },
    {
      path: recruitmentPost.RECRUITMENT_DETAIL,
      element: <RecruitmentPostDetail />,
    },
  ],
};
const TRAIN_ROUTE: RouteObject = {
  path: recruitmentPaths.TRAIN,
  element: <TrainScreen />,
};

export const RECRUITMENT_ROUTES = [RECRUITMENT_ROUTE, TRAIN_ROUTE];
