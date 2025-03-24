import { ReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import ButtonControls from "./ButtonControls";
import VideoPreview from "./VideoPreview";
import { useState } from "react";
import RecordView from "./RecordView";
import useMediaServerAccess from "../../hooks/mediaServerAccess";

const VideoView = () => {
  const [videoState, setVideoState] = useState<'preview' | 'recording' | 'playback'>('preview');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const {saveVideoToServer} = useMediaServerAccess();
  
  const handleOnSave = async () => {
    if (!videoFile) {
      return;
    }
    await saveVideoToServer(videoFile)

  } 

  const handleOnDiscard = () => {
    setVideoState('preview');
    setVideoFile(null)
  }

  
  return (
    <div>
      <ReactMediaRecorder
        video
        onStop={(blobUrl,blob) => {
          const file = new File([blob], "video.txt", { type: "text/plain" });
          setVideoFile(file);
        }}
        render={({
          startRecording,
          stopRecording,
          mediaBlobUrl,
          previewStream
        }) => (
          <VideoWrapper>
            <ButtonControls
              anchor={"bottom"}
              status={videoState}
              startRecord={startRecording}
              stopRecord={stopRecording}
              onStartRecord={() => setVideoState('recording')}
              onStopRecord={() => setVideoState('playback')}
              onDiscard={handleOnDiscard}
              onSave={handleOnSave}
            />
            {(videoState==='playback') && <Video src={mediaBlobUrl} autoPlay playsInline loop />}
            {(videoState==='preview') && <VideoPreview/>}
            {videoState==='recording' && <RecordView stream={previewStream}/>}
          </VideoWrapper>
        )}
      />
    </div>
  );
};

export default VideoView;

const VideoWrapper = styled.div`
  display: flex;
  position:static;
  justify-content: center;
  height: 100vh;
  width:  100vw;
  margin: 0px;
  padding: 0px; 
  overflow: hidden;
  bottom: 0px;
`;

const Video = styled.video`
  height: 100vh;
  object-fit: initial;
`;
