import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../components/Form";
import {bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10} from "../assets/login"

const Loginpage = ({ title }) => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");
  const loginBg = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
  const randomBg = Math.floor(Math.random() * loginBg.length);

  return (
    <Box
      sx={{
        overflow: "auto",
        backgroundImage: `url(${loginBg[randomBg]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Box className="glass-effect"
        sx={{
          background: "transparent",
          backdropFilter: "blur(50px)",
          borderBottom: ".5px solid gray",
        }}
        width="100%"
        padding="1rem 6%"
        // bgcolor={theme.palette.background.alt}
        textAlign="center"
      >
        <Typography>
          <h1 style={{
            cursor: "pointer",
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 33%, rgba(255, 69, 56, 1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {title}
          </h1>
        </Typography>
      </Box>
      <Box
        className="glass-effect"
        width={isNotMobileScreen ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ marginBottom: "1.5rem" }}>
          Welcome to {title}, the Social Media to share your vibes.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Loginpage;
