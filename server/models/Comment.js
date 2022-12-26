import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "users",
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId,
}, 
 { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;