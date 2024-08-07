import { Box, useMediaQuery } from "@mui/material"
import { FriendsListWidget, Navbar } from "."
import { useSelector } from "react-redux"
import { UserWidgets, MyPostWidget, PostsWidget, AdWidget } from "."
import { useEffect } from "react"
export const serverURL = import.meta.env.VITE_API_URL || "http://localhost:3002"

const Homepage = ({title}) => {
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)")
  const { _id, imgLink } = useSelector(state => state.user)

useEffect(() => {
document.title = `Home | ${title}`
}, [])

  return <Box>
    <Navbar title={"Vibes.com"} />
    <Box width={"100%"} padding={"2rem 6rem"} display={isNotMobileScreen ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between">
      <Box flexBasis={isNotMobileScreen ? "26%" : undefined}>
        <UserWidgets id={_id} image={imgLink} apiURL = {serverURL}/>
      </Box>
      <Box
        flexBasis={isNotMobileScreen ? "42%" : undefined}
        mt={isNotMobileScreen ? undefined : "2rem"}>
        <MyPostWidget image={imgLink} apiURL = {serverURL}/>
        <PostsWidget userId={_id} apiURL = {serverURL}/>
      </Box>
      {isNotMobileScreen && <Box flexBasis="26%" >
        <AdWidget />
        <Box m={"2rem 0"} />
        <FriendsListWidget id={_id} apiURL = {serverURL}/>
      </Box>}
    </Box>
  </Box>

}
export default Homepage