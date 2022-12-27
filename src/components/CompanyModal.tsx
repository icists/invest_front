import styled from "@emotion/styled";

import { Company } from "../schemes";

import CompanyLogo from "./CompanyLogo";
import Header from "./Header";

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
    position: "fixed",
    width: "100vw",
    maxWidth: 600,
    minHeight: "80vh",
    left: "50%",
    bottom: 0,

    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",

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

const CompanyTitle = styled(Header)({
  padding: "0 0 0 0.7rem",
});

const ContentTitle = styled(Header)({
  fontSize: "1.3rem",
  marginTop: "1.5rem",
});

const ContentParagraph = styled.p({});

type CompanyModal = {
  onClose: () => void;
  company: Company | null;
  visible: boolean;
};

function CompanyModal({ onClose, company, visible }: CompanyModal) {
  return (
    <>
      <Overlay visible={visible} onClick={onClose} />
      <Modal visible={visible}>
        {company !== null && (
          <Container>
            <HeaderContainer>
              <CompanyLogo src={company.logo} width={54} />
              <CompanyTitle as="h1">{company.name}</CompanyTitle>
            </HeaderContainer>
            <ContentTitle as="h2">기업 정보</ContentTitle>
            <ContentParagraph>{company.description}</ContentParagraph>
          </Container>
        )}
      </Modal>
    </>
  );
}

export default CompanyModal;
