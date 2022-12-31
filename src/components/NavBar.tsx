import styled from "@emotion/styled";

import balanceIcon from "@/assets/balance.svg";
import investmentIcon from "@/assets/investment.svg";
import rulesIcon from "@/assets/rules.svg";

const Nav = styled.nav({
  position: "absolute",
  bottom: 0,

  width: "100%",
  height: 70,

  display: "flex",
  alignItems: "center",

  boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",
});

const Menu = styled.div({
  flex: 1,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Icon = styled.img({
  width: 25,
  height: 25,
});

const MenuName = styled.div({
  fontSize: "0.9rem",
  marginTop: "0.3rem",
});

export default function NavBar() {
  const menuList = [
    { icon: balanceIcon, name: "자산" },
    { icon: investmentIcon, name: "투자" },
    { icon: rulesIcon, name: "규칙" },
  ];
  return (
    <Nav>
      {menuList.map(({ icon, name }) => (
        <Menu key={name}>
          <Icon src={icon} />
          <MenuName>{name}</MenuName>
        </Menu>
      ))}
    </Nav>
  );
}
