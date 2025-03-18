import { ObjectId } from "mongodb";

export interface ITransaction {
    _id: ObjectId,
    input: boolean,
    dateTime: number,
    amount: number,
    comment: string,
    userId: ObjectId,
}