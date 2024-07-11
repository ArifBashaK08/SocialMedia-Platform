import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { PropagateLoader } from "react-spinners";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false, apiURL }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile]); // Add dependencies to useEffect

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <PropagateLoader color="#0091ff" />
      </Box>
    );
  }

  return (
    <>
      {posts.map(
        ({
          _id, userId, firstName,
          lastName, description, location,
          imgLink, fileLink, likes, comments
        }) => (
          <PostWidget
            apiURL={apiURL}
            key={"key-" + _id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            postDescription={description}
            location={location}
            imgLink={imgLink}
            fileLink={fileLink}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
