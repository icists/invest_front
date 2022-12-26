import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";
import { useGlobalState } from "../context";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "95%",
  maxWidth: 600,

  margin: "0 auto",
  padding: "1.5rem 0",
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

function InvestPage() {
  const { currentRound, user } = useGlobalState();

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        {currentRound !== null && (
          <RoundStatus>{"Round " + currentRound}</RoundStatus>
        )}
      </HeaderContainer>

      {currentRound !== null && user !== null && (
        <CompanyList round={currentRound} teamID={user.team} />
      )}
    </Main>
  );
}

export default InvestPage;
