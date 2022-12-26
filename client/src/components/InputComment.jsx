import { IconButton, useTheme, InputBase } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { SendRounded } from "@mui/icons-material";


const InputComment = ({ comment, setComment, handleSubmitComment, postId, post }) => {
    const { picturePath } = useSelector((state) => state.user);
    const { palette } = useTheme();

  return (
    <WidgetWrapper padding="1.5rem 0.5rem !important">
        <FlexBetween gap="1.5rem">
            <UserImage image={picturePath} size="32px"/>

            <InputBase
            placeholder="Add your comments..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
            }}
            />

            <IconButton onClick={() => handleSubmitComment({postId, post})}>
                <SendRounded />
            </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default InputComment