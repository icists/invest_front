import { useState } from "react";

import styled from "@emotion/styled";
import { colors } from "@/styles";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

import BingoLogo from "@/assets/events/bingo-logo.png";
import CompletionLogo from "@/assets/events/completion-logo.png";
import Bingo from "@/components/events/Bingo";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

const Title = styled(Header)({
  marginBottom: "1.5rem",
});

const EventButton = styled(Button)({
  backgroundColor: colors.lightGray,
  border: `2px solid ${colors.gray}`,
  marginBottom: "1rem",
});

const EventLogo = styled.img({
  width: 200,
});

export default function EventPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Main>
      <Title as="h1">이벤트</Title>
      <EventButton onClick={() => setShowModal(true)}>
        <EventLogo src={BingoLogo} />
      </EventButton>
      <EventButton>
        <EventLogo src={CompletionLogo} />
      </EventButton>

      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <Bingo />
      </Modal>
    </Main>
  );
}
