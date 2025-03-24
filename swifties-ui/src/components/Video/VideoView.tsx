import { ReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import ButtonControls from "./ButtonControls";
import VideoPreview from "./VideoPreview";
import { useState } from "react";
import RecordView from "./RecordView";

const VideoView = () => {
  const [videoState, setVideoState] = useState<'preview' | 'recording' | 'playback'>('preview');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleOnSave = async () => {
    if (!videoFile) {
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:8080/profiles/1/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.log('File upload failed.');
      }
    } catch (error) {
      console.error('There was an error uploading the file:', error);
    }

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
