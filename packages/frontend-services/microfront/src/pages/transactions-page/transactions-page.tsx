import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { UpdateTransactionForm } from "./update-transasction-form";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { rootStore } from "../../stores/root-store";
import { observer } from "mobx-react-lite";
 
const TransactionsPage = observer(() => {
    useEffect(() => {
        rootStore.transactionStore.fetchTransactions();
    }, []);

    const transactions = rootStore.transactionStore.transactions;

    const deleteTransaction: (id: string) => void = (id) => {
        rootStore.transactionStore.deleteTransaction(id);
    }

    return (
        <div style={{margin: 16}}>
            <div style={{width: '10vw'}}>
                <UpdateTransactionForm />
            </div>

            {
                transactions.map((transaction) => (
                    <Card
                        border={transaction.input ? 'success' : 'danger'}
                        text='black'
                        key={transaction._id}
                        style={{marginTop: '2vh'}}
                    >
                        <Card.Header>
                            {`${transaction.input ? 'Income' : 'Outcome'} ${new Date(transaction.dateTime).toLocaleString('ru-Ru')}`}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{transaction.amount}</Card.Title>
                            <Card.Text>
                                <div style={{display: 'flex', gap: 16, width: '100%'}}>
                                    <div style={{width: '90%'}}>
                                        {transaction.comment}
                                    </div>
                                    <div style={{width: '10%', display: 'flex', gap: 8}}>
                                        <UpdateTransactionForm transaction={transaction} />
                                        <ConfirmationDialog 
                                            showText='Delete'
                                            btnAcceptText='Delete'
                                            btnDeclineText='Cancel'
                                            question='Are you shure you want to delete transaction?'
                                            action={() => deleteTransaction(transaction._id!)}
                                        />
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
})

export default TransactionsPage;