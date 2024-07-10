import { Box, Typography, useTheme } from "@mui/material"
import { Friend, WidgetWrapper } from "../../components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../state"

const FriendsListWidget = ({ id }) => {

    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium

    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const friends = useSelector(state => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(`http://localhost:3001/users/${id}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <WidgetWrapper>
            <Typography
                color={dark}
                variant="h4"
                fontWeight={700}
                sx={{
                    mb: "1.5rem"
                }}
            >Friends</Typography>
            <Typography
                color={dark}
                variant="h5"
                fontWeight={500}
                sx={{
                    mb: "1.5rem"
                }}
            >
                <Box display={"flex"}
                    flexDirection={"column"}
                    gap={"1.5rem"}>
                    {friends.length > 0 ? friends.map(({ _id, firstName, lastName, occupation, imgLink }, index) => (
                        <Friend key={index}
                            friendId={_id}
                            name={`${firstName} ${lastName}`}
                            subtitle={occupation}
                            userImgLink={imgLink}
                        />
                    )) : <Typography
                        color={medium}
                        variant="h5"
                        fontWeight={600}
                        textAlign={"center"}
                        sx={{
                            mb: "1.5rem"
                        }}
                    >No friends found :(</Typography>}
                </Box>

            </Typography>
        </WidgetWrapper>
    )
}
export default FriendsListWidget