import { RouteObject } from "react-router-dom";
import { HomePath } from "../constants/constant.path";
import HomePage from "../screens/HomePage";

export const HOME_ROUTES: RouteObject = {
  path: HomePath.HOME,
  element: <HomePage />,
};
