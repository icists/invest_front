import styled from "@emotion/styled";
import { colors } from "@/styles";

import Button from "@/components/Button";
import Header from "@/components/Header";

import BingoLogo from "@/assets/events/bingo-logo.png";
import CompletionLogo from "@/assets/events/completion-logo.png";

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
  return (
    <Main>
      <Title as="h1">이벤트</Title>
      <EventButton>
        <EventLogo src={BingoLogo} />
      </EventButton>
      <EventButton>
        <EventLogo src={CompletionLogo} />
      </EventButton>
    </Main>
  );
}
