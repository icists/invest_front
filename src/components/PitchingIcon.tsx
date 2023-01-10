import { colors } from "@/styles";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  flex: "0 0 80px",
  color: colors.key,
  fontWeight: "bold"
});

const IconContainer = styled.div({
  position: "relative",
  width: 17,
  height: 17,
  marginRight: 7,
});

const Circle = styled.div({
  position: "absolute",
  top: 0,
  left: 0,

  width: "100%",
  height: "100%",

  borderRadius: "100%",
  border: `2.5px solid ${colors.key}`,
  backgroundColor: colors.lightKey,
});

const shadowAnimation = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
`;

const Shadow = styled.div({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: colors.key,
  borderRadius: "100%",

  animation: `${shadowAnimation} 1.5s ease infinite`,
});

export default function PitchingIcon() {
  return (
    <Container>
      <IconContainer>
        <Shadow />
        <Circle />
      </IconContainer>
      피칭 중
    </Container>
  );
}
