import styled from "@emotion/styled";

import { colors } from "../styles";

const Input = styled.input({
  appearance: "none",
  border: "none",
  borderRadius: 5,

  fontSize: "1.3rem",
  fontFamily: "inherit",
  padding: "1.2rem 1.2rem",

  backgroundColor: colors.lightGray,
  color: colors.black,

  "&::placeholder": {
    color: colors.darkGray,
  },
});

type TextFieldProps = {
  className?: string;

  placeholder?: string;
  isPassword?: boolean;
};

function TextField({ className, placeholder, isPassword }: TextFieldProps) {
  return (
    <Input
      className={className}
      type={isPassword ? "password" : "text"}
      placeholder={placeholder}
    />
  );
}

export default TextField;
