import { User } from "../components/types";
import { SERVER_URL } from "./constants";
import { CreateUserRequest, FileRequest, VideoUploadRequest } from "./types";

const useMediaServerAccess = () => {
    const saveVideoToServer = async({file, userId}: VideoUploadRequest) => {
        const formData = new FormData();
        formData.append('media', file,'video.mp4');
        try {
        const response = await fetch(`${SERVER_URL}/profiles/${userId}/upload`, {
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

    const createUser = async({name, gender, interest}: CreateUserRequest): Promise<User | void> => {
        if(!name) {
            console.error("Name is a required field")
        }
       return await fetch(`${SERVER_URL}/profiles/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                name,
                gender,
                interest
            }),
        }).then((body) => {
            return body.json()
        }).then((resp) => {
            return resp.data
        }).catch((error) => {
            console.error("Error creating user", error)
        });

    }

    const getRandomProfile = async(): Promise<User> => {
        return await fetch(`${SERVER_URL}/profiles/list_random`, {
            method: 'GET',
            headers: new Headers({
                "ngrok-skip-browser-warning": "true",
            }),
        }).then((body) => {
            return body.json()
        }).then((resp) => {
            return resp.data
        }).catch((error) => {
            console.error("Error finding user", error)
        });
    }

    const getFileStream = async({fileName}: FileRequest) => {
        return await fetch(`${SERVER_URL}/video/${fileName}`, {
            method: 'GET',
            headers: {
                "Content-Type": "video/mp4",
            }
        }).then((body) => {
            return body.blob()
        }).then((blob) => {
            return blob
        })
        .catch((error) => {
            console.error("Error creating user", error)
        });

    }

    return {
        saveVideoToServer,
        createUser,
        getRandomProfile,
        getFileStream
    }
}

export default useMediaServerAccess;