import transporter from '../config/transporter.js';
import * as dotenv from 'dotenv';
dotenv.config();

const emailPassword = async (vetObject) => {

    const {email, name, token} = vetObject;

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail({
            from: 'MVP - Veterinary App', // sender address
            to: email, // list of receivers
            subject: "MVP_Reset your password!", // Subject line
            text: `Reset your password!`, // plain text body
            html: `
                <p>Hello ${name}, you have requested to reset your password.</p>
                <p>Click the link to generate a new password:
                    <a href="${process.env.FRONTEND_BASEPATH}/forget-password/${token}">Reset password</a>
                </p>
                <p>If you didn't create this account you can ignore this message.</p>
            `, // html body
        });
        console.log('Email sent @ forget-password: %s', info.messageId);
    } catch (error) {
        throw errorResponse('40004', 'Error sending the email to reset the password.');
    }

}

export default emailPassword;