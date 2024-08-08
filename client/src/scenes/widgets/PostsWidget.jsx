import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../../state";
import PostWidget from "./PostWidget";
import { Box } from "@mui/material";
import { PropagateLoader } from "react-spinners";

const PostsWidget = ({ userId, isProfile = false, apiURL }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const loading = useSelector(state => state.loading);

  const getPosts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${apiURL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
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
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      dispatch(setLoading(false));
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
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
  }, [isProfile]);


  return (
    <>
      {loading &&
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}>
          <PropagateLoader color="#0091ff" />
        </Box>
      }
      {posts && posts.length > 0 ? posts.map(
        ({
          _id, userId, firstName,
          lastName, description, location,
          imgLink, fileLink, likes, comments, createdAt
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
            createdAt={createdAt}
          />
        )
      ) : isProfile && (
        <>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "2rem",
            color: "gray",
            height: "20rem"
          }}>
            No posts to dispaly!
          </Box>
        </>
      )}
    </>
  );
};

export default PostsWidget;
