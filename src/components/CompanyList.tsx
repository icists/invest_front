import styled from "@emotion/styled";
import { useState } from "react";

import { formatNum } from "@/utils";

import { colors } from "../styles";
import CompanyModal from "./CompanyModal";
import CompanyLogo from "./CompanyLogo";
import { Company, CompanyUID } from "../schemes";
import { useCompanies, useStatus, useInvestData } from "@/context";

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
  "&:hover": {
    backgroundColor: colors.lightGray,
  },
});

const Container = styled.div({
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gridAutoFlow: "column",
  rowGap: "0.2rem",

  width: "100%",
  fontSize: "1.2rem",

  paddingLeft: "0.7rem",
});

const CompanyTitle = styled.div({
  fontWeight: 600,
});

const CompanySubtitle = styled.div({
  color: colors.darkGray,
  fontSize: "1rem",

  alignSelf: "end",
});

type CompanyListProps = {
  className?: string;
};

function CompanyList({ className }: CompanyListProps) {
  const { currentRound } = useStatus();
  const investData = useInvestData();

  const companies = useCompanies();
  const companiesList = [...companies.entries()].sort(([, a], [, b]) =>
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
    companyUID,
    company,
  }: {
    companyUID: CompanyUID;
    company: Company;
  }) => {
    const amount = investData[currentRound].amount.get(companyUID);

    return (
      <Container>
        <CompanyTitle>{company.name}</CompanyTitle>
        <CompanySubtitle>
          {amount === 0 || amount === undefined
            ? "투자하지 않음"
            : `투자액 ${formatNum(amount)}`}
        </CompanySubtitle>
      </Container>
    );
  };

  return (
    <>
      <List className={className}>
        {companiesList.map(([companyUID, company]) => (
          <Item key={companyUID} onClick={() => handleClickItem(companyUID)}>
            <CompanyLogo src={company.logo} width={56} />
            <DetailedContainer companyUID={companyUID} company={company} />
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
