import styled from "@emotion/styled";
import { useState } from "react";

import { formatNum } from "@/utils";

import { colors } from "../styles";
import CompanyModal from "./CompanyModal";
import CompanyLogo from "./CompanyLogo";
import { Company, CompanyUID } from "../schemes";
import {
  useCompanies,
  useStatus,
  useInvestData,
  useValuation,
} from "@/context";

const List = styled.ul({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const Item = styled.li({
  display: "flex",
  alignItems: "center",
  padding: "1rem 0.75rem",

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
  gridAutoFlow: "column",
  rowGap: "0.2rem",

  width: "100%",
  fontSize: "1.2rem",

  paddingLeft: "0.7rem",
});

const CompanyTitle = styled.div({
  fontWeight: 600,
});

const Valuation = styled.div({
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
};

function CompanyList({ className }: CompanyListProps) {
  const { currentRound } = useStatus();
  const investData = useInvestData();
  const valuation = useValuation();

  const companies = useCompanies();
  const companiesList = Object.entries(companies).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name)
  );

  const [selectedCompanyUID, setSelectedCompanyUID] =
    useState<CompanyUID | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleClickItem(companyUID: CompanyUID) {
    setSelectedCompanyUID(companyUID);
    setShowModal(true);
  }

  const DetailedContainer = ({
    companyID,
    company,
  }: {
    companyID: string;
    company: Company;
  }) => {
    const currentValuation =
      valuation.current === null ? null : valuation.current[companyID];
    const previousValuation =
      valuation.previous === null ? null : valuation.previous[companyID];
    const change =
      currentValuation === null || previousValuation === null
        ? null
        : (currentValuation / previousValuation - 1) * 100;
    const amount = investData[currentRound].amount[companyID];

    return (
      <Container>
        <CompanyTitle>{company.name}</CompanyTitle>
        <CompanySubtitle>
          {amount === 0 || amount === undefined
            ? "투자하지 않음"
            : `투자액 ${formatNum(amount)}`}
        </CompanySubtitle>
        {currentValuation !== null && (
          <Valuation>{formatNum(currentValuation)}</Valuation>
        )}
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
          <Item key={companyID} onClick={() => handleClickItem(companyID)}>
            <CompanyLogo src={company.logo} width={56} />
            <DetailedContainer companyID={companyID} company={company} />
          </Item>
        ))}
      </List>

      <CompanyModal
        companyUID={selectedCompanyUID}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default CompanyList;
