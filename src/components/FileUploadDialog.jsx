import React, { useState } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import CancelIcon from "@mui/icons-material/Cancel";

const FileUploadDialog = ({ open, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // only single file
    if (selectedFile) setFile(selectedFile);
  };

  const handleCancelUploadFile = () => {
    setFile(null);
  };
  return (
    <Paper
      open={open}
      onClose={onClose}
      maxWidth="xs"
      bgcolor={"#FFFFFF"}
      elevation={3}
      sx={{
        borderRadius: "16px",
        padding: "24px",
        width: "31rem",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            fontSize={"20px"}
            lineHeight={"28px"}
            fontFamily={"Inter"}
          >
            PDF Upload
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6D6D6D", fontWeight: 400, fontSize: "14px" }}
          >
            Add your documents here, you can upload up to 5 files max
          </Typography>
        </Box>

        <IconButton onClick={onClose} size="24px">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Paper
          variant="outlined"
          sx={{
            border: "2px dashed #2fd6a7",
            borderRadius: "8px",
            p: "24px",
            textAlign: "center",
            gap: "12px",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 40, color: "#2fd6a7" }} />
          <Box
            sx={{
              gap: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#0B0B0B",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Drag your file(s) to start uploading
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                my: 1,
                justifyContent: "center",
              }}
            >
              <Box sx={{ height: 2, bgcolor: "#CECECE", width: "80px" }} />
              <Typography
                variant="body2"
                sx={{
                  mx: 2,
                  color: "#0B0B0B",
                  fontWeight: 400,
                  fontSize: "14px",
                  fontFamily: "Inter",
                }}
              >
                or
              </Typography>
              <Box sx={{ height: 2, bgcolor: "#CECECE", width: "80px" }} />
            </Box>

            <input
              type="file"
              accept=".jpg,.png,.svg,.zip"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload-input"
            />
            <label htmlFor="file-upload-input">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  borderRadius: "8px",
                  color: "#0FB97D",
                  borderColor: "#0FB97D",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                Browse file
              </Button>
            </label>
          </Box>
        </Paper>
      </DialogContent>
      <Typography variant="caption" color="#6D6D6D">
        Only support .jpg, .png and .svg and zip files
      </Typography>
      {file && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: 1,
            borderColor: "#E7E7E7",
            borderRadius: "12px",
            p: "12px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FolderZipIcon sx={{ fontSize: 40, color: "#2fd6a7" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="caption" color="#6D6D6D">
                {file.name}
              </Typography>
              <Typography variant="caption" color="#6D6D6D">
                {file.size / 1024 / 1024 < 1
                  ? `${file.size / 1024} KB`
                  : `${file.size / 1024 / 1024} MB`}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCancelUploadFile} size="24px">
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <DialogActions sx={{ justifyContent: "end", px: 0, py: 0 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: "8px", color: "#6D6D6D", borderColor: "#CECECE" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#0FB97D", borderRadius: "8px", color: "#fff" }}
        >
          Next
        </Button>
      </DialogActions>
    </Paper>
  );
};

export default FileUploadDialog;
