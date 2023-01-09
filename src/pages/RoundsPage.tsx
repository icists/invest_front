import styled from "@emotion/styled";

import Header from "@/components/Header";

const Main = styled.main({
  display: "flex",
  flexDirection: "column",

  height: "100%",
  width: "100%",

  margin: "0 auto",
  padding: "1.5rem 1rem",

  overflowY: "scroll",
});

export default function RoundsPage() {
  return (
    <Main>
      <Header as="h1">라운드</Header>
    </Main>
  );
}
