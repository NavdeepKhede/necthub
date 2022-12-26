import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setPost } from 'state';
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const [comment, setComment] = useState('');

    const handleSubmitComment = async ({ postId, post }) => {
        if(!comment.trim()) return;

        const newComment = {
            content: comment,
            likes: [],
            user,
            createdAt: new Date().toISOString(),
            postId,
            postUserId: user._id,
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        });

        const updatedComment = await response.json();

        const newPost = {...post, comments: [...post.comments, updatedComment._id]};
        dispatch(setPost({ post: newPost }));
        setComment('');

        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
        
    }

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {posts.map(
        (post) => (
            <PostWidget
                key={post._id}
                post={post}
                comment={comment}
                setComment={setComment}
                handleSubmitComment={handleSubmitComment}
            />
        )
    )}
    </>
  )
}

export default PostsWidget