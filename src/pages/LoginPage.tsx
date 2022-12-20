import styled from "@emotion/styled";

import TextField from "../components/TextField";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  height: "100%",
  maxWidth: 300,

  margin: "0 auto",
});

function LoginPage() {
  return (
    <Main>
      <TextField placeholder="이름" />
      <TextField placeholder="비밀번호" isPassword />
    </Main>
  );
}

export default LoginPage;
