import { colors } from "@/styles";
import styled from "@emotion/styled";

import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import roundsData from "@/rounds";
import { RoundNumber } from "@/schemes";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  fontSize: "1.4rem",
});

const NextPrev = styled(Button)<{ enable: boolean }>(
  {
    background: "none",
    padding: 0,
    fontSize: "1.2rem",
  },
  ({ enable }) => ({
    color: enable ? colors.black : colors.gray,
  })
);

const CurrentRound = styled.div({
  margin: "0 auto",
  fontWeight: 500,
});

type RoundSelectionProps = {
  roundNumber: RoundNumber;
  onChange: (r: RoundNumber) => void;
};

export default function RoundSelection({
  roundNumber,
  onChange,
}: RoundSelectionProps) {
  const round = roundsData[roundNumber];

  function handlePrev() {
    if (roundNumber !== 0) onChange((roundNumber - 1) as RoundNumber);
  }

  function handleNext() {
    if (roundNumber !== 3) onChange((roundNumber + 1) as RoundNumber);
  }

  return (
    <Container>
      <NextPrev enable={0 < roundNumber} onClick={handlePrev}>
        <FaChevronLeft />
      </NextPrev>
      <CurrentRound>Round {round.name[0]}</CurrentRound>
      <NextPrev enable={roundNumber < 3} onClick={handleNext}>
        <FaChevronRight />
      </NextPrev>
    </Container>
  );
}
