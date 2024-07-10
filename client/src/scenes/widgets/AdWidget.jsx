import { Typography, useTheme } from "@mui/material"
import { FlexBetween, WidgetWrapper } from "../../components"
import udemyLogo from "/assets/logo-udemy.svg"

const AdWidget = () => {

    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    let description = "Are you ready to elevate your skills and career? Join millions of learners on Udemy, the world’s leading online learning platform. With over 155,000 courses taught by expert instructors, Udemy offers a wide range of topics from coding and business to personal development and art."

    return (
        <WidgetWrapper style={{background: `#131842`}}>
            <FlexBetween>
                <Typography color={dark} variant="h5"
                    fontWeight={500}>
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img src={udemyLogo} 
            alt="Advertisement" width={"30%"} 
            height={"auto"}
            style={{
                margin:".75rem"
            }}/>
            <FlexBetween>
                <Typography color={main} fontWeight={"600"}>Want to build skills? Check-out in Udemy
                Unlock Your Potential with Udemy!
                </Typography>
                <a style={{color: `${medium}`, fontWeight:"700"} } 
                target="_blank"               
                href="https://udemy.com">udemy.com</a>
            </FlexBetween>
                <Typography color={medium} m={".5rem 0"}>{
                    description.length > 100 ? description + "..." : description
                    }</Typography>
        </WidgetWrapper>
    )
}
export default AdWidget