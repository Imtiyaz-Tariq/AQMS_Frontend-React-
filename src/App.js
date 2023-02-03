import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import { action as logoutAction } from "./pages/Logout";
import Homepage, { loader } from "./Components/Homepage.js";
import LivedataPage from "./pages/LivedataPage.js";
import ErrorPage from "./pages/Error";
import Authentication, { action as authAction } from "./pages/Authentication";
import {checkAuthLoader, tokenLoader} from './Components/utils';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage />, loader: checkAuthLoader },
      {
        path: "auth",
        element: <Authentication />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "Live",
        element: <LivedataPage />,
        loader:checkAuthLoader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
