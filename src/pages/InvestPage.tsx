import styled from "@emotion/styled";

import { colors } from "../styles";

import Header from "../components/Header";
import CompanyList from "../components/CompanyList";
import { useStatus } from "../context";
import roundsData from "@/rounds";

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
  marginBottom: "1rem",
  padding: "0 1rem",
  fontSize: "1.2rem",
});

const Title = styled(Header)({
  margin: "0 auto 0.75rem 0",
  fontSize: "2rem",
});

const RoundStatus = styled.div({
  color: colors.darkGray,
  marginBottom: "0.5rem",
});

const RoundNumber = styled.span({
  display: "inline-block",
});

const Indicator = styled.div<{ on: boolean }>(
  {
    display: "flex",
    alignItems: "center",
    fontSize: "1.1rem",
  },
  ({ on }) => ({
    color: on ? colors.green : colors.red,
  })
);

const Circle = styled.span<{ on: boolean }>(
  {
    display: "inline-block",
    width: 5,
    height: 5,
    borderRadius: "100%",
    marginRight: 7,
  },
  ({ on }) => ({
    backgroundColor: on ? colors.green : colors.red,
  })
);

function InvestPage() {
  const { currentRound, investable } = useStatus();
  const round = roundsData[currentRound];

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        <RoundStatus>
          <RoundNumber>{`Round ${round.name[0]} : ${round.name}`}</RoundNumber>
        </RoundStatus>
        <Indicator on={investable}>
          <Circle on={investable} />
          {investable ? "투자가 가능한 시간입니다." : "투자 시간이 아닙니다."}
        </Indicator>
      </HeaderContainer>

      <CompanyList />
    </Main>
  );
}

export default InvestPage;
