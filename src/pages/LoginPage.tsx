import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { auth, registerUser } from "../firebase";
import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";

import Button from "../components/Button";
import Header from "../components/Header";
import TextField from "../components/TextField";

import { UserData } from "../schemes";
import participants, { Participant } from "@/participant";

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

  margin: "0 0 1.5rem 0",
  width: "100%",
});

const LoginButton = styled(Button)({
  margin: "auto 0 0 0",
  height: 55,
});

function LoginPage() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [participantData, setParticipanData] = useState<Participant | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setParticipanData(participants.find((p) => p.name === name) ?? null);
  }, [name]);

  async function confirm() {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return;

    if (participantData === null) {
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
      teamUID: participantData.team.toString(),
      mail: user.email,
      uniqueNumber: participantData.uniqueNumber,
    };

    console.log(user.uid);
    const registerResult = await registerUser({
      uid: user.uid,
      data: userData,
    });

    console.log(registerResult.data);
    if (!registerResult.data) {
      await signOut();
      alert("스태프 문의 ㄲ");
    }
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
