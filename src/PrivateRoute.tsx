import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import {
  auth,
  findUser,
  useCompaniesDB,
  useTeamDB,
  useValuationDB,
  useStatusDB,
  useInvestDataDB,
  useAccountDB,
} from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import {
  CompaniesContext,
  AuthContext,
  InvestDataContext,
  StatusContext,
  ValuationContext,
  AccountContext,
} from "./context";

import { Status, UserData } from "./schemes";

import NavBar from "./components/NavBar";

const PageContainer = styled.div({
  maxWidth: 500,
  margin: "0 auto",

  display: "flex",
  flexDirection: "column",
  height: "var(--vh)",
});

type ContextsProps = {
  userData: UserData;
  status: Status;
};

function Contexts({ userData, status }: ContextsProps) {
  const companies = useCompaniesDB();
  const team = useTeamDB(userData.teamUID);
  const account = useAccountDB(status.currentRound, userData.teamUID);

  const investData = useInvestDataDB(userData.teamUID);

  const currentValuation = useValuationDB(status.currentRound - 1);
  const previousValuation = useValuationDB(status.currentRound - 2);

  if (companies === null || team === null || account === null) return null;

  return (
    <AuthContext.Provider value={{ user: userData, team }}>
      <StatusContext.Provider value={status}>
        <CompaniesContext.Provider value={companies}>
          <AccountContext.Provider value={account}>
            <ValuationContext.Provider
              value={{ current: currentValuation, previous: previousValuation }}
            >
              <InvestDataContext.Provider value={investData}>
                <PageContainer>
                  <Outlet />
                  <NavBar />
                </PageContainer>
              </InvestDataContext.Provider>
            </ValuationContext.Provider>
          </AccountContext.Provider>
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

  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight}px`
    );
  };

  useEffect(() => {
    setVh();
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  if (loading) {
    return null;
  }

  if (user === null || user === undefined) return <Navigate to="/login" />;
  if (userData === null || status === null) return null;

  return <Contexts userData={userData} status={status} />;
}
