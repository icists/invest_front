import styled from "@emotion/styled";

import Button from "../components/Button";

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
      <Button>Google로 로그인</Button>
    </Main>
  );
}

export default LoginPage;
