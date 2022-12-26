import React from 'react';
import WidgetWrapper from "./WidgetWrapper";
import CommentWidget from 'scenes/widgets/CommentWidget';


const Comments = ({ comments, handleSubmitComment }) => {

  return (
    <WidgetWrapper p="0 !important">
      {
        comments.length !== 0 ? comments.map(comment => (
          comment !== undefined ? <CommentWidget key={comment} comment={comment} handleSubmitComment={handleSubmitComment} /> : "Please wait loading comment..."
        )) : "No comments to show."
      }
    </WidgetWrapper>
  )
}

export default Comments;