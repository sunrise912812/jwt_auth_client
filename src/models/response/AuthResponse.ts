import { IUser } from "../IUser"

export interface AuthResponse{
    accsesToken : string
    refreshToken : string
    user : IUser
}