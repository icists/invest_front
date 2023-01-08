import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles";

import Select from "react-select";

import { useCompanies, useInvestData, useStatus } from "@/context";

import CompanyLogo from "./CompanyLogo";
import { formatNum } from "@/utils";

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
  width: "100%",
});

const Container = styled.div({
  marginLeft: "0.5rem",
  width: "100%",
});

const CompanyTitle = styled.div({
  color: colors.darkGray,
  fontSize: "1rem",
  marginBottom: "0.2rem",
});

const ChangeContainer = styled.div({
  fontSize: "1.1rem",
  width: "100%",
  display: "flex",
});

const AbsoluteChange = styled.span({
  display: "inline-block",
  marginRight: "0.3rem",
});

const PercentageChange = styled.span<{ isNegative: boolean }>(
  {
    fontWeight: "bold",
  },
  ({ isNegative }) => ({ color: isNegative ? colors.red : colors.green })
);

type OptionType = { value: number; label: string };

export default function InvestResult() {
  const { currentRound } = useStatus();
  const investData = useInvestData();

  const companies = useCompanies();
  const companiesList = [...companies.entries()].sort(([, a], [, b]) =>
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
          {companiesList.map(([companyUID, company]) => {
            const investAmount =
              investData[selectedRound.value].amount.get(companyUID) ?? 0;
            const investResult =
              investData[selectedRound.value].result.get(companyUID) ?? 0;
            const change = (investResult / investAmount - 1) * 100;

            if (investAmount < 10000) return null;
            return (
              <Item key={companyUID}>
                <CompanyLogo src={company.logo} width={56} />
                <Container>
                  <CompanyTitle>{company.name}</CompanyTitle>
                  <ChangeContainer>
                    <AbsoluteChange>
                      {formatNum(investAmount)} → {formatNum(investResult)}
                    </AbsoluteChange>
                    <PercentageChange isNegative={change < 0}>
                      ({change > 0 ? "+" : ""}
                      {change.toPrecision(3)}%)
                    </PercentageChange>
                  </ChangeContainer>
                </Container>
              </Item>
            );
          })}
        </List>
      )}
    </>
  );
}
