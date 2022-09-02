import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function connectDb() {
    try {
        const db = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.be5hmyu.mongodb.net/?retryWrites=true&w=majority`, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`DB connection established: ${db.connection.host}:${db.connection.port} 🚀`);
    } catch (error) {
        return console.log(`Error connecting the database: ${error}`);
    }
}

export {
    connectDb
}