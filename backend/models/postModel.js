import mongoose from 'mongoose';
const Schema = mongoose.Schema


const postSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: { type: String, default: ""},
    date: { type: Date, default: Date.now},
    deleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    ratings: {
        type: [
            {
                ratingType: { type: String, default: null },
                stars: { type: Number, default: 0.0 },
            }
        ],
        default: [] 
    },
    images: [{ type: String, default: [] }],
});

export default mongoose.model('Post', postSchema)