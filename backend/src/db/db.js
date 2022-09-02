import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function connectDb() {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}`, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`DB connection established 🚀:  ${db.connection.host}:${db.connection.port}`);
    } catch (error) {
        console.log(`Error connecting the database ❌: ${error}`);
    }
}

export {
    connectDb
}