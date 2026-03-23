import ProtectedRoute from "./protectedRoute";
import {OtpVerifyContainer} from "../screens"

const OtpRouteWrapper = () => {
  const allowAuthenticated = true;
  return (
    <>
    <ProtectedRoute
      element={<OtpVerifyContainer />}
      allowAuthenticated={allowAuthenticated}
      redirectTo="/"
    />
    </>
  );
};

export default OtpRouteWrapper;