import { useState } from "react";
import styled from "@emotion/styled";

import Select from "react-select";

import { useCompanies, useStatus } from "@/context";

import Header from "./Header";
import { colors } from "@/styles";

const EmptyMessage = styled.div({
  fontSize: "1.25rem",
  color: colors.darkGray,
});

const List = styled.ul({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const Item = styled.li({});

type OptionType = { value: number | null; label: string };

export default function InvestResult() {
  const { currentRound } = useStatus();

  const options =
    currentRound > 0
      ? [...Array(currentRound).keys()].map((v) => ({
          value: v,
          label: `Round ${v}`,
        }))
      : [];

  const [selectedRound, setSelectedRound] = useState<OptionType | null>(
    options[currentRound - 1]
  );

  if (currentRound === 0)
    return <EmptyMessage>(아직 투자 결과가 나오지 않았습니다.)</EmptyMessage>;

  return (
    <>
      <Select
        value={selectedRound}
        onChange={(v) => setSelectedRound(v)}
        options={options}
        getOptionLabel={(v) => `Round ${v.value}`}
      />
      <List></List>
    </>
  );
}
