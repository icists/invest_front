import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import {
  auth,
  findUser,
  useCompaniesDB,
  useTeamDB,
  useStatusDB,
  useInvestDataDB,
  useAccountDB,
  useEventDB,
} from "./firebase";
import { useIdToken } from "react-firebase-hooks/auth";

import loadingVideo from "@/assets/loading.mp4";

import {
  CompaniesContext,
  AuthContext,
  InvestDataContext,
  StatusContext,
  AccountContext,
  EventContext,
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

const LoadingContainer = styled.main({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "var(--vh)",
});

const LoadingVideo = styled.video({
  width: 80,
});

type ContextsProps = {
  userData: UserData;
  status: Status;
};

function LoadingScreen() {
  return (
    <LoadingContainer>
      <LoadingVideo autoPlay muted>
        <source src={loadingVideo} type="video/mp4" />
      </LoadingVideo>
    </LoadingContainer>
  );
}

function Contexts({ userData, status }: ContextsProps) {
  const companies = useCompaniesDB();
  const team = useTeamDB(userData.teamUID);

  const investData = useInvestDataDB(userData.teamUID);
  const totalInvest = [
    ...investData[status.currentRound].amount.values(),
  ].reduce((a, b) => a + b, 0);

  const account = useAccountDB(status.currentRound);

  const bingo = useEventDB(userData.uniqueNumber, "bingo");
  const completion = useEventDB(userData.uniqueNumber, "completion");

  if (companies === null || team === null || account === null) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user: userData, team }}>
      <StatusContext.Provider value={status}>
        <CompaniesContext.Provider value={companies}>
          <AccountContext.Provider value={{ account, totalInvest }}>
            <InvestDataContext.Provider value={investData}>
              <EventContext.Provider value={{ bingo, completion }}>
                <PageContainer>
                  <Outlet />
                  <NavBar />
                </PageContainer>
              </EventContext.Provider>
            </InvestDataContext.Provider>
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

  const loadingScreen = <LoadingScreen />;

  if (loading) {
    return loadingScreen;
  }

  if (user === null || user === undefined) return <Navigate to="/login" />;
  if (userData === null || status === null) return loadingScreen;

  return <Contexts userData={userData} status={status} /> ?? loadingScreen;
}
