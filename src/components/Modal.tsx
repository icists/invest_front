import styled from "@emotion/styled";

const Overlay = styled.div<{ visible: boolean }>(
  {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,

    backgroundColor: "black",
    transition: "opacity 0.3s",
  },
  (props) => ({
    opacity: props.visible ? 0.7 : 0,
    pointerEvents: props.visible ? "all" : "none",
  })
);

const Box = styled.div<{ visible: boolean }>(
  {
    width: "100vw",
    maxWidth: 500,
    height: "calc(var(--vh) * 0.85)",
    overflowY: "scroll",

    position: "fixed",
    left: "50%",
    bottom: 0,

    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",

    zIndex: 1,

    transition: "transform 0.3s",
  },
  (props) => ({
    transform: `translate(-50%, ${props.visible ? "0" : "100%"})`,
  })
);

type ModalProps = {
  onClose: () => void;
  visible: boolean;
  children?: React.ReactNode;
};

export default function Modal({ onClose, visible, children }: ModalProps) {
  return (
    <>
      <Overlay visible={visible} onClick={onClose} />
      <Box visible={visible}>{children}</Box>
    </>
  );
}
