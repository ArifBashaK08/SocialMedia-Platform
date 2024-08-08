import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import moment from "moment";

const Friend = ({ friendId, name, userImgLink, apiURL, createdAt, hideTime }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends || []);

  const isFriend = friends.some((friend) => friend._id === friendId);

  const patchFriend = async () => {
    try {
      const response = await fetch(`${apiURL}/users/${userId}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to patch friend. HTTP status ${response.status}`);
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error patching friend:", error);
      // Handle error as needed
    }
  };

  return (
    <FlexBetween gap="1rem">
      <FlexBetween gap="1rem">
        <UserImage image={userImgLink} size="60px" />
        <Box
          onClick={() => navigate(`/profile/${friendId}`)}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            variant="h5"
            sx={{
              color: main,
              fontWeight: 500,
              "&:hover": {
                color: palette.primary.light,
              },
            }}
          >
            {name}
          </Typography>
          <Typography sx={{
            color: medium,
            fontSize: ".75rem"
          }}>
            {!hideTime && moment(createdAt).fromNow()}
          </Typography>
        </Box>
      </FlexBetween>
      {userId !== friendId ? (
        <IconButton
          onClick={patchFriend}
          sx={{
            bgcolor: primaryLight,
            p: "0.6rem",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
        <IconButton>
          <MoreVertIcon sx={{ color: primaryDark }} />
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
