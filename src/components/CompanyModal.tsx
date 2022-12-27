import styled from "@emotion/styled";

import { Company } from "../schemes";

import { colors } from "../styles";

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

const ContentTitle = styled(Header)({
  fontSize: "1.3rem",
  margin: "1.7rem 0 0.8rem 0",
});

const ContentParagraph = styled.p({});

const Video = styled.iframe({
  width: "100%",
  height: 220,
  border: "none",
});

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
              <CompanyLogo src={company.logo} width={60} />
              <TitleContainer>
                <CompanyTitle as="h1">{company.name}</CompanyTitle>
                <CompanySubtitle>{company.engName}</CompanySubtitle>
              </TitleContainer>
            </HeaderContainer>
            <ContentTitle as="h2">기업 정보</ContentTitle>
            <ContentParagraph>{company.description}</ContentParagraph>
            <ContentTitle as="h2">소개 영상</ContentTitle>
            <Video src={company.video} key={company.video} allowFullScreen />
          </Container>
        )}
      </Modal>
    </>
  );
}

export default CompanyModal;
