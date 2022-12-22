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

  onChange?: (value: string) => void;
  value: string;
};

function TextField({
  className,
  placeholder,
  isPassword,
  onChange,
  value,
}: TextFieldProps) {
  return (
    <Input
      className={className}
      type={isPassword ? "password" : "text"}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
    />
  );
}

export default TextField;
