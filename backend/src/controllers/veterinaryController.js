import { v4 as uuidv4 } from 'uuid';
import Vet from '../models/Vet.js';
import checkDuplicate from '../helpers/check-duplicate.js';
import errorResponse from '../utils/error.utils.js';
import generateJWT from '../helpers/generate-jwt.js';
import emailRegister from '../helpers/email-register.js';
import emailPassword from '../helpers/email-password.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json( errorResponse('40001', 'All fields are required!') );
    }

    try {
        // Check duplicate user
        const vet = await checkDuplicate( email );

        if (vet) {
            return res.status(400).json( errorResponse('40003', 'The user already exists.') );
        } else {
            const vetCreated = await Vet.create({ name, password, email });

            // Send email after create the Veterinary
            await emailRegister({
                email,
                name,
                token: vetCreated.token
            });

            return res.json({
                message: `Register completed successfully!`,
                vet: {
                    name,
                    email
                }
            });
        }
    } catch (error) {
        console.log('Error registering new user:', error);
        if (error?.code) {
            return res.status(400).json( error );
        } else {
            return res.status(500).json( errorResponse('50000', 'Something went wrong registering the user.') );
        }
    }
}

const confirmation = async (req, res) => {
    const { token } = req.params;
    
    try {
        const vet = await Vet.findOneAndUpdate({ token }, { $set: { confirmed: true, token: null } }, { new: true});
        
        if(!vet) return res.status(404).json( errorResponse('40400', 'User not found or token not valid.') );
        
        return res.json({
            message: 'Account confirmed successfully.',
            vet: {
                name: vet.name,
                email: vet.email,
                confirmed: vet.confirmed
            }
        });
    } catch (error) {
        return res.status(500).json( errorResponse('50000', 'Error finding the user.') );
    }
}

const auth = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exist by the email
        const vet = await Vet.findOne({ email });
        if (!vet) {
            return res.status(404).json( errorResponse('40401', 'User does not exist.') );
        }
        // Check if the user confirm the account
        if (!vet.confirmed) {
            return res.status(403).json( errorResponse('40300', 'Account not confirmed.') );
        }
        // Check if the passwords match
        if (!vet.checkPasswords(password)) {
            return res.status(403).json( errorResponse('40301', 'Incorrect password.') );
        } 
     
        // Login
        res.json({
            _id: vet.id,
            name: vet.name,
            email: vet.email,
            token: generateJWT(vet.id)
        });
    } catch (error) {
        return res.status(404).json( errorResponse('40400', 'Error finding the user.') );
    }
}

const reset = async (req,res) => {
    const { email } = req.body;
    
    try {
        const vet = await Vet.findOne({ email });
        if ( !vet ) {
            return res.status(404).json( errorResponse('40401', 'Does not exist any user with the email provided.') );
        }

        // Set new token to reset the password /reset-password/:token endpoint
        vet.token = uuidv4();

        try {
            await vet.save();

            // Send email redirecting the user to the component to set the new password
            emailPassword(vet);

            return res.json({
                message: 'We have sent an email with the steps to reset the password.'
            });
        } catch (error) {
            return res.status(400).json( errorResponse('40000', 'There was and error reseting the password.') );
        }

    } catch (error) {
        return res.status(404).json( errorResponse('40400', 'User not found.') );
    }
}

const validateToken = async (req,res) => {
    const { token } = req.params;

    try {
        const vet = await Vet.findOne({ token });
        if ( vet ) {
            return res.json({
                message: 'Valid token to change the password.'
            });
        } else {
            return res.status(400).json( errorResponse('40000', 'The token provided to change the password is not valid.') );
        }
    } catch (error) {
        return res.status(404).json( errorResponse('40400', 'User not found.') );
    }
}

const newPassword = async (req,res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    try {
        const vet = await Vet.findOne({ token });
        if ( !vet ) {
            return res.status(404).json( errorResponse('40401', 'User not found.') );
        }

        try {
            vet.token = null;
            vet.password = password;
            await vet.save();
            return res.json({
                message: 'Password changed successfully!'
            });
        } catch (error) {
            return res.status(400).json( errorResponse('40000', 'Error saving the new password.') );
        }
    } catch (error) {
        return res.status(404).json( errorResponse('40400', 'User not found.') );       
    }
}

const profile = (req, res) => {
    const { vet } = req;
    res.json(vet);
}

const updateProfile = async(req, res) => {
    const { body } = req;
    const vet = await Vet.findById(req.params.id);
    if ( !vet ) return res.status(404).json( errorResponse('40400', 'User not found.') );
    if ( vet.email !== body.email ) {
        const emailSaved = await Vet.findOne({ email: body.email });
        if ( emailSaved ) {
            return res.status(400).json( errorResponse('40001', 'The email is already in use.') )
        }
    }
    try {
        vet.name = body.name;
        vet.web = body.web;
        vet.email = body.email;
        vet.phone = body.phone;
        const vetUpdated = await vet.save();
        return res.json(vetUpdated);
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was an error updating the vet.') );
    }
}

const updatePassword = async(req, res) => {
    const { id } = req.vet;
    const { current_password, new_password } = req.body

    // Check vet exist
    const vet = await Vet.findById(id);
    if ( !vet ) return res.status(404).json( errorResponse('40400', 'User not found.') );

    // Check password
    if ( vet.checkPasswords(current_password) ) {
        vet.password = new_password;
        try {
            await vet.save();
            return res.json({
                message: 'Password saved successfully!'
            });
        } catch (error) {
            return res.status(400).json( errorResponse('40001', 'There was a problem updating the new password.') );
        }
    } else {
        return res.status(400).json( errorResponse('40000', 'The current password is incorrect.') );
    }
}

export {
    register,   
    auth,
    confirmation,
    profile,
    reset,
    validateToken,
    newPassword, 
    updateProfile,
    updatePassword
}