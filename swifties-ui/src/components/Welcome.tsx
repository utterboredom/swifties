import styled from "styled-components"

type WelcomeProps = {
    onStart: () => void
}
const Welcome = ({onStart}: WelcomeProps) => {
    return (
        <Container>
            <h2>Welcome to Swifties Dating!</h2>
            <h3>Let's get started by creating a video about you!</h3>
            <span>I want you to answer 3 basic questions in your video:</span>
            <StyledOrderedList>
                <li>What’s their favorite Disney character?</li>
                <li>If you could instantly master one new skill, what would it be and why?</li>
                <li>What’s your favorite way to spend a free afternoon?</li>
            </StyledOrderedList>
            <p>Limit your video to 45 seconds and remember - Have fun!</p>
            <Button onClick={onStart}>Begin!</Button>
        </Container>
    )
}
export default Welcome

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-image: url(popstar.webp);
    background-repeat: no-repeat;
    background-position-x: -30px;
    background-position-y: calc(100vh - 450px);
    background-size: 500px;
    background-color: #9d8976;
    padding: 20px;
    align-items: center;
    font-weight: bold;
    font-size: .9em;
    color: white;
    
`
const Button = styled.button`
    border: none;
    width: 100px;
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    &:hover {
        border: 2px;
    }
    font-weight: bold;
`

const StyledOrderedList = styled.ol`
    padding-top: 0px;
`
