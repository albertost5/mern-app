import express from 'express';
import * as dotenv from 'dotenv';
import { connectDb } from './db/db.js';
dotenv.config();


const app = express();

try {
    connectDb();
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    res.json('Hello world!');
});

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => {
    console.log(`App listening on port ${PORT} ✅`);
});