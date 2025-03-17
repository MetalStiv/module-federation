export interface ITransactionDto {
    _id?: string,
    input: boolean,
    dateTime: number,
    amount: number,
    comment?: string,
}