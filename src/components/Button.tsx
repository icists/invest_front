import styled from "@emotion/styled";
import { colors } from "../styles";

import PulseLoader from "react-spinners/PulseLoader";

const ButtonElem = styled.button<{ isLoading: boolean }>(
  {
    appearance: "none",
    cursor: "pointer",
    border: "none",
    borderRadius: 5,

    color: "white",
    fontFamily: "inherit",
    fontSize: "1.3rem",

    padding: "1rem 0",

    transition: "background-color 0.3s",
  },
  ({ isLoading }) => ({
    backgroundColor: isLoading ? colors.gray : colors.key,
  })
);

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
};

function Button({ className, children, onClick, isLoading }: ButtonProps) {
  return (
    <ButtonElem
      className={className}
      onClick={isLoading === true ? undefined : onClick}
      isLoading={isLoading === true}
    >
      {isLoading === true ? <PulseLoader size={7} color="white" /> : children}
    </ButtonElem>
  );
}

export default Button;
