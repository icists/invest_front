import { useEffect } from "react";

import styled from "@emotion/styled";

import { useLocation, useNavigate } from "react-router-dom";

import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [signInGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const { from } = location.state || { from: { pathname: "/" } };
      navigate(from, { replace: true });
    }
  }, [user, location, navigate]);

  const onLoginClick = async () => {
    const result = await signInGoogle();
    console.log(result);
  };

  return (
    <Main>
      <Button onClick={onLoginClick}>Google로 로그인</Button>
    </Main>
  );
}

export default LoginPage;
