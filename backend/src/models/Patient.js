import mongoose from "mongoose";
const { Schema, model } =  mongoose;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vet: {
        type: Schema.Types.ObjectId, ref: 'Vet'
    }
}, {
    timestamps: true    // created_at, modified_at
});

export default model('Patient', patientSchema);