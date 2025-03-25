import { useState } from "react";
import styled from "styled-components"
import useMediaServerAccess from "../hooks/mediaServerAccess";
import { User } from "./types";

type WelcomeProps = {
    onStart: (userId: number) => void
}

type Interests = "men" | "women" | "other";
type Gender = "male" | "female" | "other";

const Welcome = ({onStart}: WelcomeProps) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState<Gender>("male");
    const [interest, setInterest] = useState<Interests>("women")
    const {createUser} = useMediaServerAccess()

    const handleStartVideo = async() => {
        const user = await createUser({name, gender, interest});
        if(!user) {
            return;
        }
        onStart(user.id)
    }
    const handleSetName = (input: { currentTarget: { value: string; }; }) => {
        setName(input.currentTarget.value);
    }
    const handleSetGender = (input: { currentTarget: { value: string; }; }) => {
        const selectedGender = input.currentTarget.value as Gender;
        setGender(selectedGender)
    }
    const handleSetInterests = (input: { currentTarget: { value: string; }; }) => {
        const selectedInterest = input.currentTarget.value as Interests;
        setInterest(selectedInterest)
    }

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
            <InputWrapper>
                <label>What is your name?</label>
                <StyledInput name="person_name" onChange={handleSetName}/>
            </InputWrapper>
            <InputWrapper>
                <label>What is your gender?</label>
                <StyledSelect defaultValue={gender} onChange={handleSetGender} name="genders" id="genders">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </StyledSelect>
            </InputWrapper>
            <InputWrapper>
                <label>Who are you interested in meeting?</label>
                <StyledSelect defaultValue={interest} onChange={handleSetInterests} name="interestedIn" id="interested">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="other">Other</option>
                </StyledSelect>
            </InputWrapper>

            <p>Limit your video to 45 seconds and remember - Have fun!</p>
            <Button onClick={handleStartVideo}>Begin!</Button>
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
    li {
        margin-top: 5px;
    }
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;
    align-content: center;
    width: 100%;

`
const StyledInput = styled.input`
    height: 25px;
    margin-top: 5px;
    border: none;
`
const StyledSelect = styled.select`
    height: 25px;
    margin-top: 5px;
    border: none;
`
