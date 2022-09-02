import express from 'express';
import * as dotenv from 'dotenv';
import { connectDb } from './db/db.js';
import router from './routes/index.js';
dotenv.config();

const app = express();

// DB
await connectDb();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/', router);

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => {
    console.log(`App listening on port ${PORT} ✅`);
});
