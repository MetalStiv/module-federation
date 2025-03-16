import { ObjectId } from "mongodb";

export interface IUser {
    _id: ObjectId,
    email: string,
    passwordHash: string,
    salt: string,
    refreshToken?: string,
    refreshTokenExpiryTime?: number
}