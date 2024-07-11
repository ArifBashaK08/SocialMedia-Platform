import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  ConnectWithoutContactOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { UserImage, FlexBetween, WidgetWrapper } from "../../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidgets = ({ id, image, apiURL }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const friendCount = useSelector((state) => state.user?.friends?.length || 0);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`${apiURL}/users/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id, friendCount]);

  if (!user) return null;

  const { firstName, lastName, email, occupation, location, friends, profileViews, impressions } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem" pb="1rem" onClick={() => navigate(`/profile/${id}`)}>
        {/* 1st Row */}
        <FlexBetween gap="1rem">
          <UserImage image={image || "default-profile.png"} size="60px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight={500}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* 2nd Row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
          <ConnectWithoutContactOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{email}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* 3rd Row */}
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Who's viewed your profile?</Typography>
          <Typography color={main} fontWeight={500}>{profileViews}</Typography>
        </FlexBetween>
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Impressions on your posts</Typography>
          <Typography color={main} fontWeight={500}>{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* 4th Row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight={500} mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="Twitter" />
            <Box>
              <Typography color={main} fontWeight={500}>Twitter</Typography>
              <Typography color={medium} fontWeight={500}>Social Networking</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="LinkedIn" />
            <Box>
              <Typography color={main} fontWeight={500}>LinkedIn</Typography>
              <Typography color={medium} fontWeight={500}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgets;
