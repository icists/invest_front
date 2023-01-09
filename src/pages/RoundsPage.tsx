import styled from "@emotion/styled";

import Header from "@/components/Header";
import RoundSelection from "@/components/RoundSelection";
import { useState } from "react";
import roundsData from "@/rounds";
import { colors } from "@/styles";
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

const RoundDescription = styled.p({
  fontSize: "1.2rem",
});

const SmallTitle = styled(Header)({
  margin: "0.5rem 0 0.75rem 0",
  fontSize: "1.5rem",
  fontWeight: 600,
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

      <RoundTitle as="h1">
        <strong>{round.name[0]}</strong>
        {round.name.slice(1)}
      </RoundTitle>
      <RoundSubtitle>{round.description}</RoundSubtitle>
      <RoundDescription>
        asdfioajweiofjawioefjawiojefioawejf awiejfaowi faw ef awef awe fawef
      </RoundDescription>

      <SmallTitle as="h2">투자 결과</SmallTitle>
      <InvestResult roundNumber={roundNumber} />
    </Main>
  );
}
