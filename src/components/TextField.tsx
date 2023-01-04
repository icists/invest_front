import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { colors } from "../styles";

import { NumericFormat } from "react-number-format";

const getInputStyle = ({ isError }: { isError: boolean }) =>
  css({
    appearance: "none",
    border: "none",
    borderRadius: 5,
    outline: isError ? `2px solid ${colors.red}` : "none",

    fontSize: "1.3rem",
    fontFamily: "inherit",
    padding: "1.2rem 1.2rem",

    backgroundColor: colors.lightGray,
    color: colors.black,

    "&::placeholder": {
      color: colors.darkGray,
    },
  });

const TextInput = styled.input<{ isError: boolean }>({}, (props) =>
  getInputStyle(props)
);

const NumberInput = styled(NumericFormat)<{ isError: boolean }>({}, (props) =>
  getInputStyle(props)
);

type FieldProps<T> = {
  className?: string;

  placeholder?: string;
  isPassword?: boolean;

  onChange?: (value: T) => void;
  value: T;

  isError?: boolean;
};

export default function TextField({
  className,
  placeholder,
  isPassword,
  onChange,
  value,
  isError,
}: FieldProps<string>) {
  return (
    <TextInput
      className={className}
      type={isPassword === true ? "password" : "text"}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
      isError={isError === true}
    />
  );
}

export function NumberField({
  className,
  placeholder,
  isPassword,
  onChange,
  value,
  isError,
}: FieldProps<number | null>) {
  return (
    <NumberInput
      className={className}
      type={isPassword === true ? "password" : "text"}
      placeholder={placeholder}
      isError={isError === true}
      value={value ?? undefined}
      onValueChange={({ floatValue }) => onChange && onChange(floatValue ?? null)}
      thousandSeparator
      allowNegative={false}
      suffix="만원"
    />
  );
}
