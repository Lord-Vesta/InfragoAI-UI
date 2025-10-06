import React, { useContext, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import FileUploadDialog from "../components/FileUploadDialog";
import { uploadPdfAnonymous, uploadPdfAuthenticated } from "../Utils/Api.utils";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextProvider";

const UploadPage = () => {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const { setSessionId, jwtToken } = useContext(userContext);

  const handleUploadPdfAnonymous = async () => {
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      const response = await uploadPdfAnonymous(formData);
      console.log(response, "response----------------");
      if (response) {
        response?.session_id && setSessionId(response?.session_id);
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
      formData.append("project_id", "64b8f4f4e4b0c9b1f8e4d2a1");
      const response = await uploadPdfAuthenticated(formData);
      console.log(response, "response----------------");
      if (response) {
        response?.session_id && setSessionId(response?.session_id);
        toast.success("File uploaded successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
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
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Button
          sx={{
            display: "block",
            color: "#fff",
            bgcolor: "#818181",
            borderRadius: "12px",
            width: "10rem",
            alignContent: "center",
            fontSize: "10px",
            height: "2rem",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UploadPage;
