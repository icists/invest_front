import { colors } from "@/styles";
import styled from "@emotion/styled";

const LogoContainer = styled.div<{ width: number; backgroundColor?: string }>(
  {
    borderRadius: "100%",

    flex: "0 0 auto",
    padding: "0.5rem",
  },
  (props) => ({
    height: props.width,
    width: props.width,
    backgroundColor: props.backgroundColor ?? colors.lightGray,
  })
);

const Logo = styled.img({
  height: "100%",
  width: "100%",
  objectFit: "contain",
});

type CompanyLogoProps = {
  backgroundColor?: string;
  src: string;
  width: number;
  onClick?: () => void;
};

function CompanyLogo({
  src,
  width,
  backgroundColor,
  onClick,
}: CompanyLogoProps) {
  return (
    <LogoContainer
      width={width}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      <Logo src={src} key={src} />
    </LogoContainer>
  );
}

export default CompanyLogo;
