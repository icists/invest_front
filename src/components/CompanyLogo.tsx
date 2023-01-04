import styled from "@emotion/styled";

import { colors } from "../styles";

const LogoContainer = styled.div<{ width: number }>(
  {
    backgroundColor: colors.lightGray,
    borderRadius: "100%",

    flex: "0 0 auto",
    padding: "0.5rem",
  },
  (props) => ({
    height: props.width,
    width: props.width,
  })
);

const Logo = styled.img({
  height: "100%",
  width: "100%",
  objectFit: "contain",
});

type CompanyLogoProps = {
  src: string;
  width: number;
};

function CompanyLogo({ src, width }: CompanyLogoProps) {
  return (
    <LogoContainer width={width}>
      <Logo src={src} key={src} />
    </LogoContainer>
  );
}

export default CompanyLogo;
