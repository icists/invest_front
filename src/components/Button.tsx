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

  padding: "1rem 0",
});

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

function Button({ className, children, onClick }: ButtonProps) {
  return (
    <ButtonElem className={className} onClick={onClick}>
      {children}
    </ButtonElem>
  );
}

export default Button;
