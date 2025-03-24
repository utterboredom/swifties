import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type ButtonControlProps = {
  status: 'preview' | 'recording' | 'playback';
  startRecord: () => void;
  stopRecord: () => void;
  onStartRecord?: () => void;
  onStopRecord?: () => void;
  onSave?: () => void;
  onDiscard?: () => void;
  anchor?: "top" | "bottom";
};
const ButtonControls = ({
  status,
  anchor,
  startRecord,
  stopRecord,
  onStartRecord,
  onStopRecord,
  onSave,
  onDiscard
}: ButtonControlProps) => {
  const handleStartRecord = () => {
    if(status !== 'preview') {
      return;
    }
    startRecord();
    if (onStartRecord) {
      onStartRecord();
    }
  };

  const handleStopRecord = () => {
    if(status !== 'recording') {
      return;
    }
    stopRecord();
    if (onStopRecord) {
      onStopRecord();
    }
  };

  return (
    <Wrapper
      $anchor={anchor}
      onClick={status === "recording" ? handleStopRecord : handleStartRecord}
    >
      { status === "recording" && <StopButton />}
      { status === "preview" && <RecordButton />}
      { status === "playback" && 
        <Actions>
          <ActionButton onClick={onDiscard}><FontAwesomeIcon icon={faTrash}/></ActionButton>
          <ActionButton onClick={onSave}><FontAwesomeIcon icon={faSave}/></ActionButton>
        </Actions>
      }
    </Wrapper>
  );
};

export default ButtonControls;

const Wrapper = styled.div<{ $anchor?: "top" | "bottom" }>`
  position: fixed;
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  bottom: ${(props) => props.$anchor === "bottom" && "0px"};
  margin-bottom: 20px;
`;

const RecordButton = styled.div`
  background-color: red;
  &:hover {
    background-color: #f54242;
  }
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const StopButton = styled.div`
  background-color: red;
  &:hover {
    background-color: #f54242;
  }
  border-radius: 5px;
  width: 80px;
  height: 80px;
`;

const Actions = styled.div `
  display: flex;
  flex-direction: row;
`
const ActionButton = styled.button`
  width: 50px;
  height: 50px;
  margin: 20px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: transparent;
  &:hover {
    background-color: red;
  },
  text-align:center;
  z-index: 1000;
  color: white;
  font-size: 2em;
`


