import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { CompanyUID, TeamUID } from "@/schemes";

import { invest } from "@/firebase";

import TextField from "../TextField";
import Button from "../Button";
import { ContentTitle } from "./Contents";

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

function Invest({
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

export default Invest;
