import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import {
  auth,
  findUser,
  useCompaniesDB,
  useRoundDataDB,
  useCurrentRoundDB,
  useTeam,
} from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import {
  CompaniesContextProvider,
  RoundDataContextProvider,
  AuthContextProvider,
} from "./context";

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

  const companies = useCompaniesDB();
  const currentRound = useCurrentRoundDB();
  const roundData = useRoundDataDB();
  const team = useTeam(userData === null ? null : userData.teamUID);

  useEffect(() => {
    async function updateData(user: User) {
      const userData = await findUser(user.uid);
      setUserData(userData);
    }

    if (user) {
      updateData(user);
    }
  }, [user]);

  if (loading) {
    return null;
  }

  if (user === null || user === undefined) return <Navigate to="/login" />;
  if (userData === null || team === null) return null;

  return (
    <AuthContextProvider value={{ user: userData, team }}>
      <CompaniesContextProvider value={companies}>
        <RoundDataContextProvider
          value={{ current: currentRound, data: roundData }}
        >
          <PageContainer>
            <Outlet />
            <NavBar />
          </PageContainer>
        </RoundDataContextProvider>
      </CompaniesContextProvider>
    </AuthContextProvider>
  );
}
