import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../components/Form";
import { useEffect } from "react";

const Loginpage = ({ title }) => {
  const theme = useTheme();
  const isNotMobileScreen = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    document.title = `User authentication | ${title}`
  }, [])

  return (
    <Box
      sx={{
        overflow: "auto",
        backgroundImage: `linear-gradient(184deg, rgba(0, 255, 230, 1) 0%, rgba(7, 58, 187, 1) 100%)`,
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
        <Typography variant="h2"
          style={{
            cursor: "pointer",
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(90deg, rgba(31, 17, 206, 1) 0%, rgba(229, 43, 43, 1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
          {title}
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
