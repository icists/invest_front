import styled from "@emotion/styled";
import { colors } from "../styles";

const ButtonElem = styled.button({
  appearance: "none",
  cursor: "pointer",
  border: "none",
  borderRadius: 5,

  backgroundColor: colors.key,
  color: "white",
  fontFamily: "inherit",
  fontSize: "1.3rem",

  padding: "0.5rem 0",
});

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return <ButtonElem onClick={onClick}> {children} </ButtonElem>;
}

export default Button;
