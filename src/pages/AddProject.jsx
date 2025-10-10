import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

const AddProject = ({ handleClose, handleAddProject }) => {
  const [projectName, setProjectName] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = () => {
    if (!projectName.trim()) return;
    handleAddProject(projectName); // ✅ calls parent function to create project
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(1px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
      onClick={handleClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 24,
          p: 3,
        }}
      >
        <DialogContent
          sx={{ textAlign: "center", position: "relative", pt: 6 }}
        >
          {/* <Avatar
            src="https://randomuser.me/api/portraits/women/44.jpg"
            sx={{
              width: 56,
              height: 56,
              top: -28,
              left: "50%",
              transform: "translateX(-50%)",
              border: "3px solid white",
              boxShadow: 2,
            }}
          /> */}

          {/* Title */}
          {/* <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={3}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "#000000" }}
            >
              Project Name
            </Typography>
            <IconButton size="small" sx={{ ml: 1, color: "#000000" }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box> */}

          {/* Fields */}
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            <TextField
              label="Lorem Ipsum"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0.8,
                },
              }}
              onChange={(e) => setProjectName(e.target.value)}
              size="small"
              fullWidth
              required
            />
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                mr: 1,
                borderRadius: 0.5,
                textTransform: "none",
                fontWeight: "bold",
                color: "#6B7280",
                borderColor: "#D1D5DB",
              }}
              onClick={handleClose}
            >
              BACK
            </Button>
            <Button
              variant="contained"
              sx={{
                flex: 1,
                ml: 1,
                borderRadius: 0.5,
                textTransform: "none",
                fontWeight: "bold",
                bgcolor: "#0FB97D",
                "&:hover": { bgcolor: "#0ca76f" },
              }}
              disabled={btnLoading}
              onClick={() => handleAddProject(projectName, setBtnLoading)}
            >
              {btnLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "NEXT"
              )}
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Box>
  );
};

export default AddProject;
