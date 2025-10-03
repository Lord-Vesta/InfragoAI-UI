import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Person from "../assets/Person.png";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import tableImg from "../assets/tableImg.jpg";
import AddProject from "./AddProject.jsx";

const Profile = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const projects = [
    {
      id: 1,
      company: "Lorem Ipsum Lorem Ipsum",
      lorem: "Lorem Ipsum",
      status: "Working",
      completion: 60,
    },
    {
      id: 2,
      company: "Lorem Ipsum Lorem Ipsum",
      lorem: "Lorem Ipsum",
      status: "Completed",
      completion: 100,
    },
    {
      id: 3,
      company: "Lorem Ipsum Lorem Ipsum",
      lorem: "Lorem Ipsum",
      status: "Pending",
      completion: 50,
    },
    {
      id: 4,
      company: "Lorem Ipsum Lorem Ipsum",
      lorem: "Lorem Ipsum",
      status: "Completed",
      completion: 100,
    },
  ];

  useEffect(() => {
    console.log(openPopup, "---------------");
    console.log("Profile page loaded");
  }, [openPopup]);

  const statusColors = {
    Working: { bg: "#1E3A8A", color: "#fff" },
    Completed: { bg: "#0FB97D", color: "#fff" },
    Pending: { bg: "#9E9E9E", color: "#fff" },
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "#0FB97D",
          borderRadius: 2,
          minHeight: 100,
          position: "relative",
        }}
      >
        <Box
          sx={{
            p: 3,
            height: 85,
            background:
              "linear-gradient(270.41deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 2px 5.5px 0px #0000001A",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            bottom: -40,
            left: 20,
            right: 20,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              style={{ width: "60px", height: "60px", borderRadius: "12px" }}
            />
            <Box>
              <Typography fontWeight="bold" sx={{ color: "#000000" }}>
                Lorem Ipsum
              </Typography>
              <Typography variant="body2" sx={{ color: "#7F7F7F" }}>
                esthera@simmmpple.com
              </Typography>
            </Box>
          </Box>

          <TextField
            placeholder="Type here..."
            variant="outlined"
            size="small"
            sx={{
              width: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                bgcolor: "white",
                "& fieldset": {
                  borderColor: "#E2E8F0",
                },
                "&:hover fieldset": {
                  borderColor: "#0FB97D",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0FB97D",
                },
              },
              "& input::placeholder": {
                fontSize: "0.9rem",
                color: "#999",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <SettingsIcon sx={{ color: "#0FB97D" }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon sx={{ color: "#0FB97D" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: "relative", height: 190, mt: 5 }}>
        <Box
          sx={{
            position: "Absolute",
            borderRadius: 2,
            minHeight: 190,
            background:
              "linear-gradient(90deg, rgba(15, 185, 125, 1) 45%, rgba(15, 185, 125, 0) 85%)",
            zIndex: 2,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#fff", px: 7, pt: 3, pb: 1 }}
          >
            Lorem Ipsum
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#fff", px: 7, width: "75%", fontWeight: 400 }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.Lorem Ipsum is simply dummy.
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#fff",
              color: "#0FB97D",
              fontSize: "17px",
              fontWeight: "bold",
              borderRadius: "15px",
              px: 9,
              py: 0.8,
              mt: 3,
              ml: 7,
              boxShadow: "none",
              "&:hover": { bgcolor: "#fff", boxShadow: "none" },
            }}
          >
            Create New <AddIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "55%",
            backgroundImage: `url(${Person})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center 15%",
            maskImage: "linear-gradient(to right, transparent 0%, black 20%)", // fade-in mask
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 20%)",
            filter: "blur(0px)", // 👈 controls how blurry the left edge looks
            zIndex: 1,
            borderRadius: 2,
          }}
        />
      </Box>

      <Box
        sx={{
          px: 3,
          pb: 3,
          backgroundColor: "#FBFBFB",
          borderRadius: 2,
          mb: 5,
          height: "380px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          pt={3}
          pb={1}
          flexShrink={0}
        >
          <Typography variant="h6" fontWeight="bold" fontSize={18}>
            Projects
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: "8px",
                px: 6,
                color: "#48BB78",
                borderColor: "#48BB78",
                textTransform: "none",
              }}
              onClick={() => setOpenPopup(true)}
            >
              Create New <AddIcon sx={{ ml: 1, fontSize: "14px" }} />
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: "8px",
                px: 4,
                color: "#929292",
                borderColor: "#929292",
                textTransform: "none",
              }}
            >
              View All
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", px: 2 }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{ "& th": { borderBottom: "none", color: "#929292" } }}
              >
                <TableCell>Companies</TableCell>
                <TableCell>Lorem</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Completion</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #F0F0F0",
                      py: 1.5,
                      color: "#000000",
                    },
                  }}
                >
                  {/* Company + Avatar */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <img
                        src={tableImg}
                        alt="company"
                        style={{ borderRadius: "50%", width: 32, height: 32 }}
                      />
                      <Typography fontSize={12}>{p.company}</Typography>
                    </Box>
                  </TableCell>

                  {/* Lorem */}
                  <TableCell sx={{ fontSize: "12px" }}>{p.lorem}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={p.status}
                      sx={{
                        bgcolor: statusColors[p.status].bg,
                        color: statusColors[p.status].color,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    />
                  </TableCell>

                  {/* Completion */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        fontSize={12}
                      >
                        {p.completion}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={p.completion}
                        sx={{
                          flex: 1,
                          height: 5,
                          borderRadius: 5,
                          bgcolor: "#E0E0E0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor:
                              p.status === "Working"
                                ? "#1E3A8A"
                                : p.status === "Completed"
                                ? "#0FB97D"
                                : "#9E9E9E",
                          },
                        }}
                      />
                    </Box>
                  </TableCell>

                  {/* Menu Icon */}
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      {openPopup && <AddProject handleClose={() => setOpenPopup(false)} />}
    </Box>
    
  );
};

export default Profile;
