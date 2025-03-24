import { RefObject, useEffect, useState } from "react";

/* 
    This is not an ideal hook for getting user media but the preview stream in 
    react-media-recorder doesn't work and doesn't look like its being fixed based on 
    their github issues page so this was created to do a video preview before the user
    hits the record button;
*/
const useGetMediaStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | undefined>();

  useEffect(() => {
    const getStream = async () => {
      const constraints = {
        audio: false,
        video: {
          width: { min: 640, ideal: 1280 },
          height: { min: 480, ideal: 720 },
          facingMode: "user", //TODO: add the ability to switch facing modes
        },
      };
      const s = await navigator?.mediaDevices?.getUserMedia(constraints);
      setVideoTrack(s?.getVideoTracks()[0]);
      setStream(s);
    };

    getStream();
    return () => {
      videoTrack?.stop();
      setStream(null);
    };
  }, [navigator?.mediaDevices]);

  return stream;
  
};

export default useGetMediaStream;
