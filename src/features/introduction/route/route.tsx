import { RouteObject } from "react-router-dom";
import { DepartmentClinic, IntroPaths } from "../constants/constant.path";
import VisionScreen from "../screens/VisionScreen/VisionScreen";
import BoardOfDirectorsScreen from "../screens/BoardOfDirectorsScreen";
import DepartmentScreen from "../screens/Department-Clinic/DepartmentScreen";
import OrganizationScreen from "../screens/OrganizationScreen/OrganizationScreen";
import ErrorPage from "../../../error-page";
import ClinicScreen from "../screens/Department-Clinic/ClinicScreen";

const VISION_ROUTE: RouteObject = {
  path: IntroPaths.VISION,
  element: <VisionScreen />,
};
const ORGANIZATION_ROUTE: RouteObject = {
  path: IntroPaths.ORGANIZATION,
  element: <OrganizationScreen />,
};
const MANAGEMENT_ROUTE: RouteObject = {
  path: IntroPaths.BOARD_OF_DIRECTORS,
  element: <BoardOfDirectorsScreen />,
};
const DEPARTMENT_ROUTE: RouteObject = {
  path: IntroPaths.DEPARTMENT_CLINIC,
  errorElement: <ErrorPage />,
  children: [
    {
      path: DepartmentClinic.DEPARTMENT,
      element: <DepartmentScreen />,
    },
    {
      path: DepartmentClinic.CLINIC,
      element: <ClinicScreen />,
    },
  ],
};

export const INTRO_ROUTES = [
  VISION_ROUTE,
  ORGANIZATION_ROUTE,
  MANAGEMENT_ROUTE,
  DEPARTMENT_ROUTE,
];
