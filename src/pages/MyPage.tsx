import styled from "@emotion/styled";

import Header from "@/components/Header";
import { useAuthData, useCompanies } from "@/context";
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
  gridTemplateColumns: "80px 1fr",
  rowGap: "0.75rem",
  padding: "1.25rem 1rem",
  columnGap: "1rem",

  borderRadius: 10,
  backgroundColor: colors.lightGray,

  fontSize: "1.2rem",

  "& + &": {
    marginTop: "1rem",
  },
});

const InfoTitle = styled.span({
  fontWeight: "bold",
  justifySelf: "right",
});

const InfoValue = styled.span({
  justifySelf: "left",
});

const RestTime = styled.span({ color: colors.darkGray });

export default function MyPage() {
  const { user, team } = useAuthData();
  const companies = useCompanies();

  const trackComponent = [1, 2, 3, 4, 5, 6].map((v) => {
    if (team.track === undefined) return null;
    const companyUID = team.track.get(v);
    return (
      <>
        <InfoTitle>{v}타임</InfoTitle>
        <InfoValue>
          {companyUID === undefined ? (
            <RestTime>(쉬는시간)</RestTime>
          ) : (
            companies.get(companyUID)!.name
          )}
        </InfoValue>
      </>
    );
  });
  return (
    <Main>
      <Title as="h1">내 정보</Title>
      <Section>
        <InfoContainer>
          <InfoTitle>이름</InfoTitle>
          <InfoValue>{user.name}</InfoValue>
          <InfoTitle>이메일</InfoTitle>
          <InfoValue>{user.mail}</InfoValue>
          <InfoTitle>팀 번호</InfoTitle>
          <InfoValue>{user.teamUID}</InfoValue>
          <InfoTitle>고유 번호</InfoTitle>
          <InfoValue>{user.uniqueNumber}</InfoValue>
          {team.matchTeam !== undefined && (
            <>
              <InfoTitle>배정</InfoTitle>
              <InfoValue>{companies.get(team.matchTeam)!.name}</InfoValue>
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
        <SmallTitle as="h2">자산 순위 (총 24팀)</SmallTitle>
        <Ranking />
      </Section>
    </Main>
  );
}
