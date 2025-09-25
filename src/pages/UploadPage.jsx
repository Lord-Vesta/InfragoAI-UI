import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
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
        <FileUploadDialog open={open} onClose={() => setOpen(false)} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            display: "block",
            color: "#fff",
            bgcolor: "#818181",
            borderRadius: "12px",
            width: "10rem",
            alignContent: "center",
            fontSize:'10px',
            height:'2rem'
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UploadPage;
