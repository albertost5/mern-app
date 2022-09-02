import checkDuplicate from '../helpers/check-duplicate.js';
import Vet from '../models/Vet.js';
import errorResponse from '../utils/error.utils.js';

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
            await Vet.create({ name, password, email });
            return res.json({
                message: `Register completed successfully!`,
                vet: {
                    name,
                    email
                }
            });
        }
    } catch (error) {
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
        
        if(!vet) return res.status(404).json( errorResponse('40400', 'User not found.') );
        
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

const auth = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exist by the email
        const vet = await Vet.findOne({ email });
        if (!vet) {
            return res.status(404).json( errorResponse('40401', 'User doesnt exist.') );
        }
        // Check if the user confirm the account
        if (!vet.confirmed) {
            return res.status(403).json( errorResponse('40300', 'Account not confirmed.') );
        }
        // Check if the passwords match
        if (!vet.checkPasswords(password)) {
            return res.status(403).json( errorResponse('40301', 'Passwords do not match.') );
        } 
        // Login
        res.json({
            message: `Welcome ${vet.name}!`,
        });
    } catch (error) {
        return res.status(404).json( errorResponse('40400', 'Error finding the user.') );
    }
}

export {
    register,   
    auth,
    confirmation
}