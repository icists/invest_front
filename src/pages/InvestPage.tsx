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

const RoundNumber = styled.div({
  display: "inline-block",
  color: colors.darkGray,
  marginBottom: "0.5rem",
});

const Indicator = styled.div<{ status: "on" | "off" | "end" }>(
  {
    display: "flex",
    alignItems: "center",
    fontSize: "1.1rem",
  },
  ({ status }) => {
    const color =
      status === "on"
        ? colors.green
        : status === "off"
        ? colors.red
        : colors.darkGray;
    return {
      color,
      span: {
        backgroundColor: color,
      },
    };
  }
);

const Circle = styled.span({
  display: "inline-block",
  width: 6,
  height: 6,
  borderRadius: "100%",
  marginRight: 8,
});

export default function InvestPage() {
  const { currentRound, investable } = useStatus();
  const round = currentRound === 4 ? null : roundsData[currentRound];

  return (
    <Main>
      <HeaderContainer>
        <Title as="h1">투자 종목</Title>
        {round === null ? (
          <Indicator status="end">
            <Circle />
            투자 게임이 종료되었습니다.
          </Indicator>
        ) : (
          <>
            <RoundNumber>
              {`Round ${round.name[0]} : ${round.name}`}
            </RoundNumber>
            <Indicator status={investable ? "on" : "off"}>
              <Circle />
              {investable
                ? "투자가 가능한 시간입니다."
                : "투자 시간이 아닙니다."}
            </Indicator>
          </>
        )}
      </HeaderContainer>

      <CompanyList />
    </Main>
  );
}
