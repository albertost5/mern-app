import checkDuplicate from '../helpers/check-duplicate.js';
import Vet from '../models/Vet.js';
import errorResponse from '../utils/error.utils.js';
import getStatusCode from '../utils/status.util.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
        return res.status(400).json( errorResponse('40000', 'All fields are required!') );
    }

    try {
        // Check duplicate user
        const user = await checkDuplicate( email );
        
        if( user ) {
            return res.status(400).json( errorResponse('40002', 'The user already exists.') );
        } else {
            await Vet.create({ name, password, email });
            return res.json({
                message: `Register completed successfully!`,
                user: {
                    name,
                    email
                }
            });
        }
    } catch (error) {
        console.log( getStatusCode( error ) );
        if( getStatusCode( error ) === 400 ) return res.status(400).json( error );
        return res.status(500).json( errorResponse('50000', 'Something went wrong registering the user.') );
    }
}

const profile = (req, res) => {
    
}

export {
    register,
    profile
}