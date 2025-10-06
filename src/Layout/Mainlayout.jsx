import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../components/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useLocation } from "react-router";

const Mainlayout = () => {
  const location = useLocation().pathname;
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
         gap: 2,
        overflow: "hidden",
      }}
    >
      <Sidebar/>
      {location === "/profile" ? (

        <Box
          sx={{
            height: "95%",
            //   margin: "2rem",
            width: "100%",
            // overflow:'auto'
          }}
        >
          <Box
            sx={{
              flex: 1,

              mb: "1.5rem",
              mr: "2rem",
            }}
          >
            <Outlet />
          </Box>
        </Box>

          ) : (
      <Box
        sx={{
          height: "95%",
          width: "100%",
          bgcolor: "#F8F8F8",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "2rem",
            mx: "2rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src="https://randomuser.me/api/portraits/women/44.jpg"
              sx={{ width: 20, height: 20, mr: 2 }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                fontSize={"16px"}
              >
                Project Name/{" "}
                <span style={{ color: "#6D6D6D", fontSize: "14px" }}>
                  Upload
                </span>
              </Typography>
              <IconButton size="small" sx={{ ml: 1, color: "#0FB97D" }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "100px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
                width: "200px",
                height: "35px",
                border: 0.5,
                borderColor: "#6D6D6D",
                bgcolor: "#fff",
              }}
            >
              <IconButton>
                <SearchIcon fontSize="small" />
              </IconButton>
              <InputBase
                placeholder="Type here..."
                sx={{
                  flex: 1,
                  fontSize: "14px",
                  color: "#6D6D6D",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton>
                <SettingsIcon
                  sx={{ color: "#0FB97D", width: "16px", height: "16px" }}
                />
              </IconButton>
              <IconButton>
                <NotificationsIcon
                  sx={{ color: "#0FB97D", width: "16px", height: "16px" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            ml: "70px",
            mt: "2rem",
            mb: "1.5rem",
            mr: "2rem",
          }}
        >
          <Outlet />
        </Box>
      </Box>
          )}
    </Box>
  );
};

export default Mainlayout;
