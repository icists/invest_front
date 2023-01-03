import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import {
  auth,
  findUser,
  useCompaniesDB,
  useCurrentRoundDB,
  useTeam,
  useInvestAmountDB,
  useValuationDB,
} from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import {
  CompaniesContext,
  AuthContext,
  InvestAmountContext,
  CurrentRoundContext,
  ValuationContext,
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

type ContextsProps = {
  userData: UserData;
  currentRound: number;
};

function Contexts({ userData, currentRound }: ContextsProps) {
  const companies = useCompaniesDB();
  const team = useTeam(userData.teamUID);

  const investAmount = useInvestAmountDB(currentRound, userData.teamUID);

  const currentValuation = useValuationDB(currentRound - 1);
  const previousValuation = useValuationDB(currentRound - 2);

  if (companies === null || team === null) return null;

  return (
    <AuthContext.Provider value={{ user: userData, team }}>
      <CurrentRoundContext.Provider value={currentRound}>
        <CompaniesContext.Provider value={companies}>
          <ValuationContext.Provider
            value={{ current: currentValuation, previous: previousValuation }}
          >
            <InvestAmountContext.Provider value={investAmount}>
              <PageContainer>
                <Outlet />
                <NavBar />
              </PageContainer>
            </InvestAmountContext.Provider>
          </ValuationContext.Provider>
        </CompaniesContext.Provider>
      </CurrentRoundContext.Provider>
    </AuthContext.Provider>
  );
}

export default function PrivateRoute() {
  const [user, loading] = useIdToken(auth);

  const [userData, setUserData] = useState<UserData | null>(null);
  const currentRound = useCurrentRoundDB();

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
  if (userData === null || currentRound === null) return null;

  return <Contexts userData={userData} currentRound={currentRound} />;
}
