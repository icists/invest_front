import styled from "@emotion/styled";

import Header from "@/components/Header";
import { useAccount, useAuthData, useInvestData, useStatus } from "@/context";
import { formatNum } from "@/utils";
import InvestResult from "@/components/InvestResult";
import { colors } from "@/styles";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

const Section = styled.section({
  marginBottom: "2rem",
});

const GridContainer = styled.div({
  display: "inline-flex",
  flexDirection: "column",
});

const AccountGrid = styled.div({
  display: "inline-grid",
  gridTemplateColumns: "50px 110px auto",
  rowGap: "0.5rem",

  fontSize: "1.2rem",
  justifyItems: "left",

  "&:first-child": {
    borderBottom: `1px solid ${colors.gray}`,
    paddingBottom: "0.3rem",
    marginBottom: "0.4rem",
  },
});

const Title = styled(Header)({
  marginBottom: "1rem",
  fontSize: "2rem",
});

const Minus = styled.div({
  justifySelf: "center",
});

const InfoTitle = styled.span({
  display: "inline-block",
  fontWeight: "bold",
  marginRight: "1rem",
});

const InfoValue = styled.span({
  justifySelf: "right",
});

export default function MyPage() {
  const { currentRound } = useStatus();
  const account = useAccount();
  const investData = useInvestData();

  const totalInvest = Object.values(investData[currentRound].amount).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <Main>
      <Section>
        <Title as="h1">팀 현황</Title>
        <GridContainer>
          <AccountGrid>
            <span />
            <InfoTitle>총 자산</InfoTitle>
            <InfoValue>{formatNum(account + totalInvest)}</InfoValue>
            <Minus>﹣</Minus>
            <InfoTitle>투자한 금액</InfoTitle>
            <InfoValue>{formatNum(totalInvest)}</InfoValue>
          </AccountGrid>
          <AccountGrid>
            <span />
            <InfoTitle>남은 자산</InfoTitle>
            <InfoValue>{formatNum(account)}</InfoValue>
          </AccountGrid>
        </GridContainer>
      </Section>

      <Section>
        <Title as="h1">투자 결과</Title>
        <InvestResult />
      </Section>
    </Main>
  );
}
