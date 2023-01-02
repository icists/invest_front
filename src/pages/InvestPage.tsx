import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";
import { useRoundData } from "../context";

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
  marginBottom: "1.5rem",
  paddingLeft: "0.5rem",
});

const Title = styled(Header)({
  margin: "0 0 0.5rem 0",
});

const RoundStatus = styled.small({
  color: colors.darkGray,
  fontSize: "1.3rem",
});

function InvestPage() {
  const { current: round } = useRoundData();

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        {round !== null && <RoundStatus>{"Round " + round}</RoundStatus>}
      </HeaderContainer>

      {round !== null && <CompanyList />}
    </Main>
  );
}

export default InvestPage;
