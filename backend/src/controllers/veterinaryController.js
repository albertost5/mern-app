import Vet from '../models/Vet.js';
import errorResponse from '../utils/error.utils.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
        return res.status(400).json( errorResponse('40000', 'BAD_REQUEST', 'All fields are required!') );
    }

    try {
        await Vet.create({ name, password, email });
        return res.json({
            message: `Register completed successfully!`,
            user: {
                name,
                email
            }
        });
    } catch (error) {
        return res.status(500).json( errorResponse('50000', 'INTERNAL_SERVER_ERROR', 'There was a problem during the registration.') );
    }
}

const profile = (req, res) => {
    
}

export {
    register,
    profile
}