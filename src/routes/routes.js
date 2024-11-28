import { createBrowserRouter } from "react-router-dom";
import { Login, Dashboard, SetPassword, EmailPasswordVerifyContainer, EmailVerify, NotFound,OtpVerifyContainer } from "../screens/";
import ProtectedRoute from "./protectedRoute"; // Import the ProtectedRoute component
import Evalation from "../screens/Evaluation/Evaluation";

export const router = createBrowserRouter([
  {
    path: "/emailverify",
    element: (
      <ProtectedRoute
        element={<EmailVerify />}
        allowAuthenticated={true}  // Prevent authenticated users from accessing this route
        redirectTo="/"  // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/otp",
    element: (
      <ProtectedRoute
        element={<OtpVerifyContainer />}
        allowAuthenticated={true}  // Prevent authenticated users from accessing this route
        redirectTo="/"  // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/set-password",
    element: (
      <ProtectedRoute
        element={<SetPassword />}
        allowAuthenticated={true}  // Prevent authenticated users from accessing this route
        redirectTo="/"  // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/loginwithpassword",
    element: (
      <ProtectedRoute
        element={<EmailPasswordVerifyContainer />}
        allowAuthenticated={true}  // Prevent authenticated users from accessing this route
        redirectTo="/"  // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute element={<Dashboard />} allowAuthenticated={false} />,  // Only allow authenticated users here
  },
  {
    path: "/Evalation",
    element: <ProtectedRoute element={<Evalation />} allowAuthenticated={false} />,  // Only allow authenticated users here
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
