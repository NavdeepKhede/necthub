import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        image && 
            <>
                <Box width={size} height={size}>
                <img 
                    src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
                    width={size}
                    height={size} 
                    alt="user" 
                    style={{ objectFit: "cover", borderRadius: "50%"}}
                />
            </Box>
            </>
        
    )
};

export default UserImage;