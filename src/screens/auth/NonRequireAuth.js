import { Navigate, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "./Auth";
const NonRequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();
  if (isLoggedIn) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }
  return children;
};

export default NonRequireAuth;
