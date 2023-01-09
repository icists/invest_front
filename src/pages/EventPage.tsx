import { useState } from "react";

import styled from "@emotion/styled";
import { colors } from "@/styles";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

import BingoLogo from "@/assets/events/bingo-logo.png";
import CompletionLogo from "@/assets/events/completion-logo.png";
import Bingo from "@/components/events/Bingo";
import Completion from "@/components/events/Completion";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

const EventButton = styled(Button)({
  backgroundColor: colors.lightGray,
  border: `1px solid ${colors.gray}`,
  marginBottom: "1rem",
});

const EventLogo = styled.img({
  width: 200,
});

export default function EventPage() {
  const [showBingo, setShowBingo] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  return (
    <Main>
      <Header as="h1">이벤트</Header>
      <EventButton onClick={() => setShowBingo(true)}>
        <EventLogo src={BingoLogo} />
      </EventButton>
      <EventButton onClick={() => setShowCompletion(true)}>
        <EventLogo src={CompletionLogo} />
      </EventButton>

      <Modal visible={showBingo} onClose={() => setShowBingo(false)}>
        <Bingo visible={showBingo} />
      </Modal>

      <Modal visible={showCompletion} onClose={() => setShowCompletion(false)}>
        <Completion visible={showCompletion} />
      </Modal>
    </Main>
  );
}
