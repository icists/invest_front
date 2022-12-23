import styled from "@emotion/styled";
import Header from "../components/Header";
import { colors } from "../styles";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  maxWidth: 350,

  margin: "0 auto",
  padding: "1.5rem 0",
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
      <Title as="h1">투자 종목</Title>
      <RoundStatus>Round 0</RoundStatus>
    </Main>
  );
}

export default InvestPage;
