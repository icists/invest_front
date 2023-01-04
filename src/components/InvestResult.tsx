import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles";

import Select from "react-select";

import { useCompanies, useInvestData, useStatus } from "@/context";

import CompanyLogo from "./CompanyLogo";

const EmptyMessage = styled.div({
  fontSize: "1.25rem",
  color: colors.darkGray,
});

const List = styled.ul({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const Item = styled.li({
  display: "flex",
  alignItems: "center",

  margin: "1rem 0",
});

const Container = styled.div({
  marginLeft: "0.5rem",
});

const CompanyTitle = styled.div({
  color: colors.darkGray,
  fontSize: "1.1rem",
  marginBottom: "0.2rem",
});

const ResultText = styled.div({
  fontSize: "1.2rem",
});

type OptionType = { value: number; label: string };

export default function InvestResult() {
  const { currentRound } = useStatus();
  const investData = useInvestData();

  const companies = useCompanies();
  const companiesList = Object.entries(companies).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name)
  );

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
      {selectedRound !== null && (
        <List>
          {companiesList.map(([companyUID, company]) => (
            <Item key={companyUID}>
              <CompanyLogo src={company.logo} width={56} />
              <Container>
                <CompanyTitle>{company.name}</CompanyTitle>
                <ResultText>
                  투자액 {investData[selectedRound.value].amount[companyUID]}{" "}
                  {investData[selectedRound.value].result[companyUID]}
                </ResultText>
              </Container>
            </Item>
          ))}
        </List>
      )}
    </>
  );
}
