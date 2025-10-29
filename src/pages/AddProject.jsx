import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  DialogContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import CustomTextField from "../components/TextField";

const AddProject = ({ handleClose, handleAddProject, existingProjects = [] }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const name = projectName.trim().toLowerCase();

    if (!projectName.trim()) {
      setError("");
      return;
    }

    if (projectName.length > 200) {
      setError("Project name cannot exceed 200 characters.");
      return;
    }

    const duplicate = existingProjects.some(
      (p) => p.name.trim().toLowerCase() === name
    );

    if (duplicate) {
      setError("A project with this name already exists.");
    } else {
      setError("");
    }
  }, [projectName, existingProjects]);

  const handleSubmit = async () => {
    if (!projectName.trim() || error) return;

    setLoading(true);
    try {
      await handleAddProject(projectName.trim());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
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
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Add New Project
        </Typography>

        <DialogContent sx={{ textAlign: "center", position: "relative", pt: 4 }}>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <CustomTextField
              label="Project Name"
              placeholder="Enter Project Name"
              onChange={(e) => setProjectName(e.target.value)}
              size="small"
              width="100%"
              disableOnBlur={false}
              required
              value={projectName}
              disabled={loading} 
            />
            {/* <Typography
              variant="caption"
              color={projectName.length > 200 ? "error" : "text.secondary"}
              textAlign="right"
              sx={{ mt: -1 }}
            >
              {projectName.length}/200
            </Typography> */}
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                fontSize: "0.85rem",
                mb: 2,
                borderRadius: "6px",
                textAlign: "left",
              }}
            >
              {error}
            </Alert>
          )}

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
              disabled={loading}
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
                bgcolor: error || !projectName.trim() ? "#A5D6A7" : "#0FB97D",
                "&:hover": {
                  bgcolor:
                    error || !projectName.trim() ? "#A5D6A7" : "#0ca76f",
                },
              }}
              disabled={!!error || !projectName.trim() || loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
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
