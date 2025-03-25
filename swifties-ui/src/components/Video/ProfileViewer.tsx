import { useEffect, useRef } from "react";
import styled from "styled-components";
import useMediaServerAccess from "../../hooks/mediaServerAccess";
import { SERVER_URL } from "../../hooks/constants";

const ProfileViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { getRandomProfile }  = useMediaServerAccess();
  const getProfileInfo = async () => {
    const profile = await getRandomProfile();
    if(!profile.greeting) {
      return;
    }
    const greeting = JSON.parse(profile.greeting)
    if (videoRef.current) {
      videoRef.current.src = `${SERVER_URL}/video/${greeting.filename}`
    };
  }

  getProfileInfo();
  return (
    <VideoWrapper>
      <Footer>
      <InfoBox>
        <span>Eric</span>
        <span>male</span>
      </InfoBox>
      <Button onClick={getProfileInfo}><b>Next Profile</b></Button>
      </Footer>
      <Video ref={videoRef} autoPlay playsInline loop/>;
    </VideoWrapper>  
  )
};

export default ProfileViewer;
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

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: 100vw;
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  border: 1px solid white;
  font-size: 1.5em;
  height: 80px;
  width: 150px;
  color: white;
  margin-left: 10px
`
const Button = styled.button`
  height: 80px;
  padding: 5px;
  margin-right: 15px;
  border-radius: 5px;
  color: white;
  background-color: transparent;
  border: 1px solid white;
  outline: inherit;
  &:hover {
    color: black;
    background-color: white;
  }
    z-index: 1000;
`
