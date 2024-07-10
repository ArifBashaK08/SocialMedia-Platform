import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { PropagateLoader } from "react-spinners"
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile=false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);
    const [loading, setLoading] = useState(false)


    const getPosts = async () => {
        
    const response = await fetch(`https://vibes-teal.vercel.app/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`https://vibes-teal.vercel.app/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
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
        )
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
                        key={"key-"+_id}
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
