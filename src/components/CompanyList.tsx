import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";

import { formatNum } from "@/utils";

import CompanyModal from "./CompanyModal";
import CompanyLogo from "./CompanyLogo";
import { CompanyUID } from "../schemes";
import { useCompanies, useStatus, useInvestData } from "@/context";
import PitchingIcon from "./PitchingIcon";

const List = styled.ul({
  listStyleType: "none",
  padding: 0,
  margin: 0,
});

const Item = styled.li<{ current: boolean }>(
  {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0.75rem",
    borderRadius: 10,

    cursor: "pointer",
  },
  ({ current }) => ({
    "&:hover": {
      backgroundColor: current ? colors.lightKey : colors.lightGray,
    },
    backgroundColor: current ? colors.lightKey : "white",
  })
);

const CompanyTitleContainer = styled.div({
  display: "flex",
  flexDirection: "column",

  width: "100%",
  fontSize: "1.2rem",

  paddingLeft: "0.7rem",
});

const CompanyTitle = styled.div({
  fontWeight: 600,
  marginBottom: "0.2rem",
});

const CompanySubtitle = styled.div({
  color: colors.darkGray,
  fontSize: "1rem",
});

type CompanyListProps = {
  className?: string;
};

function CompanyList({ className }: CompanyListProps) {
  const { currentRound, currentPitching } = useStatus();
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

  return (
    <>
      <List className={className}>
        {companiesList.map(([companyUID, company]) => {
          const amount =
            currentRound === 4
              ? null
              : investData[currentRound].amount.get(companyUID);

          let subtitleText;
          if (amount === null) {
            subtitleText = company.engName;
          } else if (amount === 0 || amount === undefined) {
            subtitleText = "투자하지 않음";
          } else {
            subtitleText = `투자액 ${formatNum(amount)}`;
          }

          const isCurrent = currentRound !== 4 && currentPitching === companyUID;

          return (
            <Item
              key={companyUID}
              onClick={() => handleClickItem(companyUID)}
              current={isCurrent}
            >
              <CompanyLogo
                src={company.logo}
                width={56}
                backgroundColor={isCurrent ? colors.lightKey : colors.lightGray}
              />
              <CompanyTitleContainer>
                <CompanyTitle>{company.name}</CompanyTitle>
                <CompanySubtitle>{subtitleText}</CompanySubtitle>
              </CompanyTitleContainer>
              {isCurrent && <PitchingIcon />}
            </Item>
          );
        })}
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
