import { RouteObject } from "react-router-dom";
import { IntroPaths } from "../constants/constant.path";
import VisionScreen from "../screens/VisionScreen";
import OriganizationScreen from "../screens/OriganizationScreen";
import ManagementScreen from "../screens/ManagementScreen";
import DepartmentScreen from "../screens/DepartmentScreen";

const VISION_ROUTE: RouteObject = {
  path: IntroPaths.VISION,
  element: <VisionScreen />,
};
const ORGANIZATION_ROUTE: RouteObject = {
  path: IntroPaths.ORGANIZATION,
  element: <OriganizationScreen />,
};
const MANAGEMENT_ROUTE: RouteObject = {
  path: IntroPaths.MANAGEMENT,
  element: <ManagementScreen />,
};
const DEPARTMENT_ROUTE: RouteObject = {
  path: IntroPaths.DEPARTMENT,
  element: <DepartmentScreen />,
};

export const INTRO_ROUTES = [
  VISION_ROUTE,
  ORGANIZATION_ROUTE,
  MANAGEMENT_ROUTE,
  DEPARTMENT_ROUTE,
];
