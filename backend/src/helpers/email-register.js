import transporter from '../config/transporter.js';
import * as dotenv from 'dotenv';
dotenv.config();

const emailRegister = async (vetObject) => {

    const {email, name, token} = vetObject;

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail({
            from: 'MVP - Veterinary App', // sender address
            to: email, // list of receivers
            subject: "MVP_Validate your account ✔", // Subject line
            text: `Welcome ${name}!!!`, // plain text body
            html: `
                <p>Hello ${name}, check your MVP account.</p>
                <p>Your account is ready, just activate using the link:
                    <a href="${process.env.FRONTEND_BASEPATH}/confirm-account/${token}">Get token to validate your account</a>
                </p>
                <p>If you didn't create this account you can ignore this message.</p>
            `, // html body
        });
        console.log('Email sent @ registration: %s', info.messageId);
    } catch (error) {
        throw errorResponse('40004', 'Error sending confirmation email.');
    }

}

export default emailRegister;