import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import {
  auth,
  findUser,
  useCompaniesDB,
  useTeam,
  useInvestAmountDB,
  useValuationDB,
  useStatusDB,
  useInvestResultDB,
} from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import {
  CompaniesContext,
  AuthContext,
  InvestDataContext,
  StatusContext,
  ValuationContext,
} from "./context";

import { Status, UserData } from "./schemes";

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
  status: Status;
};

function Contexts({ userData, status }: ContextsProps) {
  const companies = useCompaniesDB();
  const team = useTeam(userData.teamUID);

  const investAmount = useInvestAmountDB(status.currentRound, userData.teamUID);
  const investResultList = useInvestResultDB(userData.teamUID);

  const currentValuation = useValuationDB(status.currentRound - 1);
  const previousValuation = useValuationDB(status.currentRound - 2);

  if (companies === null || team === null) return null;

  return (
    <AuthContext.Provider value={{ user: userData, team }}>
      <StatusContext.Provider value={status}>
        <CompaniesContext.Provider value={companies}>
          <ValuationContext.Provider
            value={{ current: currentValuation, previous: previousValuation }}
          >
            <InvestDataContext.Provider
              value={{ amount: investAmount, result: investResultList }}
            >
              <PageContainer>
                <Outlet />
                <NavBar />
              </PageContainer>
            </InvestDataContext.Provider>
          </ValuationContext.Provider>
        </CompaniesContext.Provider>
      </StatusContext.Provider>
    </AuthContext.Provider>
  );
}

export default function PrivateRoute() {
  const [user, loading] = useIdToken(auth);

  const [userData, setUserData] = useState<UserData | null>(null);
  const status = useStatusDB();

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
  if (userData === null || status === null) return null;

  return <Contexts userData={userData} status={status} />;
}
