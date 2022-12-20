import styled from "@emotion/styled";

import { colors } from "../styles";

const Input = styled.input({
  appearance: "none",
  border: "none",
  borderRadius: 5,

  fontSize: "1.3rem",
  padding: "1.5rem 1.2rem",

  backgroundColor: colors.lightGray,
  color: colors.black,

  "&::placeholder": {
    color: colors.darkGray,
  },
});

type TextFieldProps = {
  placeholder?: string;
  isPassword?: boolean;
};

function TextField({ placeholder, isPassword }: TextFieldProps) {
  return (
    <Input type={isPassword ? "password" : "text"} placeholder={placeholder} />
  );
}

export default TextField;
