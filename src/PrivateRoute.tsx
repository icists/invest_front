import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import { auth, findUser } from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import { GlobalStateContextProvider } from "./context";

import { UserData } from "./schemes";

import NavBar from "./components/NavBar";

const PageContainer = styled.div({
  maxWidth: 500,
  margin: "0 auto",

  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export default function PrivateRoute() {
  const [user, loading] = useIdToken(auth);
  const [userData, setUserData] = useState<UserData | null>(null);

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
      <GlobalStateContextProvider value={{ user: userData }}>
        <PageContainer>
          <Outlet />
          <NavBar />
        </PageContainer>
      </GlobalStateContextProvider>
    );
  } else {
    // not logged in
    return <Navigate to="/login" />;
  }
}
