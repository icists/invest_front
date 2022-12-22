import { useState } from "react";

import styled from "@emotion/styled";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, set } from "../firebase";

import Button from "../components/Button";
import Header from "../components/Header";
import TextField from "../components/TextField";
import { UserData } from "../schemes";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  maxWidth: 340,
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

const ConfirmButton = styled(Button)({
  margin: "auto 0 0 0",
});

function RegisterPage() {
  const [user] = useAuthState(auth);

  const [name, setName] = useState("");
  const [teamNumber, setTeamNumber] = useState("0");

  function confirm() {
    const trimmedName = name.trim();
    const parsedTeamNumber = parseInt(teamNumber);
    if (!user || trimmedName.length < 2 || isNaN(parsedTeamNumber)) return;

    const userData: UserData = {
      name: trimmedName,
      team: parsedTeamNumber,
      mail: user.email,
    };
    set("/users/" + user.uid, userData);
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

      <ConfirmButton onClick={confirm}>확인</ConfirmButton>
    </Main>
  );
}

export default RegisterPage;
