import styled from "@emotion/styled";

import Header from "@/components/Header";
import RoundSelection from "@/components/RoundSelection";
import { useState } from "react";
import roundsData from "@/rounds";
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

const RoundTitle = styled(Header)({
  margin: "2rem 0 0.5rem 0",
  fontSize: "2rem",
  color: colors.green,
});

const RoundSubtitle = styled.small({
  display: "block",
  fontSize: "1.2rem",
  color: colors.darkGray,
});

export default function RoundsPage() {
  const [roundNumber, setRoundNumber] = useState(0);
  const round = roundsData[roundNumber];

  return (
    <Main>
      <RoundSelection
        roundNumber={roundNumber}
        onChange={(r) => setRoundNumber(r)}
      />

      <RoundTitle as="h2">{round.name}</RoundTitle>
      <RoundSubtitle>{round.description}</RoundSubtitle>
    </Main>
  );
}
