import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './db/db.js';
import router from './routes/index.js';
dotenv.config();

const app = express();

// DB
await connectDb();

const whiteList = [process.env.FRONTEND_BASEPATH];

const corsOptions = {
    origin: function(origin, callback) {
        // console.log('CORS - Origin: ', origin)
        if( whiteList.indexOf(origin) !== -1 ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors(corsOptions));
app.use('/', router);

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => {
    console.log(`App listening on port ${PORT} ✅`);
});
