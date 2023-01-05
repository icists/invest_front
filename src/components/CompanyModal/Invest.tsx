import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles";

import { CompanyUID, TeamUID } from "@/schemes";

import { invest } from "@/firebase";

import { NumberField } from "../TextField";
import Button from "../Button";
import { ContentTitle } from "./Contents";
import { formatNum } from "@/utils";
import { useAuthData } from "@/context";

const Title = styled(ContentTitle)({
  marginBottom: 0,
});

const Account = styled.small({
  margin: "0.5rem 0 1rem 0",

  display: "block",
  color: colors.darkGray,
  fontSize: "1rem",
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
  const { team } = useAuthData();

  const [investAmount, setInvestAmount] = useState<number | null>(0);

  const [[message, isErrorMessage], setMessage] = useState(["", false]);

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setMessage(["", false]);

    setInvestAmount(Math.floor(currentInvest / 10000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  async function handleClickInvest() {
    if (investAmount === null) {
      setMessage(["투자액을 입력해주세요.", true]);
      return;
    } else if (!Number.isSafeInteger(investAmount)) {
      setMessage(["정수값을 입력해주세요.", true]);
      return;
    } else if (investAmount < 0) {
      setMessage(["양수를 입력해주세요.", true]);
      return;
    }

    setMessage(["", false]);

    setIsPending(true);
    const investResult = await invest({
      round,
      teamUID,
      companyUID,
      investAmount: investAmount * 10000,
    });
    setIsPending(false);

    if (investResult.data === "success") {
      setMessage(["투자가 완료되었습니다.", false]);
    } else if (investResult.data === "insufficient_cash") {
      setMessage(["자본금이 부족합니다.", true]);
    } else if (investResult.data === "not_investable") {
      setMessage(["현재는 투자 시간이 아닙니다.", true]);
    } else {
      setMessage([`오류가 발생했습니다. (${investResult.data}) 스태프에게 문의해주세요.`, true]);
    }

    console.log(investResult);
  }

  return (
    <>
      <Title as="h2">투자액</Title>
      <Account>자본금 {formatNum(team.account)}</Account>
      <InputContainer>
        <InvestAmountField
          value={investAmount}
          onChange={setInvestAmount}
          isError={isErrorMessage}
        />
        <InvestButton onClick={handleClickInvest} isLoading={isPending}>
          적용
        </InvestButton>
      </InputContainer>
      <Message isError={isErrorMessage}>{message}</Message>
    </>
  );
}

export default Invest;
