import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  maxWidth: 340,

  margin: "0 auto",
  padding: "1.5rem 0",
});

const HeaderContainer = styled.div({
  margin: "0 0 2rem 0",
});

const Title = styled(Header)({
  margin: "0 0 0.5rem 0",
});

const RoundStatus = styled.small({
  color: colors.darkGray,
  fontSize: "1.2rem",
});

function InvestPage() {
  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        <RoundStatus>Round 0</RoundStatus>
      </HeaderContainer>

      <CompanyList />
    </Main>
  );
}

export default InvestPage;
