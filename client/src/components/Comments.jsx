import { Box, TextField, Divider } from "@mui/material"
import WidgetWrapper from "./WidgetWrapper"
import { Send } from "@mui/icons-material"

const Comments = ({ commentsActive, addComment, setAddComment }) => {
    return (
        <Box sx={{
            padding: "1rem .5rem",
            width: "60%",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: commentsActive ? "0" : "-60%",
            transition: "right 700ms ease-in-out",
            zIndex: 1000,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            boxShadow: "-10px 1px 5px rgba(0, 0, 0, 0.5)"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem"
            }}>
                <TextField
                    label="Comment"
                    onChange={(e) => setAddComment(e.target.value)}
                    value={addComment}
                    name="addComment"
                    fullWidth
                />
                <Send sx={{ fontSize: '1.5rem',
                    cursor: "pointer"
                 }} />
            </Box>
            <Box mt=".5rem">
                {commentsActive.map((comment, i) => (
                    <Box key={`${name}-${i}`}>
                        <Divider />
                        <Typography
                            sx={{
                                color: main,
                                m: ".5rem 0",
                                pl: "1rem",
                                overflowY: "scroll"
                            }}
                        >
                            {comment}
                        </Typography>
                    </Box>
                ))}
                <Divider />
            </Box>
        </Box>
    )
}
export default Comments