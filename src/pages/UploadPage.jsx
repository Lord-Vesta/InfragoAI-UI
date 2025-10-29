import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import FileUploadDialog from "../components/FileUploadDialog";
import {
  uploadPdfAnonymous,
  uploadPdfAuthenticated,
  getExtractedData,
  getProjectById,
  updateProjectStatus,
} from "../Utils/Api.utils";
import { toast } from "react-toastify";
import { userContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router";

const UploadPage = () => {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [uploadedProjectId, setUploadedProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState("idle");
  const [projectStatus, setProjectStatus] = useState(0);

  const { setSessionId, jwtToken, setProjectId } = useContext(userContext);
  const navigate = useNavigate();
  const { project_id } = useParams();

  const fetchExtractedData = async (projId) => {
    setIsExtracting("loading");
    try {
      const response = await getExtractedData(projId || project_id);
      if (response) {
        setIsExtracting("success");
        toast.success("Extracted data fetched successfully");

        const projectResponse = await updateProjectStatus(
          {
            completion_percentage: 20,
            project_status: "in progress",
          },
          projId || project_id
        );
        setProjectStatus(projectResponse?.completion_percentage);
      } else {
        setIsExtracting("failed");
        toast.error("Failed to fetch extracted data");
      }
    } catch (error) {
      setIsExtracting("failed");
      toast.error("Failed to fetch extracted data");
      console.error(error);
    }
  };

  const handlePdfUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);
    try {
      setIsExtracting("uploading");
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
        const projectResponse = await updateProjectStatus(
          {
            completion_percentage: 10,
            project_status: "in progress",
          },
          response.project_id || project_id
        );
        setProjectStatus(projectResponse?.completion_percentage);

        const targetProjectId = project_id || response.project_id;
        if (targetProjectId) await fetchExtractedData(targetProjectId);
      }
    } catch (error) {
      setIsExtracting("upload_failed");
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
        setProjectStatus(response?.completion_percentage);
        if (response?.pdf_file_name && response?.pdf_file_size) {
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
          extractionComplete={
            (isExtracting === "success" || isExtracting === "failed") &&
            uploadedProjectId
          }
          handleNext={() =>
            navigate(`/ReviewExtracted/${project_id || uploadedProjectId}`)
          }
          setUploadedProjectId={setUploadedProjectId}
          uploadedProjectId={uploadedProjectId}
          fetchExtractedData={fetchExtractedData}
          projectStatus={projectStatus}
        />
      </Box>
    </Box>
  );
};

export default UploadPage;
