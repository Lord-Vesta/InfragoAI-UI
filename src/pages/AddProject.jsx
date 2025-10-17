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
} from "@mui/material";
import CustomTextField from "../components/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

const AddProject = ({ handleClose, handleAddProject }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = () => {
    if (!projectName.trim()) return;
    handleAddProject(projectName);
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
        zIndex: 13,
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
        <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
      >
        Add New Project
      </Typography>
        <DialogContent
          sx={{ textAlign: "center", position: "relative", pt: 4 }}
        >
          
          <Box display="flex" flexDirection="column" gap={2} mb={4}>
            <CustomTextField 
            label="Project Name"
            placeholder="Enter Project Name"
            onChange={(e) => setProjectName(e.target.value)}
             size="small"
             width="100%"
             disableOnBlur={false} 
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
              onClick={handleSubmit}
            >
              NEXT
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Box>
  );
};

export default AddProject;
