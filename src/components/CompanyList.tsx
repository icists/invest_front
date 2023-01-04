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
  useInvestAmount,
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
    gridAutoFlow: "column",

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
};

function CompanyList({ className }: CompanyListProps) {
  const companies = useCompanies();
  const { investable } = useStatus();
  const investData = useInvestAmount();
  const valuation = useValuation();

  const [selectedCompanyUID, setSelectedCompanyUID] =
    useState<CompanyUID | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleClickItem(companyUID: CompanyUID) {
    setSelectedCompanyUID(companyUID);
    setShowModal(true);
  }

  const companiesList = Object.entries(companies).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name)
  );

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
    const investAmount = investData[companyID];

    return (
      <Container detailed>
        <CompanyTitle>{company.name}</CompanyTitle>
        <CompanySubtitle>
          {investAmount === 0 || investAmount === undefined
            ? "투자하지 않음"
            : `투자액 ${formatNum(investAmount)}원`}
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
          <Item key={company.name} onClick={() => handleClickItem(companyID)}>
            <CompanyLogo src={company.logo} width={56} />
            {investable ? (
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
        companyUID={selectedCompanyUID}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default CompanyList;
