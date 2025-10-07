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
import Person from "../assets/Person.png";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import tableImg from "../assets/tableImg.jpg";
import AddProject from "./AddProject.jsx";
import { getProjects } from "../Utils/Api.utils.js";
import { createProject } from "../Utils/Api.utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Profile = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const handleAddProject = async (projectName) => {
    const data = { name: projectName };
    try {
      await createProject(data);
      toast.success("Project created successfully");
      fetchProjects();
      setOpenPopup(false);
    } catch (error) {
      toast.error("Error creating project:", error);
    }
    // handleClose();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      if (response?.length > 0) {
        setProjects(response);
      } else {
        toast.info("No projects found.", {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch projects. Please try again.", {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  const statusColors = {
    working: { bg: "#1E3A8A", color: "#fff" },
    completed: { bg: "#0FB97D", color: "#fff" },
    pending: { bg: "#9E9E9E", color: "#fff" },
  };

  return (
    <Box
      sx={{
        height: "85vh",
        width: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", height: 190, flexShrink: 0 }}>
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
            onClick={() => setOpenPopup(true)}
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
          display: "flex",
          flexDirection: "column",
          overflowY: "hidden",
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
            {/* <Button
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
            </Button> */}
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ px: 2, overflowY: "auto" }}>
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
            <TableBody sx={{ overflowY: "auto" }}>
              {projects.map((p) => (
                <TableRow
                  key={p.project_id}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #F0F0F0",
                      py: 1.5,
                      color: "#000000",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/upload/${p.project_id}`)}
                >
                  {/* Company + Avatar */}
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <img
                        src={tableImg}
                        alt="company"
                        style={{ borderRadius: "50%", width: 32, height: 32 }}
                      />
                      <Typography fontSize={12}>{p.name}</Typography>
                    </Box>
                  </TableCell>

                  {/* Lorem */}
                  <TableCell sx={{ fontSize: "12px" }}>lorem</TableCell>

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
                        {p.completion_percentage}%
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
      {openPopup && (
        <AddProject
          handleClose={() => setOpenPopup(false)}
          handleAddProject={handleAddProject}
        />
      )}
    </Box>
  );
};

export default Profile;
