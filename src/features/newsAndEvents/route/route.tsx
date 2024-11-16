import { RouteObject } from "react-router-dom";
import { NewsAndEventsPaths, newsPath } from "../constants/constant.path";

import NutritionScreen from "../screens/NutritionScreen";
import ErrorPage from "../../../error-page";
import AnnouncementScreen from "../screens/announcementScreen/AnnouncementScreen";
import AnnouncementPostDetail from "../screens/announcementScreen/announcementPostDetail/AnnouncementPostDetail";
import AnnouncementPosts from "../screens/announcementScreen/announcementPosts/AnnouncementPosts";
import ResearchScreen from "../screens/ResearchScreen";

const NEWS_ROUTE: RouteObject = {
  path: NewsAndEventsPaths.NEWS,
  element: <AnnouncementScreen />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <AnnouncementPosts />,
    },
    {
      path: newsPath.ANNOUNCEMENT_DETAIL,
      element: <AnnouncementPostDetail />,
    },
  ],
};

const RESEARCH_ROUTE: RouteObject = {
  path: NewsAndEventsPaths.RESEARCH,
  element: <ResearchScreen />,
};
const NUTRITION_ROUTE: RouteObject = {
  path: NewsAndEventsPaths.NUTRITION,
  element: <NutritionScreen />,
};

export const NEWS_AND_EVENTS_ROUTES = [
  NEWS_ROUTE,
  RESEARCH_ROUTE,
  NUTRITION_ROUTE,
];
