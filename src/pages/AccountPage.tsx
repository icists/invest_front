import styled from "@emotion/styled";

import Header from "@/components/Header";
import { useRoundData, useAuthData } from "@/context";
import { formatNum } from "@/utils";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 0.5rem",

  overflowY: "scroll",
});

const Section = styled.div({
  marginBottom: "2rem",
});

const Title = styled(Header)({
  paddingLeft: "0.5rem",
  marginBottom: "1.5rem",
});

const InfoContainer = styled.div({
  paddingLeft: "0.5rem",
  marginBottom: "0.5rem",

  fontSize: "1.4rem",
});

const InfoTitle = styled.span({
  display: "inline-block",
  marginRight: "1rem",
  fontWeight: "bold",
});

const InfoValue = styled.span({});

export default function AccountPage() {
  const { user, team } = useAuthData();
  const { current: round, data: roundData } = useRoundData();

  if (team === null || round === null || roundData === null)
    return <Main></Main>;

  const invests = roundData[round].investAmount[user.teamUID];
  const totalInvest = Object.values(invests).reduce((a, b) => a + b);

  return (
    <Main>
      <Section>
        <Title as="h1">자산 현황</Title>
        <InfoContainer>
          <InfoTitle>자본금</InfoTitle>
          <InfoValue>₩{formatNum(team.account)}</InfoValue>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>투자액</InfoTitle>
          <InfoValue>₩{formatNum(totalInvest)}</InfoValue>
        </InfoContainer>
      </Section>

      <Section>
        <Title as="h1">투자 결과</Title>
      </Section>
    </Main>
  );
}
