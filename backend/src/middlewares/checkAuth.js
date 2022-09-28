import jwt from 'jsonwebtoken';
import Vet from '../models/Vet.js';
import errorResponse from '../utils/error.utils.js';

const checkAuth = async (req, res, next) => {
    let token;
    if( req.headers.authorization ) {
        try {
            // authorization: Bearer eyJhbGciOiJIUzI...
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // req.vet to "store" the data of the user
            try {
                req.vet = await Vet.findById(decoded.id).select("-password -token -confirmed");
                next();
            } catch (error) {
                return res.status(404).json( errorResponse('40400', 'Error finding the user after the token validation.') );
            }
        } catch (error) {
            return res.status(403).json( errorResponse('40300', 'Invalid token.') );
        }
    } else {
       return res.status(400).json( errorResponse('40000', 'Token not present.') );
    }
}

export default checkAuth;