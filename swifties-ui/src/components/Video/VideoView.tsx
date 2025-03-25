import { ReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import ButtonControls from "./ButtonControls";
import VideoPreview from "./VideoPreview";
import { useState } from "react";
import RecordView from "./RecordView";
import useMediaServerAccess from "../../hooks/mediaServerAccess";


type VideoViewProps = {
  userId: number | undefined,
  onSave: () => void
}
const VideoView = ({userId,onSave}: VideoViewProps) => {
  const [videoState, setVideoState] = useState<'preview' | 'recording' | 'playback'>('preview');
  const [videoFile, setVideoFile] = useState<Blob | null>(null);
  const {saveVideoToServer} = useMediaServerAccess();
  
  const handleOnSave = async () => {
    if (!videoFile) {
      return;
    }
    if(!userId) {
      return;
    }
    await saveVideoToServer({userId, file:videoFile})
    onSave()
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
          setVideoFile(blob);
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
