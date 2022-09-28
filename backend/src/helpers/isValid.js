import mongoose from "mongoose";

export default function isValidId( mongooseId ) {
    return mongoose.Types.ObjectId.isValid( mongooseId );
}