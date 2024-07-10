import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Navbar, FriendsListWidget, MyPostWidget, PostsWidget, UserWidgets } from "."
import { PropagateLoader } from "react-spinners"
import { serverURL } from "./Homepage"

const Profilepage = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const token = useSelector(state => state.token)
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)")
  const { userid } = useParams()

  const getUser = async () => {
    const response = await fetch(`${serverURL}/users/${userid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true)
      await getUser()
      setLoading(false)
    }
    getUserData()
  }, [userid])

  useEffect(() => {
    if (user) {
      const name = `${user.firstName} ${user.lastName}`
      document.title = `${name} | Profile - Vibes.com`
    }
  }, [user])

  if (loading || !user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <PropagateLoader color="#0091ff" />
      </Box>
    )
  }

  return (
    <Box>
      <Navbar title={"Vibes.com"} />
      <Box width={"100%"}
        padding={"2rem 6rem"}
        display={isNotMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center">
        <Box flexBasis={isNotMobileScreen ? "26%" : undefined}>
          <UserWidgets apiURL={serverURL} id={userid} image={user.imgLink} />
          <Box m={"2rem 0"} />
          <FriendsListWidget id={userid} />
        </Box>

        <Box
          flexBasis={isNotMobileScreen ? "42%" : undefined}
          mt={isNotMobileScreen ? undefined : "2rem"}>
          <MyPostWidget image={user.imgLink} />
          <Box m={"2rem 0"} />
          <PostsWidget userId={userid} isProfile />
        </Box>
      </Box>
    </Box>
  )
}
export default Profilepage
