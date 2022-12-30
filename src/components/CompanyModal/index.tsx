import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useGlobalState } from "@/context";
import {
  invest,
  useCompanies,
  useCurrentRound,
  useRoundData,
} from "@/firebase";
import { Company, CompanyUID, TeamUID } from "@/schemes";

import { colors } from "@/styles";

import Button from "../Button";
import CompanyLogo from "../CompanyLogo";
import Header from "../Header";
import TextField from "../TextField";

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

const InputContainer = styled.div({
  display: "flex",
});

const InvestTextField = styled(TextField)({
  height: 50,
  minWidth: 0,
  marginRight: "0.5rem",

  flex: 1,
  padding: "0 1rem",
});

const InvestButton = styled(Button)({
  padding: "0 1rem",
  flex: "0 0 70px",
  fontSize: "1.2rem",
});

function CompanyInfo({ company }: { company: Company }) {
  return (
    <>
      <ContentTitle as="h2">기업 정보</ContentTitle>
      <ContentParagraph>{company.description}</ContentParagraph>
      <ContentTitle as="h2">소개 영상</ContentTitle>
      <Video src={company.video} key={company.video} allowFullScreen />
    </>
  );
}

function CompanyInvest({
  round,
  companyUID,
  teamUID,
  investAmount,
}: {
  round: number;
  companyUID: CompanyUID;
  teamUID: TeamUID;
  investAmount: number;
}) {
  const [localInvestAmount, setLocalInvestAmount] = useState("");

  useEffect(() => {
    setLocalInvestAmount(investAmount.toString());
  }, [investAmount]);

  async function handleClickInvest() {
    const investResult = await invest({
      round,
      teamUID,
      companyUID,
      investAmount: Number(localInvestAmount),
    });
    console.log(investResult);
  }

  return (
    <>
      <ContentTitle as="h2">투자액 (₩)</ContentTitle>
      <InputContainer>
        <InvestTextField
          value={localInvestAmount}
          onChange={(v) => setLocalInvestAmount(v)}
          isError
        />
        <InvestButton onClick={handleClickInvest}>적용</InvestButton>
      </InputContainer>
    </>
  );
}

type CompanyModalProps = {
  onClose: () => void;
  companyUID: CompanyUID | null;
  visible: boolean;
};

function CompanyModal({ onClose, companyUID, visible }: CompanyModalProps) {
  const { user } = useGlobalState();
  const round = useCurrentRound();
  const roundData = useRoundData();
  const companies = useCompanies();

  if (
    round === null ||
    user === null ||
    roundData === null ||
    companies === null
  )
    return null;

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
          {round === 0 ? (
            <CompanyInfo company={company} />
          ) : (
            <CompanyInvest
              round={round}
              companyUID={companyUID}
              teamUID={user.teamUID}
              investAmount={
                roundData[round].investAmount[user.teamUID][companyUID]
              }
            />
          )}
        </Container>
      </Modal>
    </>
  );
}

export default CompanyModal;
