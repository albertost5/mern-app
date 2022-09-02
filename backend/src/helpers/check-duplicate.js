import Vet from '../models/Vet.js';
import errorResponse from '../utils/error.utils.js';

export default async function checkDuplicate( email ) {
    try {
        return await Vet.findOne({ email });
    } catch (error) {
        throw errorResponse('40002', 'Error checking duplicate user.');
    }
}