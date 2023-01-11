import styled from "@emotion/styled";
import { colors } from "@/styles";

import {
  useAuthData,
  useCompanies,
  useStatus,
  useInvestData,
  useAccount,
} from "@/context";
import { CompanyUID } from "@/schemes";

import CompanyLogo from "../CompanyLogo";
import Header from "../Header";
import CompanyInfo from "./Info";
import CompanyInvest from "./Invest";
import Modal from "../Modal";

const Container = styled.div({
  width: "90%",
  margin: "0 auto",
  padding: "1.5rem 0",
});

const HeaderContainer = styled.div({
  display: "flex",
  alignItems: "center",
  fontSize: "0.8rem",
});

const TitleContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "0.7rem",
});

const CompanyTitle = styled(Header)({
  fontSize: "1.5rem",
  marginBottom: "0.1rem",
});

const CompanySubtitle = styled.small({
  fontSize: "1rem",
  color: colors.darkGray,
});

type CompanyModalProps = {
  onClose: () => void;
  companyUID: CompanyUID | null;
  visible: boolean;
};

function CompanyModal({ onClose, companyUID, visible }: CompanyModalProps) {
  const { user } = useAuthData();
  const { account, totalInvest } = useAccount();
  const { currentRound, investable } = useStatus();
  const companies = useCompanies();
  const investData = useInvestData();

  return (
    <Modal visible={visible} onClose={onClose}>
      {companyUID !== null && (
        <Container>
          <HeaderContainer>
            <CompanyLogo src={companies.get(companyUID)!.logo} width={60} />
            <TitleContainer>
              <CompanyTitle as="h1">
                {companies.get(companyUID)!.name}
              </CompanyTitle>
              <CompanySubtitle>
                {companies.get(companyUID)!.engName}
              </CompanySubtitle>
            </TitleContainer>
          </HeaderContainer>
          {investable && totalInvest !== null && currentRound !== 4 && (
            <CompanyInvest
              round={currentRound}
              companyUID={companyUID}
              teamUID={user.teamUID}
              currentInvest={
                investData[currentRound].amount.get(companyUID) ?? 0
              }
              visible={visible}
              leftOver={account.get(user.teamUID)! - totalInvest}
            />
          )}
          <CompanyInfo companyUID={companyUID} />
        </Container>
      )}
    </Modal>
  );
}

export default CompanyModal;
