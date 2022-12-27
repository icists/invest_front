import styled from "@emotion/styled";
import { useState } from "react";
import { useCompanies, useCurrentRound, useRoundData } from "../firebase";

import { colors } from "../styles";
import CompanyModal from "./CompanyModal";
import CompanyLogo from "./CompanyLogo";
import { Company, CompanyUID } from "../schemes";

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

const Container = styled.div<{ detailed: boolean }>(
  {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "2fr 1fr",

    width: "100%",
    fontSize: "1.2rem",

    paddingLeft: "0.7rem",
  },
  ({ detailed }) => ({
    gridTemplateColumns: detailed ? "2fr 1fr" : "1fr",
    rowGap: detailed ? "0.2rem" : 0,
  })
);

const CompanyTitle = styled.div({
  fontWeight: 600,
});

const Valuation = styled.div({
  "&::before": {
    content: "'₩'",
  },
  justifySelf: "end",
});

const CompanySubtitle = styled.div({
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

type CompanyListProps = {
  className?: string;
  teamID: number;
};

function CompanyList({ className, teamID }: CompanyListProps) {
  const companies = useCompanies();
  const round = useCurrentRound();
  const roundData = useRoundData();

  const [selectedCompanyUID, setSelectedCompanyUID] =
    useState<CompanyUID | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleClickItem(companyUID: CompanyUID) {
    setSelectedCompanyUID(companyUID);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  if (companies === null || round === null || roundData === null) return null;

  const companiesList = Object.entries(companies).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name)
  );
  const showDetail = round > 0;

  const DetailedContainer = ({
    companyID,
    company,
  }: {
    companyID: string;
    company: Company;
  }) => {
    const valuation = roundData[round].valuation[companyID];
    const change =
      round === 1
        ? null
        : (valuation / roundData[round - 1].valuation[companyID] - 1) * 100;
    const investAmount = roundData[round].investAmount[teamID][companyID];

    return (
      <Container detailed>
        <CompanyTitle>{company.name}</CompanyTitle>
        <Valuation>{valuation.toLocaleString("en")}</Valuation>
        <CompanySubtitle>
          {investAmount
            ? `투자액 ${investAmount.toLocaleString("en")}원`
            : "투자하지 않음"}
        </CompanySubtitle>
        {change !== null && (
          <Change minus={change < 0}>
            {change >= 0 ? "+" : ""}
            {change.toPrecision(3)}%
          </Change>
        )}
      </Container>
    );
  };

  return (
    <>
      <List className={className}>
        {companiesList.map(([companyID, company]) => (
          <Item key={company.name} onClick={() => handleClickItem(companyID)}>
            <CompanyLogo src={company.logo} width={56} />
            {showDetail ? (
              <DetailedContainer companyID={companyID} company={company} />
            ) : (
              <Container detailed={false}>
                <CompanyTitle>{company.name}</CompanyTitle>
                <CompanySubtitle>{company.engName}</CompanySubtitle>
              </Container>
            )}
          </Item>
        ))}
      </List>

      <CompanyModal
        company={
          selectedCompanyUID === null ? null : companies[selectedCompanyUID]
        }
        visible={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default CompanyList;
