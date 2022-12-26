import express from 'express';
import {
    createComment,
    updateComment,
    likeComment,
    unLikeComment,
    deleteComment,
    getCommentInfo
} from '../controllers/comments.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* GET */
router.get("/:id", verifyToken, getCommentInfo);


/* POST */
router.post("/", verifyToken, createComment);

/* UPDATE */
router.patch("/:id", verifyToken, updateComment);
router.patch("/:id/like", verifyToken, likeComment);
router.patch("/:id/unlike", verifyToken, unLikeComment);

/* DELETE */
router.delete("/:id", verifyToken, deleteComment);

export default router;