import { Router, Response } from 'express';
import { ITransactionDto } from '../../../shared/types/dto/transaction-dto';
import { IIdDto } from '../../../shared/types/dto/id-dto';
import { ITypedRequestBodyWithDecodedToken, RequestWithDecodedToken } from '../types/typed-request';
import { transactionCollection } from '../app';
import { ITransaction } from '../model/transaction';
import { ObjectId } from 'mongodb';
import { ITypedResponse } from '../types/typed-response';

const router = Router();

router.get('/getTransactions', async (req: RequestWithDecodedToken, res: ITypedResponse<ITransactionDto[]>) => {
    res.status(200).send((await transactionCollection.find({userId: new ObjectId(req.user.id)}).toArray())
        .map(transaction => ({
            _id: transaction._id,
            amount: transaction.amount,
            dateTime: transaction.dateTime,
            input: transaction.input,
            comment: transaction.comment
        })));
});

router.post('/addTransaction', async (req: ITypedRequestBodyWithDecodedToken<ITransactionDto>, res: Response) => {
    const newTransaction: ITransaction = {
        _id: new ObjectId(),
        input: req.body.input,
        dateTime: req.body.dateTime,
        amount: req.body.amount,
        comment: req.body.comment,
        userId: new ObjectId(req.user.id),
    }

    await transactionCollection.insertOne(newTransaction);
    res.status(200).send();
});

router.post('/updateTransaction', async (req: ITypedRequestBodyWithDecodedToken<ITransactionDto>, res: Response) => {
    console.log(req.body)
    const transactionToUpdate = await transactionCollection.findOne({'_id': new ObjectId(req.body._id)});
    if (!transactionToUpdate || transactionToUpdate.userId.toString() !== req.user.id){
        res.status(510).send();
    }

    await transactionCollection.findOneAndUpdate({'_id': new ObjectId(req.body._id)}, {
        $set: { 
            input: req.body.input,
            dateTime: req.body.dateTime,
            amount: req.body.amount,
            comment: req.body.comment,
         }
    });
    res.status(200).send(); 
});

router.delete('/deleteTransaction', async (req: ITypedRequestBodyWithDecodedToken<IIdDto>, res: Response) => {
    const transactionToDelete = await transactionCollection.findOne({'_id': new ObjectId(req.body._id)});
    if (!transactionToDelete || transactionToDelete.userId.toString() !== req.user.id){
        res.status(510).send();
    }

    await transactionCollection.findOneAndDelete({'_id': new ObjectId(req.body._id)});
    res.status(200).send();   
});

export default router;