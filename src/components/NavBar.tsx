import styled from "@emotion/styled";

import { useLocation } from "react-router-dom";

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

const Menu = styled.div<{ current: boolean }>(
  {
    flex: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    cursor: "pointer",
  },
  ({ current }) => ({
    filter: current
      ? "invert(55%) sepia(75%) saturate(2193%) hue-rotate(123deg) brightness(94%) contrast(86%)"
      : "invert(90%) sepia(6%) saturate(227%) hue-rotate(169deg) brightness(96%) contrast(88%)",
  })
);

const Icon = styled.img({
  width: 25,
  height: 25,
});

const MenuName = styled.div({
  fontSize: "0.9rem",
  marginTop: "0.3rem",
});

export default function NavBar() {
  const location = useLocation();

  const menuList = [
    {
      icon: balanceIcon,
      name: "자산",
      current: location.pathname === "/account",
    },
    { icon: investmentIcon, name: "투자", current: location.pathname === "/" },
    { icon: rulesIcon, name: "규칙", current: location.pathname === "/rules" },
  ];

  return (
    <Nav>
      {menuList.map(({ icon, name, current }) => (
        <Menu key={name} current={current}>
          <Icon src={icon} />
          <MenuName>{name}</MenuName>
        </Menu>
      ))}
    </Nav>
  );
}