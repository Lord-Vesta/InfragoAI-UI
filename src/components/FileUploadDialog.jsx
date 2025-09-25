import React from "react";
import {

  DialogTitle,
  DialogContent,
  DialogActions,

  Typography,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadDialog = ({ open, onClose }) => {
  return (
    <Paper
      open={open}
      onClose={onClose}
      maxWidth="xs"
      bgcolor={"#FFFFFF"}
      elevation={3}
      sx={{borderRadius: 4}}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 0,
        }}
      >
        <Typography variant="h6">PDF Upload</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Add your documents here, and you can upload up to 5 files max
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            border: "2px dashed #2fd6a7",
            borderRadius: 3,
            p: 3,
            textAlign: "center",
            mb: 2,
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: "#2fd6a7", mb: 1 }} />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Drag your file(s) to start uploading
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              color: "#2fd6a7",
              borderColor: "#2fd6a7",
              mb: 1,
            }}
          >
            Browse files
          </Button>
        </Paper>
        <Typography variant="caption" color="text.secondary">
          Only support .jpg, .png and .svg and zip files
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "end", px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2,color:'#6D6D6D',borderColor:'#CECECE' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#0FB97D", borderRadius: 2 }}
        >
          Next
        </Button>
      </DialogActions>
    </Paper>
  );
};

export default FileUploadDialog;
