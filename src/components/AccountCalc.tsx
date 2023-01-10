import styled from "@emotion/styled";

import { useAccount, useAuthData } from "@/context";
import { formatNum } from "@/utils";
import { colors } from "@/styles";

const GridContainer = styled.div({
  display: "inline-flex",
  flexDirection: "column",
});

const AccountGrid = styled.div({
  display: "inline-grid",
  gridTemplateColumns: "50px 120px auto",
  rowGap: "0.5rem",

  fontSize: "1.2rem",
  justifyItems: "left",

  "&:first-of-type": {
    borderBottom: `1px solid ${colors.gray}`,
    paddingBottom: "0.3rem",
    marginBottom: "0.4rem",
  },
});

const Minus = styled.div({
  justifySelf: "center",
});

const AccountTitle = styled.span({
  display: "inline-block",
  fontWeight: 600,
  marginRight: "1rem",
});

const AccountValue = styled.span({
  justifySelf: "right",
});


type AccountCalc = {
  totalInvest: number;
}

export default function AccountCalc({ totalInvest }: AccountCalc) {
  const { user } = useAuthData();
  const { account } = useAccount();

  return (
    <GridContainer>
      <AccountGrid>
        <span />
        <AccountTitle>총 자산</AccountTitle>
        <AccountValue>{formatNum(account.get(user.teamUID)!)}</AccountValue>
        <Minus>﹣</Minus>
        <AccountTitle>투자한 금액</AccountTitle>
        <AccountValue>{formatNum(totalInvest)}</AccountValue>
      </AccountGrid>
      <AccountGrid>
        <span />
        <AccountTitle>남은 자산</AccountTitle>
        <AccountValue>
          {formatNum(account.get(user.teamUID)! - totalInvest)}
        </AccountValue>
      </AccountGrid>
    </GridContainer>
  );
}
