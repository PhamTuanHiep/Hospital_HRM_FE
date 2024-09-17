import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import { USER_ROUTES } from "../features/users/route/route";

const PRIVATE_ROUTE = [...USER_ROUTES];
// const PUBLICH_ROUTE = [...AUTH_ROUTES];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [...PRIVATE_ROUTE],
  },
]);
