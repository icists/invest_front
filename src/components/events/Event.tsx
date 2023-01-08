import styled from "@emotion/styled";

import { useEffect, useRef, useState } from "react";
import { EventStatus } from "@/schemes";

const Image = styled.img({ position: "relative", width: "100%" });

type EventProps = {
  visible: boolean;
  image: string;
  status: EventStatus;
  getStamp: (n: number, w: number, h: number) => React.ReactNode;
};

export default function Event({
  visible,
  image,
  status,
  getStamp,
}: EventProps) {
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
  }, [visible]);

  return (
    <>
      <Image ref={backgroundRef} src={image} />
      {[...status.entries()]
        .filter(([, v]) => v)
        .map(([k]) => getStamp(Number(k), imageSize.width, imageSize.height))}
    </>
  );
}
