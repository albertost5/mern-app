import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import errorResponse from '../utils/error.utils.js';
const { Schema, model } = mongoose;


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

vetSchema.pre('save', async function( next ) {
    if ( !this.isModified('password') ) next();

    const saltRounds = 10;
    
    try {
        this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
        throw errorResponse('40000', 'Error hashing the password.');
    }
});


export default model('Vet', vetSchema);

