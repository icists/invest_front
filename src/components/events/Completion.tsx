import styled from "@emotion/styled";

import CompletionImage from "@/assets/events/completion.png";

import stamp1 from "@/assets/events/completion/stamp1.png";
import stamp2 from "@/assets/events/completion/stamp2.png";
import stamp3 from "@/assets/events/completion/stamp3.png";
import stamp4 from "@/assets/events/completion/stamp4.png";
import stamp5 from "@/assets/events/completion/stamp5.png";
import stamp6 from "@/assets/events/completion/stamp6.png";

const stamps = [stamp1, stamp2, stamp3, stamp4, stamp5, stamp6];

import Event from "./Event";
import { useEvent } from "@/context";

const Stamp = styled.img<{ top: number; left: number }>(
  {
    position: "absolute",
    width: "27.4%",
    zIndex: 1,
  },
  ({ top, left }) => ({ top, left })
);

type CompletionProps = {
  visible: boolean;
};

export default function Completion({ visible }: CompletionProps) {
  const { completion } = useEvent();
  return (
    <Event
      visible={visible}
      image={CompletionImage}
      status={completion}
      getStamp={(n, width, height) => (
        <Stamp
          key={n}
          src={stamps[n - 1]}
          top={height * (0.341 + 0.2363 * Math.floor((n - 1) / 2))}
          left={
            width * (0.189 + 0.374 * (n === 1 || n === 4 || n === 5 ? 0 : 1))
          }
        />
      )}
    />
  );
}
