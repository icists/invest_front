import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";
import { useStatus } from "../context";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 0",

  overflowY: "scroll",
});

const HeaderContainer = styled.div({
  marginBottom: "1.5rem",
  padding: "0 1rem",
});

const Title = styled(Header)({
  margin: "0 0 0.5rem 0",
});

const RoundStatus = styled.small({
  color: colors.darkGray,
  fontSize: "1.3rem",
});

function InvestPage() {
  const { currentRound } = useStatus();

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        <RoundStatus>{"Round " + currentRound}</RoundStatus>
      </HeaderContainer>

      <CompanyList />
    </Main>
  );
}

export default InvestPage;
