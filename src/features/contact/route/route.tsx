import { RouteObject } from "react-router-dom";
import { ContactPaths } from "../constants/constant.path";
import ContactScreen from "../screens/ContactScreen";

const CONTACT_ROUTE: RouteObject = {
  path: ContactPaths.CONTACT,
  element: <ContactScreen />,
};

export const CONTACT_ROUTES = [CONTACT_ROUTE];
