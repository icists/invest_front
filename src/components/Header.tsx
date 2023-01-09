import styled from "@emotion/styled";

const HeaderElem = styled.h1({
  margin: "0 0 1.5rem 0",
});

type HeaderProps = {
  className?: string;
  as: "h1" | "h2";
  children?: React.ReactNode;
};

function Header({ className, as, children }: HeaderProps) {
  return (
    <HeaderElem className={className} as={as}>
      {children}
    </HeaderElem>
  );
}

export default Header;
