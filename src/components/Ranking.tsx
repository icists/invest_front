import styled from "@emotion/styled";

import { useAccount, useAuthData } from "@/context";
import { colors } from "@/styles";
import { formatNum } from "@/utils";

const List = styled.ol({
  padding: 0,
  margin: 0,
  listStyleType: "none",
});

const Item = styled.li<{ me?: boolean }>(
  {
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
    borderRadius: 10,
    marginTop: "0.5rem",
    "& + &": {},
  },
  ({ me }) => ({
    backgroundColor: me ? colors.lightKey : colors.lightGray,
    color: me ? colors.darkKey : colors.black,
    // color: me ? "white" : colors.black,
    fontWeight: me ? 700 : 400,
  })
);

const Place = styled.div<{ me?: boolean }>({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: 50,
  height: 40,
  margin: "0.5rem 1rem",
  fontWeight: "bold",
});

const Account = styled.div({});

export default function Ranking() {
  const { user } = useAuthData();
  const { account } = useAccount();
  const sorted = [...account.entries()].sort(([, a], [, b]) => b - a);
  const index = sorted.findIndex(([teamUID]) => teamUID === user.teamUID);

  if (index === -1) return null;

  return (
    <List>
      {index > 0 && (
        <Item>
          <Place>{index}위</Place>
          <Account>
            {sorted[index - 1][0]}팀 ({formatNum(sorted[index - 1][1])})
          </Account>
        </Item>
      )}
      <Item me>
        <Place>{index + 1}위</Place>
        <Account>
          {sorted[index][0]}팀 ({formatNum(sorted[index - 1][1])})
        </Account>
      </Item>
      {index < sorted.length - 1 && (
        <Item>
          <Place>{index + 2}위</Place>
          <Account>
            {sorted[index + 1][0]}팀 ({formatNum(sorted[index + 1][1])})
          </Account>
        </Item>
      )}
    </List>
  );
}
