import { User } from "../components/types"

export type CreateUserRequest = {
    name: string,
    gender: 'male' | 'female' | 'other',
    interest: 'men' | 'women' | 'other',
}

export type VideoUploadRequest = {
    userId: number,
    file: Blob
}

export type UserResponse = {
    data: User,
    success: boolean
}


export type FileRequest = {
    fileName: string
}