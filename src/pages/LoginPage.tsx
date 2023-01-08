import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { auth, registerUser } from "../firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Header from "../components/Header";
import TextField from "../components/TextField";

import { UserData } from "../schemes";
import participants from "@/assets/participants.json";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "90%",
  maxWidth: 500,

  padding: "2rem 0",
  margin: "0 auto",
});

const Title = styled(Header)({
  margin: "0 0 2rem 0",
  fontSize: "1.7rem",
});

const Label = styled(Header)({
  margin: "0 0 1rem 0",
  fontSize: "1.3rem",
  fontWeight: "normal",
});

const InputBox = styled.div({
  display: "flex",
  flexDirection: "column",

  margin: "0 0 2rem 0",
  width: "100%",
});

const LoginButton = styled(Button)({
  margin: "auto 0 0 0",
});

function LoginPage() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function confirm() {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) return;

    const result = participants.find((v) => v.name === trimmedName);
    if (result === undefined) {
      console.log("no such user");
      return;
    }

    setIsLoading(true);
    const userCredential = await signInWithGoogle();
    if (!userCredential) {
      setIsLoading(false);
      return;
    }

    const user = userCredential.user;
    const userData: UserData = {
      name: trimmedName,
      teamUID: result.team.toString(),
      mail: user.email,
      uniqueNumber: result.uniqueNumber,
    };

    await registerUser({ uid: user.uid, data: userData });
    navigate("/");
  }

  return (
    <Main>
      <Title as="h1">
        환영합니다! <br /> 참가자 정보를 입력해주세요.
      </Title>

      <InputBox>
        <Label as="h2">이름</Label>
        <TextField
          placeholder="실명을 입력해주세요."
          onChange={setName}
          value={name}
        />
      </InputBox>

      <LoginButton onClick={confirm} isLoading={isLoading}>
        {isLoading ? "처리 중..." : "Google로 로그인"}
      </LoginButton>
    </Main>
  );
}

export default LoginPage;
