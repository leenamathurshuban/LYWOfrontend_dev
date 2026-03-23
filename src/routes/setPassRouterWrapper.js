import { useSearchParams } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import { SetPassword } from "../screens/";

const OtpRouteWrapper = () => {
  const [searchParams] = useSearchParams();

  const isCallFrom = searchParams.get("is_call_from");
  const allowAuthenticated = isCallFrom === "forgot";
  const Authenticated = isCallFrom !== "1stLogged";
  console.log(Authenticated,"Authssssssss",allowAuthenticated)

  return (
    <ProtectedRoute
      element={<SetPassword />}
      allowAuthenticated={allowAuthenticated?allowAuthenticated:Authenticated}
      redirectTo="/"
    />
  );
};

export default OtpRouteWrapper;