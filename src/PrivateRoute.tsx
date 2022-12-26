import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { User } from "firebase/auth";
import { auth, findUser, useCurrentRound } from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import { GlobalStateContextProvider } from "./context";

import { UserData } from "./schemes";

function PrivateRoute() {
  const [user, loading] = useIdToken(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [round] = useCurrentRound();

  useEffect(() => {
    async function checkUser(user: User) {
      const result = await findUser(user.uid);
      setUserData(result);
    }

    if (user) {
      checkUser(user);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  if (user) {
    // logged in
    return (
      <GlobalStateContextProvider
        value={{ user: userData, currentRound: round ?? null }}
      >
        <Outlet />
      </GlobalStateContextProvider>
    );
  } else {
    // not logged in
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
