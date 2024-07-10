import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { setFriends } from "../state"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"

const Friend = ({ friendId, name, subtitle, userImgLink, apiURL }) => {
    const { palette } = useTheme()
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector(state => state.user._id)
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token)
    const friends = user ? user.friends : [];

    let isFriend = false;

    if (Array.isArray(friends)) {
        isFriend = friends.find(friend => {
            return friend._id === friendId;  // Ensure to return a boolean
        });
    }
    const patchFriend = async () => {
        const response = await fetch(`${apiURL}/users/${id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()
        dispatch(setFriends({ friends: data }))
    }

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userImgLink} size={"60px"} />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`)
                        navigate(0)
                    }}>
                    <Typography color={main} variant="h5"
                        fontWeight={500}
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}>{name}</Typography>
                    <Typography color={medium}
                        fontSize={".75rem"}>{subtitle}</Typography>
                </Box>
            </FlexBetween>
            {id !== friendId ?
                <IconButton onClick={() => patchFriend()}
                    sx={{
                        bgcolor: primaryLight,
                        p: "0.6rem"
                    }}>
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) :
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    }
                </IconButton>
                : <IconButton>
                    <MoreVertIcon sx={{ color: primaryDark }} />
                </IconButton>
            }
        </FlexBetween>
    )
}
export default Friend