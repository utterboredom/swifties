import { useEffect, useRef } from "react";
import styled from "styled-components";
import useGetMediaStream from "../../hooks/GetMediaStream";

const VideoPreview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stream = useGetMediaStream();
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    return () => {
        const track = stream?.getVideoTracks()[0];
        track?.stop();

    }
  }, [stream]);
  if (!stream) {
    
    return null;
  }
  return <Video ref={videoRef} autoPlay playsInline/>;
};

export default VideoPreview;

const Video = styled.video`
  height: 100vh;
`;
