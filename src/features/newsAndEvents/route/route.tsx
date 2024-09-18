import { RouteObject } from "react-router-dom";
import { NewsAndEventsPaths } from "../constants/constant.path";
import NewsScreen from "../screens/NewsScreen";
import ReseachScreen from "../screens/ReseachScreen";
import NutritionScreen from "../screens/NutritionScreen";

const NEWS_ROUTE: RouteObject = {
  path: NewsAndEventsPaths.NEWS,
  element: <NewsScreen />,
};

const RESEARCH_ROUTE: RouteObject = {
  path: NewsAndEventsPaths.RESEARCH,
  element: <ReseachScreen />,
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
