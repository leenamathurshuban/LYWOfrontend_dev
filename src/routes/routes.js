import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Dashboard,
  SetPassword,
  EmailPasswordVerifyContainer,
  EmailVerify,
  NotFound,
  OtpVerifyContainer,
} from "../screens/";
import ProtectedRoute from "./protectedRoute"; // Import the ProtectedRoute component
import Evalation from "../screens/Evaluation/Evaluation";
import Jobs from "../screens/Jobs/Jobs";
import JobsList from "../screens/Jobs/JobList";
import JobPosts from "../screens/Jobs/JobPosts";
import JobSummary from "../screens/Jobs/JobSummary";
import HelpChoose from "../screens/HelpmeChoose/HelpChoose";
import ApplicationJobPostModal from "../screens/Jobs/ApplicationJobPostModal";
import BehaviouralAst from "../screens/BehaviourAss/BehaviouralAst";
import BehaviourAssReport from "../screens/BehaviourAss/BehaviourAssReport";
import Protected from "./protected";

import Publicroute from "../screens/PublicRoutes/Publicroute";

export const router = createBrowserRouter([
  // {
  //   path: "/publicroute",
  //   element: <Publicroute />
  // },

  {
    path: "/JobPosts/:id",
    element: <JobPosts />,
  },

  {
    path: "/emailverify",
    element: (
      <ProtectedRoute
        element={<EmailVerify />}
        allowAuthenticated={true} // Prevent authenticated users from accessing this route
        redirectTo="/" // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/otp",
    element: (
      <ProtectedRoute
        element={<OtpVerifyContainer />}
        allowAuthenticated={true} // Prevent authenticated users from accessing this route
        redirectTo="/" // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/set-password",
    element: (
      <ProtectedRoute
        element={<SetPassword />}
        allowAuthenticated={true} // Prevent authenticated users from accessing this route
        redirectTo="/" // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/loginwithpassword",
    element: (
      <ProtectedRoute
        element={<EmailPasswordVerifyContainer />}
        allowAuthenticated={true} // Prevent authenticated users from accessing this route
        redirectTo="/" // Redirect to the protected route if authenticated
      />
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute element={<Dashboard />} allowAuthenticated={false} />
    ),
  },
  {
    path: "/evaluation",
    element: (
      <ProtectedRoute element={<Evalation />} allowAuthenticated={false} />
    ),
  },
  ,
  {
    path: "/jobs",
    element: <ProtectedRoute element={<Jobs />} allowAuthenticated={false} />,
  },
  {
    path: "/jobslist",
    element: (
      <ProtectedRoute element={<JobsList />} allowAuthenticated={false} />
    ),
  },
 
  {
    // path: "/JobPosts/:id",
    path: "/JobPosts",
    element: <ProtectedRoute element={<JobPosts />} allowAuthenticated={false} />,  // Only allow authenticated users here
  },
  {
   
    path: "/ApplicationJobPostModal",
    element: (
      <ProtectedRoute
        element={<ApplicationJobPostModal />}
        allowAuthenticated={false}
      />
    ),
  },
  {
    path: "/jobSummary/:id",
    element: (
      <ProtectedRoute element={<JobSummary />} allowAuthenticated={false} />
    ),
  },
  {
    path: "/helpmechoose",
    element: (
      <ProtectedRoute element={<HelpChoose />} allowAuthenticated={false} />
    ),
  },
  {
    path: "/Behavioural-Assessment",
    element: <Protected element={<BehaviouralAst />} allowAuthenticated={false} />,  // Only allow authenticated users here
  },
  {
    path: "/Behaviour-Assessment-Report",
    element: (
      <ProtectedRoute
        element={<BehaviourAssReport />}
        allowAuthenticated={false}
      />
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
