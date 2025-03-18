import { MongoClient, Db } from "mongodb";
import { readFileSync } from 'fs';
import { ITransaction } from "./model/transaction";
import router from './routes/routes';
import { authenticateJwt } from "./middleware/authenticate";

require('dotenv').config();
const express = require('express');
var cors = require('cors')

const PORT: string = process.env.PORT;
const DB_CONNECTION_STRING: string = process.env.DB_CONNECTION_STRING;
const DB_NAME: string = process.env.DB_NAME;
const DB_TRANSACTION_COLLECTION_NAME: string = process.env.DB_TRANSACTION_COLLECTION_NAME;

const mongoClient = new MongoClient(DB_CONNECTION_STRING);
const mongoDatabase: Db = mongoClient.db(DB_NAME);

export const transactionCollection = mongoDatabase.collection<ITransaction>(DB_TRANSACTION_COLLECTION_NAME);

export const publicKey = readFileSync("/app/rsa-keys/public.pem", "utf8");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJwt);
app.use('/', router);
  
app.listen(PORT, (error: string) =>{
    if(!error)
        console.log(`Server is Successfully Running, and App is listening on port  ${PORT}`)
    else 
        console.log(`Error occurred, server can't start ${error}`);
    }
);

