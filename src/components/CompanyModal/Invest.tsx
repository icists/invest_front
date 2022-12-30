import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles";

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

const Message = styled.small<{ isError: boolean }>(
  {
    display: "block",
    marginTop: "0.7rem",
    fontSize: "1.1rem",
  },
  ({ isError }) => ({
    color: isError ? colors.red : colors.green,
  })
);

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

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLocalInvestAmount(investAmount.toString());
  }, [investAmount]);

  async function handleClickInvest() {
    const investAmount = Number(localInvestAmount);
    if (!Number.isSafeInteger(investAmount)) {
      setIsError(true);
      setMessage("정수값을 입력해주세요.");
      return;
    } else if (investAmount < 0) {
      setIsError(true);
      setMessage("양수를 입력해주세요.");
      return;
    }

    setIsError(false);
    setMessage("");

    const investResult = await invest({
      round,
      teamUID,
      companyUID,
      investAmount,
    });

    if (investResult.data === "success") {
      setIsError(false);
      setMessage("투자가 완료되었습니다.");
    } else if (investResult.data === "insufficient_cash") {
      setIsError(true);
      setMessage("잔고가 부족합니다.");
    } else {
      setIsError(true);
      setMessage(`오류가 발생했습니다. ${investResult.data}`);
    }

    console.log(investResult);
  }

  return (
    <>
      <ContentTitle as="h2">투자액 (₩)</ContentTitle>
      <InputContainer>
        <InvestTextField
          value={localInvestAmount}
          onChange={(v) => setLocalInvestAmount(v)}
          isError={isError}
        />
        <InvestButton onClick={handleClickInvest}>적용</InvestButton>
      </InputContainer>
      <Message isError={isError}>{message}</Message>
    </>
  );
}

export default Invest;
