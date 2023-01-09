import styled from "@emotion/styled";

import BingoImage from "@/assets/events/bingo.png";
import StampImage from "@/assets/events/stamp.svg";

import Event from "./Event";
import { useEvent } from "@/context";

const Stamp = styled.img<{ top: number; left: number; rotate: number }>(
  {
    position: "absolute",
    width: "17%",
    zIndex: 1,
  },
  ({ top, left, rotate }) => ({
    top,
    left,
    transform: `rotate(${rotate}deg)`,
  })
);

type BingoProps = {
  visible: boolean;
};

export default function Bingo({ visible }: BingoProps) {
  const { bingo } = useEvent();
  return (
    <Event
      visible={visible}
      image={BingoImage}
      status={bingo}
      getStamp={(n, width, height) => (
        <Stamp
          key={n}
          src={StampImage}
          top={height * (0.365 + 0.092 * Math.floor((n - 1) / 4))}
          left={width * (0.09 + 0.215 * ((n - 1) % 4))}
          rotate={Math.random() * 90 - 45}
        />
      )}
    />
  );
}
