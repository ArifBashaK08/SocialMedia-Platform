import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../../state";
import PostWidget from "./PostWidget";
import { PropagateLoader } from "react-spinners";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false, apiURL }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); // Adjust according to your slice name
  const token = useSelector((state) => state.token); // Adjust according to your slice name
  const loading = useSelector((state) => state.loading); // Adjust according to your slice name


const getPosts = async () => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${apiURL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API URL: ", apiURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUserPosts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${apiURL}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user posts: ${response.status} ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      } else {
        throw new Error("Received non-JSON response");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile]);

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
