import { ReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import ButtonControls from "./ButtonControls";
import VideoPreview from "./VideoPreview";
import { useState } from "react";
import useGetMediaStream from "../../hooks/GetMediaStream";
import RecordView from "./RecordView";

const VideoView = () => {
  const [videoState, setVideoState] = useState<'preview' | 'recording' | 'playback'>('preview');

  return (
    <div>
      <ReactMediaRecorder
        video
        render={({
          status,
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
              onDiscard={() => setVideoState('preview')}
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
