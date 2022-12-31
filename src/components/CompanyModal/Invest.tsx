import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles";

import { CompanyUID, TeamUID } from "@/schemes";

import { invest, useTeam } from "@/firebase";

import { NumberField } from "../TextField";
import Button from "../Button";
import { ContentTitle } from "./Contents";
import { formatNum } from "@/utils";

const Title = styled(ContentTitle)({
  marginBottom: 0,
});

const Account = styled.small({
  margin: "0.5rem 0 1rem 0",

  display: "block",
  color: colors.darkGray,
  fontSize: "0.9rem",
});

const InputContainer = styled.div({
  display: "flex",
});

const InvestAmountField = styled(NumberField)({
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
  visible,
  currentInvest,
}: {
  round: number;
  companyUID: CompanyUID;
  teamUID: TeamUID;
  visible: boolean;
  currentInvest: number;
}) {
  const [investAmount, setInvestAmount] = useState<number | null>(0);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [isPending, setIsPending] = useState(false);

  const team = useTeam(teamUID);

  useEffect(() => {
    setIsError(false);
    setMessage("");

    setInvestAmount(currentInvest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  async function handleClickInvest() {
    if (investAmount === null) {
      setIsError(true);
      setMessage("투자액을 입력해주세요.");
      return;
    } else if (!Number.isSafeInteger(investAmount)) {
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

    setIsPending(true);
    const investResult = await invest({
      round,
      teamUID,
      companyUID,
      investAmount,
    });
    setIsPending(false);

    if (investResult.data === "success") {
      setIsError(false);
      setMessage("투자가 완료되었습니다.");
    } else if (investResult.data === "insufficient_cash") {
      setIsError(true);
      setMessage("자본금이 부족합니다.");
    } else {
      setIsError(true);
      setMessage(`오류가 발생했습니다. ${investResult.data}`);
    }

    console.log(investResult);
  }

  return (
    <>
      <Title as="h2">투자액 (₩)</Title>
      {team !== null && <Account>자본금 {formatNum(team.account)}원</Account>}
      <InputContainer>
        <InvestAmountField
          value={investAmount}
          onChange={setInvestAmount}
          isError={isError}
        />
        <InvestButton onClick={handleClickInvest} isLoading={isPending}>
          적용
        </InvestButton>
      </InputContainer>
      <Message isError={isError}>{message}</Message>
    </>
  );
}

export default Invest;
