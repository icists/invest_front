import styled from "@emotion/styled";

const Container = styled.div<{ visible: boolean }>(
  {
    position: "absolute",
    width: "100vw",
    maxWidth: 600,
    minHeight: "80vh",
    left: "50%",
    bottom: 0,

    backgroundColor: "white",
    borderRadius: "20px 20px 0 0",

    transition: "transform 0.5s",
  },
  (props) => ({
    transform: `translate(-50%, ${props.visible ? "0" : "100%"})`,
  })
);

const Overlay = styled.div<{ visible: boolean }>(
  {
    backgroundColor: "black",

    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,

    transition: "opacity 0.3s",
  },
  (props) => ({
    opacity: props.visible ? 0.7 : 0,
    pointerEvents: props.visible ? "all" : "none",
  })
);

type CompanyModal = {
  visible: boolean;
  onClose: () => void;
};

function CompanyModal({ visible, onClose }: CompanyModal) {
  return (
    <>
      <Overlay visible={visible} onClick={onClose} />
      <Container visible={visible}>Hello</Container>
    </>
  );
}

export default CompanyModal;
