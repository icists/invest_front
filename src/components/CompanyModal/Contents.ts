import styled from "@emotion/styled";

import Header from "../Header";

export const ContentTitle = styled(Header)({
  fontSize: "1.4rem",
  margin: "1.7rem 0 0.8rem 0",
  lineHeight: "1.8rem",
  wordBreak: "keep-all",
});

export const ContentParagraph = styled.p({
  lineHeight: "1.5rem",
  wordBreak: "keep-all",
  fontSize: "1.1rem",
});

export const Video = styled.iframe({
  width: "100%",
  height: 220,
  border: "none",
});
