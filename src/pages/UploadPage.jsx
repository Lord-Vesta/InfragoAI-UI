import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import FileUploadDialog from "../components/FileUploadDialog";
import {
  uploadPdfAnonymous,
  uploadPdfAuthenticated,
  getExtractedData,
  downloadPdf,
  getProjectById,
} from "../Utils/Api.utils";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextProvider";
import { useNavigate, useParams, useLocation } from "react-router";
import colors from "../assets/colors";

const UploadPage = () => {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [uploadedProjectId, setUploadedProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const { setSessionId, jwtToken, setProjectId } = useContext(userContext);
  const navigate = useNavigate();
  const { project_id } = useParams();

  const fetchExtractedData = async (projId) => {
    try {
      setIsExtracting(true);
      const response = await getExtractedData(projId);
      if (response) {
        toast.success("Extracted data fetched successfully");
      }
    } catch (error) {
      toast.error("Failed to fetch extracted data");
      console.error(error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handlePdfUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pdf_file", file);

      let response;

      if (jwtToken) {
        formData.append("project_id", project_id);
        response = await uploadPdfAuthenticated(formData, project_id);
      } else {
        response = await uploadPdfAnonymous(formData);
      }

      if (response) {
        toast.success("File uploaded successfully");

        if (response.session_id) setSessionId(response.session_id);
        if (response.project_id) {
          setProjectId(response.project_id);
          setUploadedProjectId(response.project_id);
        }

        const targetProjectId = project_id || response.project_id;
        if (targetProjectId) await fetchExtractedData(targetProjectId);
      }
    } catch (error) {
      toast.error("Error uploading file");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchProjectData = async (projId) => {
    try {
      const response = await getProjectById(projId);
      if (response) {
        if (response.pdf_file_name && response.pdf_file_size) {
          setFile({
            name: response.pdf_file_name,
            size: response.pdf_file_size,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to fetch project data");
      console.error(error);
    }
  };

  useEffect(() => {
    if (project_id) {
      handleFetchProjectData(project_id);
    }
  }, [project_id]);

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
          handlePdfUpload={handlePdfUpload}
          loading={loading}
          isExtracting={isExtracting}
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
          disabled={loading || isExtracting}
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
          onClick={() =>
            navigate(`/ReviewExtracted/${project_id || uploadedProjectId}`)
          }
        >
          {"Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadPage;
