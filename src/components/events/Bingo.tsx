import styled from "@emotion/styled";

import BingoImage from "@/assets/events/bingo.png";
import StampImage from "@/assets/events/stamp.svg";
import { useEffect, useRef, useState } from "react";

const Container = styled.div({ position: "relative" });

const Image = styled.img({ position: "relative", width: "100%" });

const Stamp = styled.img<{ top: number; left: number }>(
  {
    position: "absolute",
    width: "17%",
    zIndex: 1,
  },
  ({ top, left }) => ({ top, left })
);

export default function Bingo() {
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  function handleResize() {
    if (backgroundRef.current === null) return;
    setImageSize({
      width: backgroundRef.current?.width,
      height: backgroundRef.current?.height,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const stamps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <Image ref={backgroundRef} src={BingoImage} />
      {stamps.map((n) => (
        <Stamp
          key={n}
          src={StampImage}
          top={imageSize.height * (0.365 + 0.092 * Math.floor((n - 1) / 4))}
          left={imageSize.width * (0.09 + 0.215 * ((n - 1) % 4))}
        />
      ))}
    </>
  );
}
