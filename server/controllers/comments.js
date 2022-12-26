import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getCommentInfo = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if(!comment)
            return res.status(400).json({ message: "This comment does not exist."});

        const user = await User.findById(comment.postUserId.toString())

        if(!user)
            return res.status(400).json({ message: "This user doesn't exist!"});

        const newComment = {
            _id: comment._id,
            content: comment.content,
            postedBy: `${user.firstName} ${user.lastName}`,
            picturePath: user.picturePath,
        };

        res.status(200).json({ newComment });
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const createComment = async (req, res) => {
    try {
        const { postId, content, tag, reply, postUserId } = req.body;
        const post = await Post.findById(postId);

        if(!post)
            return res.status(400).json({ message: "This post doesn't exist!"});
        
        if(reply){
            const com = await Comment.findById(reply);
            if(!com)
                return res.status(400).json({ message: "This comment does not exist."});
        }

        const newComment = new Comment({
            user: req.user._id, content, tag, reply, postUserId, postId
        });

        await Post.findOneAndUpdate({_id: postId}, {
            $push: { comments: newComment._id}
        }, { new: true });

        await newComment.save();
        res.status(201).json({ newComment });
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        await Comment.findOneAndUpdate({
            _id: req.params.id, 
            user: req.user._id
        }, { content });

        res.status(200).json({ message: "Update Success!"})
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const likeComment = async (req, res) => {
    try {
        const comment = await Comment.find({ _id: req.params.id, likes: req.user._id });
        if(comment.length > 0)
            return res.status(400).json({ msg: "You liked this post."})

        await Comment.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, {new: true});

        res.status(200).json({ message: "Liked Comment!"});
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const unLikeComment = async (req, res) => {
    try {
        await Comment.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes : req.user._id }
        }, { new: true });

        res.status(200).json({ message: error.message });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.id,
            $or: [
                { user: req.user._id },
                { postUserId: req.user._id },
            ]
        });

        await Post.findOneAndUpdate({ _id: comment.postId },{
            $pull: { comments: req.params.id }
        });

        res.status(200).json({ message: "Comment Deleted!"})
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}