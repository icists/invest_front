import styled from "@emotion/styled";

import Header from "@/components/Header";
import { useAuthData, useCompanies } from "@/context";
import InvestResult from "@/components/InvestResult";
import { colors } from "@/styles";
import AccountCalc from "@/components/AccountCalc";
import Ranking from "@/components/Ranking";

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

const Title = styled(Header)({
  marginBottom: "1rem",
  fontSize: "2rem",
});

const SmallTitle = styled(Header)({
  marginBottom: "1rem",
  fontSize: "1.5rem",
  fontWeight: 600,
});

const InfoContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "60px 1fr",
  rowGap: "0.75rem",
  padding: "1rem",

  borderRadius: 5,
  backgroundColor: colors.lightGray,

  fontSize: "1.2rem",

  "& + &": {
    marginTop: "1rem",
  },
});

const InfoTitle = styled.span({
  fontWeight: "bold",
  justifySelf: "left",
});

const InfoValue = styled.span({
  justifySelf: "left",
});

const RestTime = styled.span({ color: colors.darkGray });

export default function MyPage() {
  const { user, team } = useAuthData();
  const companies = useCompanies();

  const trackComponent = [1, 2, 3, 4, 5, 6].map((v) =>
    team.track === undefined ? null : (
      <>
        <InfoTitle>{v}타임</InfoTitle>
        <InfoValue>
          {team.track[v] === undefined ? (
            <RestTime>(쉬는시간)</RestTime>
          ) : (
            companies[team.track[v]].name
          )}
        </InfoValue>
      </>
    )
  );
  return (
    <Main>
      <Title as="h1">내 정보</Title>
      <Section>
        <InfoContainer>
          <InfoTitle>이름</InfoTitle>
          <InfoValue>{user.name}</InfoValue>
          <InfoTitle>메일</InfoTitle>
          <InfoValue>{user.mail}</InfoValue>
          <InfoTitle>팀</InfoTitle>
          <InfoValue>{user.teamUID}</InfoValue>
          {team.matchTeam !== undefined && (
            <>
              <InfoTitle>배정</InfoTitle>
              <InfoValue>{companies[team.matchTeam].name}</InfoValue>
            </>
          )}
        </InfoContainer>

        {team.matchTeam === undefined && team.track !== undefined && (
          <InfoContainer>{trackComponent}</InfoContainer>
        )}
      </Section>

      <Section>
        <SmallTitle as="h2">{user.teamUID}팀 자산</SmallTitle>
        <AccountCalc />
      </Section>

      <Section>
        <SmallTitle as="h2">총 자산 순위</SmallTitle>
        <Ranking />
      </Section>

      <Section>
        <SmallTitle as="h2">투자 결과</SmallTitle>
        <InvestResult />
      </Section>
    </Main>
  );
}
