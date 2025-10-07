import React, { useContext, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import FileUploadDialog from "../components/FileUploadDialog";
import { uploadPdfAnonymous, uploadPdfAuthenticated } from "../Utils/Api.utils";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router";
import colors from "../assets/colors";

const UploadPage = () => {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const { setSessionId, jwtToken, setProjectId } = useContext(userContext);

  const navigate = useNavigate();
  const { project_id } = useParams();

  const handleUploadPdfAnonymous = async () => {
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      const response = await uploadPdfAnonymous(formData);
      if (response) {
        response?.session_id && setSessionId(response?.session_id);
        response?.project_id && setProjectId(response?.project_id);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleFileUploadAuthenticated = async () => {
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      formData.append("project_id", project_id);
      const response = await uploadPdfAuthenticated(formData, project_id);
      if (response) {
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FileUploadDialog
          open={open}
          onClose={() => setOpen(false)}
          setFile={setFile}
          file={file}
          handlePdfUpload={
            jwtToken ? handleFileUploadAuthenticated : handleUploadPdfAnonymous
          }
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "5rem",
          right: "2rem",
        }}
      >
        <Button
          sx={{
            backgroundColor: colors.green,
            color: "#fff",
            width: "180px",
            borderRadius: "12px",
            px: 4,
            py: 1,
            boxShadow: 3,
            "&:hover": { backgroundColor: "#059669" },
          }}
          onClick={() => navigate("/ReviewExtracted")}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UploadPage;
