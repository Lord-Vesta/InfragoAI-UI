import React, { useContext, useState } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import AlertTooltip from "./Tooltip";
import { userContext } from "../context/ContextProvider";

const FileUploadDialog = ({
  open,
  onClose,
  setFile,
  file,
  handlePdfUpload,
  isExtracting,
  extractionComplete,
  handleNext,
  setUploadedProjectId,
  uploadedProjectId,
  fetchExtractedData,
  projectStatus,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { jwtToken } = useContext(userContext);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleCancelUploadFile = () => {
    setFile(null);
    if (setUploadedProjectId) setUploadedProjectId(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Only PDF files are supported!");
    }
  };

  return (
    <Paper
      open={open}
      onClose={onClose}
      maxWidth="xs"
      bgcolor="#FFFFFF"
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
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            fontSize="20px"
            lineHeight="28px"
            fontFamily="Inter"
          >
            PDF Upload
          </Typography>
          {projectStatus <= 10 && (
            <Typography
              variant="body2"
              sx={{ color: "#6D6D6D", fontWeight: 400, fontSize: "14px" }}
            >
              Add your document here
            </Typography>
          )}
        </Box>
      </DialogTitle>

      {projectStatus <= 10 && (
        <DialogContent sx={{ p: 0 }}>
          {isExtracting === "loading" && (
            <Alert
              severity="info"
              sx={{
                width: "100%",
                py: 4,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Extraction can take up to 1 minute. Please wait...
            </Alert>
          )}
          {isExtracting === "uploading" && (
            <Alert severity="info" sx={{ width: "100%", py: 4, textAlign: "center", fontWeight: 500 }}>
              Uploading your PDF...
            </Alert>
          )}
          {isExtracting === "failed" && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                py: 4,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              PDF extraction failed. Please try again.
            </Alert>
          )}
          {isExtracting === "success" && extractionComplete && (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                py: 4,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              PDF extraction completed successfully!
            </Alert>
          )}
          {isExtracting === "idle" && !extractionComplete && (
            <Paper
              variant="outlined"
              sx={{
                border: `2px dashed ${isDragging ? "#0FB97D" : "#2fd6a7"}`,
                borderRadius: "8px",
                p: "24px",
                textAlign: "center",
                transition: "0.2s",
                backgroundColor: isDragging ? "rgba(15,185,125,0.05)" : "#fff",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: "#2fd6a7" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
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
                  {isDragging
                    ? "Drop your file here..."
                    : "Drag your file(s) to start uploading"}
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
                    sx={{ mx: 2, color: "#0B0B0B", fontSize: "14px" }}
                  >
                    or
                  </Typography>
                  <Box sx={{ height: 2, bgcolor: "#CECECE", width: "80px" }} />
                </Box>

                <input
                  type="file"
                  accept=".pdf"
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
          )}
        </DialogContent>
      )}

      {!isExtracting && !extractionComplete && (
        <Typography variant="caption" color="#6D6D6D">
          Only supports PDF files
        </Typography>
      )}

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
                  ? `${(file.size / 1024).toFixed(1)} KB`
                  : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
              </Typography>
            </Box>
          </Box>
          <AlertTooltip
            title={
              isExtracting === "loading" ? (
                <Typography
                  sx={{ fontSize: 12, fontWeight: 500, color: "#4B555F" }}
                >
                  Cannot delete while extracting
                </Typography>
              ) : (
                ""
              )
            }
            type="success"
          >
            <span>
              {projectStatus <= 10 && (
                <IconButton
                  onClick={handleCancelUploadFile}
                  size="small"
                  disabled={isExtracting === "loading"}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </span>
          </AlertTooltip>
        </Box>
      )}

      <DialogActions sx={{ justifyContent: "end", px: 0, py: 0 }}>
        <Button
          variant="contained"
          sx={{
            background: "#0FB97D",
            borderRadius: "8px",
            color: "#fff",
            minWidth: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            disabled:
              (!file && !extractionComplete) || isExtracting === "loading",
            "&:hover": {
              backgroundColor: "#0FB97D",
            },
          }}
          disabled={
            (!file && !extractionComplete) || isExtracting === "loading"
          }
          onClick={
            jwtToken
              ? isExtracting === "failed"
                ? () => fetchExtractedData(uploadedProjectId)
                : isExtracting === "idle" && projectStatus === 0
                ? handlePdfUpload
                : projectStatus === 0
                ? handlePdfUpload
                : projectStatus === 10
                ? () => fetchExtractedData(uploadedProjectId)
                : handleNext
              : isExtracting === "failed"
              ? () => fetchExtractedData(uploadedProjectId)
              : isExtracting === "idle"
              ? handlePdfUpload
              : handleNext
          }
        >
          {isExtracting === "loading" ? (
            <>
              <CircularProgress size={18} sx={{ color: "#fff" }} />
              Extracting...
            </>
          ) : jwtToken ? (
            isExtracting === "failed" ? (
              "Retry Extraction"
            ) :isExtracting==="uploading"?(<>
              <CircularProgress size={18} sx={{ color: "#fff" }} />
              Uploading...
            </>): isExtracting === "idle" && projectStatus === 0 ? (
              "Upload & Extract"
            ) : projectStatus === 0 ? (
              "Upload & Extract"
            ) : projectStatus === 10 ? (
              "Extract"
            ) : (
              "Next"
            )
          ) : isExtracting === "failed" ? (
            "Retry Extraction"
          ) : isExtracting === "idle" ? (
            "Upload & Extract"
          ) : (
            "Next"
          )}
        </Button>
      </DialogActions>
    </Paper>
  );
};

export default FileUploadDialog;
