import { useEffect, useRef } from "react";
import styled from "styled-components";

type RecordViewProps = {
    stream: MediaStream | null
}
const RecordView = ({stream}: RecordViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    return () => {

    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <Video ref={videoRef} autoPlay playsInline />;
};

export default RecordView;

const Video = styled.video`
  height: 100vh;
  object-fit: initial;
`;
