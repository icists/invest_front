import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { auth, registerUser } from "../firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Header from "../components/Header";
import TextField from "../components/TextField";
import { UserData } from "../schemes";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "90%",
  maxWidth: 600,

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
  const [teamNumber, setTeamNumber] = useState("0");

  async function confirm() {
    const trimmedName = name.trim();
    const parsedTeamNumber = parseInt(teamNumber);
    if (trimmedName.length < 2 || isNaN(parsedTeamNumber)) return;

    const userCredential = await signInWithGoogle();
    if (!userCredential) return;

    const user = userCredential.user;

    const userData: UserData = {
      name: trimmedName,
      team: parsedTeamNumber,
      mail: user.email,
    };

    await registerUser(user.uid, userData);
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

      <InputBox>
        <Label as="h2">소속 팀</Label>
        <TextField
          placeholder="팀 번호를 입력해주세요."
          onChange={setTeamNumber}
          value={teamNumber}
        />
      </InputBox>

      <LoginButton onClick={confirm}>Google로 로그인</LoginButton>
    </Main>
  );
}

export default LoginPage;
