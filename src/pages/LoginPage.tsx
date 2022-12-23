import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { User } from "firebase/auth";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth, findUser } from "../firebase";

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
  const navigate = useNavigate();

  const [signInGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function checkUser(user: User) {
      const result = await findUser(user.uid);
      navigate(result ? "/" : "/register");
    }

    if (user) {
      checkUser(user);
    }
  }, [user, navigate]);

  return (
    <Main>
      <Button onClick={async () => await signInGoogle()}>
        Google로 로그인
      </Button>
    </Main>
  );
}

export default LoginPage;
