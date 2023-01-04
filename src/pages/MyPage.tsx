import styled from "@emotion/styled";

import Header from "@/components/Header";
import { useAuthData, useInvestData, useStatus } from "@/context";
import { formatNum } from "@/utils";
import InvestResult from "@/components/InvestResult";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

const Section = styled.div({
  marginBottom: "2rem",
});

const Title = styled(Header)({
  marginBottom: "1rem",
});

const InfoContainer = styled.div({
  marginBottom: "0.5rem",

  fontSize: "1.4rem",
});

const InfoTitle = styled.span({
  display: "inline-block",
  marginRight: "0.75rem",
  fontWeight: "bold",
});

const InfoValue = styled.span({});

export default function MyPage() {
  const { team } = useAuthData();
  const { currentRound } = useStatus();
  const investData = useInvestData();

  const totalInvest = Object.values(investData[currentRound].amount).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <Main>
      <Section>
        <Title as="h1">자산 현황</Title>
        <InfoContainer>
          <InfoTitle>자본금</InfoTitle>
          <InfoValue>{formatNum(team.account)}</InfoValue>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>투자액</InfoTitle>
          <InfoValue>{formatNum(totalInvest)}</InfoValue>
        </InfoContainer>
      </Section>

      <Section>
        <Title as="h1">투자 결과</Title>
        <InvestResult />
      </Section>
    </Main>
  );
}
