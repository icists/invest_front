import styled from "@emotion/styled";
import { colors } from "@/styles";

import { useAuthData, useCompanies, useStatus, useInvestData } from "@/context";
import { CompanyUID } from "@/schemes";

import CompanyLogo from "../CompanyLogo";
import Header from "../Header";

import CompanyInfo from "./Info";
import CompanyInvest from "./Invest";

const Overlay = styled.div<{ visible: boolean }>(
  {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,

    backgroundColor: "black",
    transition: "opacity 0.3s",
  },
  (props) => ({
    opacity: props.visible ? 0.7 : 0,
    pointerEvents: props.visible ? "all" : "none",
  })
);

const Modal = styled.div<{ visible: boolean }>(
  {
    width: "100vw",
    maxWidth: 500,
    height: "80vh",
    overflowY: "scroll",

    position: "fixed",
    left: "50%",
    bottom: 0,

    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",

    zIndex: 1,

    transition: "transform 0.3s",
  },
  (props) => ({
    transform: `translate(-50%, ${props.visible ? "0" : "100%"})`,
  })
);

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
  const { currentRound, investable } = useStatus();
  const companies = useCompanies();
  const { amount: investAmount } = useInvestData();

  if (companyUID === null)
    return (
      <>
        <Overlay visible={visible} onClick={onClose} />
        <Modal visible={visible} />
      </>
    );

  const company = companies[companyUID];
  return (
    <>
      <Overlay visible={visible} onClick={onClose} />
      <Modal visible={visible}>
        <Container>
          <HeaderContainer>
            <CompanyLogo src={company.logo} width={60} />
            <TitleContainer>
              <CompanyTitle as="h1">{company.name}</CompanyTitle>
              <CompanySubtitle>{company.engName}</CompanySubtitle>
            </TitleContainer>
          </HeaderContainer>
          {investable ? (
            <>
              <CompanyInvest
                round={currentRound}
                companyUID={companyUID}
                teamUID={user.teamUID}
                currentInvest={investAmount[companyUID]}
                visible={visible}
              />
              <CompanyInfo company={company} />
            </>
          ) : (
            <CompanyInfo company={company} />
          )}
        </Container>
      </Modal>
    </>
  );
}

export default CompanyModal;
