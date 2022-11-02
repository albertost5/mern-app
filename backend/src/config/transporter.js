import nodemailer from "nodemailer";
import * as dotenv from 'dotenv';
dotenv.config();


// Create reusable transporter object using the default SMTP transport
const transporter  = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default transporter;