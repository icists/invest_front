import styled from "@emotion/styled";

import { colors } from "../styles";

const Input = styled.input<{ isError: boolean }>(
  {
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
  },
  ({ isError }) => ({
    outline: isError ? `2px solid ${colors.red}` : "none",
  })
);

type TextFieldProps = {
  className?: string;

  placeholder?: string;
  isPassword?: boolean;

  onChange?: (value: string) => void;
  value: string;

  isError?: boolean;
};

function TextField({
  className,
  placeholder,
  isPassword,
  onChange,
  value,
  isError,
}: TextFieldProps) {
  return (
    <Input
      className={className}
      type={isPassword === true ? "password" : "text"}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
      isError={isError === true}
    />
  );
}

export default TextField;
