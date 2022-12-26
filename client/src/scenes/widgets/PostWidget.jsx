import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import InputComment from "components/InputComment";
import Comments from "components/Comments";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  post,
  comment,
  setComment,
  handleSubmitComment,
}) => {
    const { _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments } = post;

    const postId = _id;
    const postUserId = userId;
    const name = `${firstName} ${lastName}`;

    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token );
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

  return (
    <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
        </Typography>
        {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", mt: "1rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
        )}
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={patchLike}>
                        {isLiked ? (
                            <FavoriteOutlined sx={{ color: primary }} />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => setIsComments(!isComments)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography>{comments?.length}</Typography>
                </FlexBetween>
                
            </FlexBetween>

            <IconButton>
                <ShareOutlined />
            </IconButton>
        </FlexBetween>
        {isComments && (
            <Box mt="0.5rem">
                {/* {comments.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                            {comment}
                        </Typography>
                    </Box>
                ))}
                <Divider /> */}
                <Comments comments={comments} handleSubmitComment={handleSubmitComment} />
                <InputComment  
                    comment={comment}
                    setComment={setComment}
                    handleSubmitComment={handleSubmitComment}
                    postId={postId}
                    post={post}
                />
            </Box>
        )}
    </WidgetWrapper>
  )
};

export default PostWidget;
