import { useState } from "react";

import styled from "@emotion/styled";
import { colors } from "@/styles";

import Header from "@/components/Header";
import RoundSelection from "@/components/RoundSelection";
import roundsData from "@/rounds";
import InvestResult from "@/components/InvestResult";
import { useStatus } from "@/context";
import { ValidRoundNumber } from "@/schemes";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

const RoundTitle = styled(Header)({
  margin: "2rem 0 0.5rem 0",
  fontSize: "2rem",
  fontWeight: 300,
  color: colors.green,
});

const RoundSubtitle = styled.small({
  display: "block",
  fontSize: "1rem",
  color: colors.darkGray,
});

const RoundParagraph = styled.p({
  fontSize: "1rem",
  margin: "1rem 0 0 0",
  "& + &": {
    margin: "0.5rem 0 0 0",
  },
});

const SmallTitle = styled(Header)({
  fontSize: "1.5rem",
  fontWeight: 600,
  margin: "1.5rem 0 0.5rem 0",
});

export default function RoundsPage() {
  const { currentRound } = useStatus();
  const [roundNumber, setRoundNumber] = useState<ValidRoundNumber>(
    currentRound === 4 ? 0 : currentRound
  );
  const round = roundsData[roundNumber];

  return (
    <Main>
      <RoundSelection
        roundNumber={roundNumber}
        onChange={(r) => setRoundNumber(r)}
      />

      <RoundTitle as="h1">
        <strong>{round.name[0]}</strong>
        {round.name.slice(1)}
      </RoundTitle>
      <RoundSubtitle>{round.subtitle}</RoundSubtitle>
      {round.description.split("\n").map((p, i) => (
        <RoundParagraph key={i}>{p}</RoundParagraph>
      ))}
      <SmallTitle as="h2">투자 결과</SmallTitle>
      <InvestResult roundNumber={roundNumber} />
    </Main>
  );
}
