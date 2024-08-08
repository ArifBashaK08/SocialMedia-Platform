import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween, WidgetWrapper } from "../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import { Friend } from "../../components";
import Comments from "../../components/Comments";

const PostWidget = ({
  apiURL,
  postId,
  postUserId,
  name,
  postDescription,
  location,
  imgLink,
  fileLink,
  likes = {},
  comments = [],
  createdAt
}) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const [addComment, setAddComment] = useState("")
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const patchLike = async () => {
    try {
      const response = await fetch(`${apiURL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper sx={{
      m:"2rem 0",
      position:"relative"
    }}>
      <Friend
        apiURL={apiURL}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userImgLink={imgLink}
        createdAt={createdAt}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {postDescription}
      </Typography>
      {fileLink && (
        <img
          width="100%"
          height="auto"
          src={fileLink}
          alt="Post"
          style={{ borderRadius: ".75rem", marginTop: ".75rem" }}
        />
      )}
      <FlexBetween mt=".25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap=".3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap=".3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Comments commentsActive={comments} addComment={addComment} setAddComment={setAddComment} />
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
