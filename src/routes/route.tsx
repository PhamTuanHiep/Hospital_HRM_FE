import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import { USER_ROUTES } from "../features/users/route/route";

import Login from "../features/auth/login/Login";
import { HOME_ROUTE } from "../features/homepage/route/route";
import { INTRO_ROUTES } from "../features/introduction/route/route";
import { NEWS_AND_EVENTS_ROUTES } from "../features/newsAndEvents/route/route";
import { CONTACT_ROUTES } from "../features/contact/route/route";
import { RECRUITMENT_ROUTES } from "../features/recruitment/route/route";
import { AuthPaths } from "../features/auth/constants/constant.path";

const PRIVATE_ROUTE = [...USER_ROUTES];
const PUBLICH_ROUTE = [
  HOME_ROUTE,
  ...INTRO_ROUTES,
  ...NEWS_AND_EVENTS_ROUTES,
  ...CONTACT_ROUTES,
  ...RECRUITMENT_ROUTES,
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [...PRIVATE_ROUTE, ...PUBLICH_ROUTE],
  },
  {
    path: AuthPaths.LOGIN,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
