import styled from "@emotion/styled";

import Button from "@/components/Button";

import BingoLogo from "@/assets/events/bingo-logo.png";
import CompletionLogo from "@/assets/events/completion-logo.png";
import { colors } from "@/styles";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 0",

  overflowY: "scroll",
});

const EventButton = styled(Button)({
  backgroundColor: colors.lightGray,
  border: `2px solid ${colors.gray}`,
  padding: "1rem 2rem"
});

const LogoImage = styled.img({
  width: 200,
});

export default function EventPage() {
  return (
    <Main>
      <EventButton>
        <LogoImage src={BingoLogo} />
      </EventButton>

      <EventButton>
        <LogoImage src={BingoLogo} />
      </EventButton>
    </Main>
  );
}
