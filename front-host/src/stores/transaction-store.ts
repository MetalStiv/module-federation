import { makeAutoObservable } from "mobx";
import { ITransactionDto } from "../../../shared/types/dto/transaction-dto";
import { transactionMicroservice } from "../constants/axios-microservices";

const cacheTimestamp = Symbol("cacheTimestamp");
const cacheDuration = Symbol("cacheDuration");

export interface IFetchTransactionsParams {
    force: boolean;
}

const transactionStore = makeAutoObservable({
    transactions: [] as ITransactionDto[],
    loading: false,
    error: null,
    [cacheTimestamp]: 0,
    [cacheDuration]: 60000,

    isCacheValid(){
        return this[cacheTimestamp] && Date.now() - this[cacheTimestamp] < this[cacheDuration];
    },

    async fetchTransactions({force}: IFetchTransactionsParams = {force: false}) {
        if (!force && this.transactions.length > 0 && this.isCacheValid()) {
            console.log("Using cached todos");
            return;
        }

        this.loading = true;
        this.error = null;

        try {
            const response = await transactionMicroservice.get('getTransactions');
            this.transactions = response.data;
            this[cacheTimestamp] = Date.now();
        } catch (error: any) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    },

    async updateTransaction(transaction: ITransactionDto) {
        try {
            await transactionMicroservice.post('updateTransaction', {
                ...transaction
            });
            this.fetchTransactions({force: true});
        } catch (error: any) {
            this.error = error.message;
        }
    },

    async addTransaction(transaction: ITransactionDto) {
        try {
            await transactionMicroservice.post('addTransaction', {
                ...transaction
            });
            this.fetchTransactions({force: true});
        } catch (error: any) {
            this.error = error.message;
        }
    },

    async deleteTransaction(_id: string) {
        try {
            await transactionMicroservice.delete('deleteTransaction', {
                data: {_id}
            });
            this.fetchTransactions({force: true});
        } catch (error: any) {
            this.error = error.message;
        }
    },
});

export default transactionStore;