import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import FileUploadDialog from "../components/FileUploadDialog";

const UploadPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FileUploadDialog open={open} onClose={() => setOpen(false)} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Paper sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Typography
            variant="button"
            sx={{
              px: 4,
              py: 1.5,
              display: "block",
              color: "#fff",
              bgcolor: "#818181",
              borderRadius: 2,
            }}
          >
            Next
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default UploadPage;
