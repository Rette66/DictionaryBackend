import mongoose, {Schema} from "mongoose";

export const bookSchema = new Schema(
    {
        title:{type: String, required: true, unique: true},
        author : {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export const book = mongoose.model('books', bookSchema)