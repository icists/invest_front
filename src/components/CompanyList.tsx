import styled from "@emotion/styled";
import { useState } from "react";
import { useCompanies, useRoundData } from "../firebase";

import { colors } from "../styles";
import CompanyModal from "./CompanyModal";
import CompanyLogo from "./CompanyLogo";

const List = styled.ul({
  padding: 0,
  margin: 0,
  listStyleType: "none",
});

const Item = styled.li({
  display: "flex",
  alignItems: "center",
  padding: "1rem 0.5rem",

  cursor: "pointer",
  borderRadius: 5,
  "&:hover": {
    backgroundColor: colors.lightGray,
  },
});

const Container = styled.div({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gridTemplateColumns: "2fr 1fr",
  rowGap: "0.2rem",

  width: "100%",
  fontSize: "1.2rem",
});

const CompanyTitle = styled.div({
  fontWeight: 600,
});

const Valuation = styled.div({
  "&::before": {
    content: "'₩'",
  },
  justifySelf: "end",
});

const InvestAmount = styled.div({
  color: colors.darkGray,
  fontSize: "1rem",

  alignSelf: "end",
});

const Change = styled.div<{ minus: boolean }>(
  {
    color: "white",
    borderRadius: 5,

    padding: "0.1rem 0.3rem",
    fontSize: "0.9rem",

    justifySelf: "end",
    alignSelf: "end",
  },
  (props) => ({
    backgroundColor: props.minus ? colors.red : colors.key,
  })
);

type CompanyData = {
  name: string;
  logo: string;
  valuation: number;
  investAmount: number;
  change: number | null;
};

type CompanyListProps = {
  className?: string;
  round: number;
  teamID: number;
};

function CompanyList({ className, round, teamID }: CompanyListProps) {
  const [companies] = useCompanies();
  const [roundData] = useRoundData();
  const [showModal, setShowModal] = useState(false);

  function handleClickItem(companyData: CompanyData) {
    setShowModal(!showModal);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (!companies || !roundData) return null;

  const companiesData: CompanyData[] = companies.map(
    ([companyID, { name, logo }]) => {
      const valuation = roundData[round].valuation[companyID];

      let change = null;
      if (round !== 1) {
        const prevValuation = roundData[round - 1].valuation[companyID];
        change = (valuation / prevValuation - 1) * 100;
      }

      return {
        name,
        logo,
        valuation,
        investAmount: roundData[round].investAmount[teamID][companyID],
        change,
      };
    }
  );

  return (
    <>
      <List className={className}>
        {companiesData.map((data) => (
          <Item key={data.name} onClick={() => handleClickItem(data)}>
            <CompanyLogo src={data.logo} width={56} />
            <Container>
              <CompanyTitle>{data.name}</CompanyTitle>
              <Valuation>{data.valuation.toLocaleString("en")}</Valuation>
              <InvestAmount>
                {data.investAmount
                  ? `투자액 ${data.investAmount.toLocaleString("en")}원`
                  : "투자하지 않음"}
              </InvestAmount>
              {data.change !== null && (
                <Change minus={data.change < 0}>
                  {data.change >= 0 ? "+" : ""}
                  {data.change.toPrecision(3)}%
                </Change>
              )}
            </Container>
          </Item>
        ))}
      </List>

      <CompanyModal visible={showModal} onClose={handleCloseModal} />
    </>
  );
}

export default CompanyList;
