import { useState } from "react";
import styled from "@emotion/styled";

import Select from "react-select";

import { useCompanies } from "@/context";
import Header from "./Header";

const Title = styled(Header)({
  fontWeight: "normal",
});

const List = styled.ul({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const Item = styled.li({});

type OptionType = { value: number | null; label: string };

export default function InvestResult() {
  const options = [0, 1, 2, 3].map((v) => ({ value: v, label: `Round ${v}` }));
  const [selectedRound, setSelectedRound] = useState<OptionType | null>(
    options[0]
  );
  return (
    <>
      <Select
        value={selectedRound}
        onChange={(v) => setSelectedRound(v)}
        options={options}
        getOptionLabel={(v) => `Round ${v.value}`}
      />
    </>
  );
}
