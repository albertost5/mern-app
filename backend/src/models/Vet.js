import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { v4 as uuidv4 } from 'uuid';


const vetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: uuidv4()
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

export default model('Vet', vetSchema);

