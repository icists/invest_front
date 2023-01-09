import { useState } from "react";
import { colors } from "@/styles";
import styled from "@emotion/styled";

import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useStatus } from "@/context";
import roundsData, { Round } from "@/rounds";

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
  roundNumber: number;
  onChange: (round: number) => void;
};

export default function RoundSelection({
  roundNumber,
  onChange,
}: RoundSelectionProps) {
  function handlePrev() {
    if (roundNumber !== 0) onChange(roundNumber - 1);
  }

  function handleNext() {
    if (roundNumber !== 3) onChange(roundNumber + 1);
  }

  return (
    <Container>
      <NextPrev enable={0 < roundNumber} onClick={handlePrev}>
        <FaChevronLeft />
      </NextPrev>
      <CurrentRound>Round {roundsData[roundNumber].name[0]}</CurrentRound>
      <NextPrev enable={roundNumber < 3} onClick={handleNext}>
        <FaChevronRight />
      </NextPrev>
    </Container>
  );
}
