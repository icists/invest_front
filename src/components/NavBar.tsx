import styled from "@emotion/styled";

import { useLocation, Link } from "react-router-dom";

import balanceIcon from "@/assets/balance.svg";
import investmentIcon from "@/assets/investment.svg";
import rulesIcon from "@/assets/rules.svg";

const Nav = styled.nav({
  width: "100%",
  height: 75,

  display: "flex",
  alignItems: "center",

  boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",
  backgroundColor: "white",
});

const Menu = styled(Link)<{ current: boolean }>(
  {
    flex: 1,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    cursor: "pointer",
    textDecoration: "none",
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
      name: "내 정보",
      to: "/me",
    },
    { icon: investmentIcon, name: "투자", to: "/" },
    { icon: rulesIcon, name: "규칙", to: "/rules" },
  ];

  return (
    <Nav>
      {menuList.map(({ icon, name, to }) => (
        <Menu key={name} to={to} current={location.pathname === to}>
          <Icon src={icon} />
          <MenuName>{name}</MenuName>
        </Menu>
      ))}
    </Nav>
  );
}
