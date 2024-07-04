import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);
    const LINK = "http://localhost:3001";

    const getPosts = async () => {
        const response = await fetch(`${LINK}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${LINK}/posts/user/${userId}`, {
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
    }, [isProfile, userId, token]); // Add dependencies to useEffect

    return (
        <>
            {posts.map(({
                _id, userId, firstName,
                lastName, description, location,
                imgLink, fileLink, likes, comments
            }) => (
                <PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    postDescription={description}
                    postLocation={location}
                    imgLink={imgLink}
                    fileLink={fileLink}
                    likes={likes}
                    comments={comments}
                />
            ))}
        </>
    );
};

export default PostsWidget;
