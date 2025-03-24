import { SERVER_URL } from "./constants";

const useMediaServerAccess = () => {
    const saveVideoToServer = async(file: File) => {
        const formData = new FormData();
        formData.append('video', file);
        try {
        const response = await fetch(`${SERVER_URL}/profiles/1/upload`, {
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

    return {
        saveVideoToServer
    }
}

export default useMediaServerAccess;