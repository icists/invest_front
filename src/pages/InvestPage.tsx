import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";
import { useGlobalState } from "../context";
import { useCurrentRound } from "../firebase";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 0.5rem",

  overflowY: "scroll",
});

const HeaderContainer = styled.div({
  margin: "0 0 1.5rem 0",
  padding: "0 0 0 0.5rem",
});

const Title = styled(Header)({
  margin: "0 0 0.5rem 0",
});

const RoundStatus = styled.small({
  color: colors.darkGray,
  fontSize: "1.2rem",
});

export default function InvestPage() {
  const { user } = useGlobalState();
  const round = useCurrentRound();

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        {round !== null && <RoundStatus>{"Round " + round}</RoundStatus>}
      </HeaderContainer>

      {round !== null && user !== null && <CompanyList teamID={user.teamUID} />}
    </Main>
  );
}
