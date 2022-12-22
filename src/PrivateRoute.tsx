import { Navigate, Outlet, useLocation } from "react-router-dom";

import { auth } from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

function PrivateRoute() {
  const [user, loading] = useIdToken(auth);

  if (loading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
