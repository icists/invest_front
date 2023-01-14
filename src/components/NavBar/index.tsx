import { useLocation, Link } from "react-router-dom";

import styled from "@emotion/styled";
import { colors } from "@/styles";

import { balanceIcon, investmentIcon, eventIcon } from "./icons";

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
    color: "black",
  },

  ({ current }) => ({
    color: current ? colors.green : colors.gray,
    fill: current ? colors.green : colors.gray,
  })
);

const Icon = styled.div({
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
    { icon: eventIcon, name: "이벤트", to: "/" },
    { icon: investmentIcon, name: "투자", to: "/invest" },
  ];

  return (
    <Nav>
      {menuList.map(({ icon, name, to }) => (
        <Menu key={name} to={to} current={location.pathname === to}>
          <Icon>{icon}</Icon>
          <MenuName>{name}</MenuName>
        </Menu>
      ))}
    </Nav>
  );
}
