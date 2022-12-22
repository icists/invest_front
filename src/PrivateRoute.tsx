import { Navigate, Outlet, useLocation } from "react-router-dom";

import { auth } from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

function PrivateRoute() {
  const location = useLocation();
  const [user, loading] = useIdToken(auth);

  if (loading) {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
