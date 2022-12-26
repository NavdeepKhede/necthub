import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const CommentWidget = ({ comment, handleSubmitComment }) => {
  const [commentContent, setcommentContent] = useState({});
  const token = useSelector((state) => state.token);
  const commentId = comment;
  const { palette } = useTheme();

  const getComments = async () => {
    const response = await fetch(`http://localhost:3001/comment/${commentId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    setcommentContent(data);
  };

  useEffect(() => {
    getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      p="1rem !important"
      mb="0.5rem"
      borderRadius="0.5rem"
      sx={{ backgroundColor: palette.background.default }}
    >
      {commentContent && (
        <FlexBetween>
          <FlexBetween width="7%">
            <UserImage
              width="100%"
              image={commentContent?.newComment?.picturePath}
              size="28px"
            />
          </FlexBetween>
          <FlexBetween
            width="93%"
            flexDirection="column"
            alignItems="flex-start !important"
          >
            <Typography variant="h6" fontWeight="500">
              {commentContent?.newComment?.postedBy}
            </Typography>
            <Typography variant="p">
              {commentContent?.newComment?.content}
            </Typography>
          </FlexBetween>
        </FlexBetween>
      )}
    </Box>
  );
};

export default CommentWidget;
