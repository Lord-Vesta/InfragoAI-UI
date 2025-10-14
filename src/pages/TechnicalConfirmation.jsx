import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import ReviewExtracted from "./ReviewExtracted";
import QualificationInputs from "./QualificationInputs";
import { getQualificationInputs, getExtractedInputs } from "../Utils/Api.utils";
import { useParams } from "react-router";

const TechnicalConfirmation = () => {
  const [activeTab, setActiveTab] = useState("extracted");
  const [qualificationData, setQualificationData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const { project_id } = useParams();
  const [loading, setLoading] = useState(false);

  // Function to fetch extracted data
  const fetchExtractedData = async () => {
    setLoading(true);
    try {
      const res = await getExtractedInputs(project_id);
      setExtractedData(res);
    } catch (err) {
      console.error("Error fetching extracted inputs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch qualification data
  const fetchQualificationData = async () => {
    setLoading(true);
    try {
      const res = await getQualificationInputs(project_id);
      setQualificationData(res);
    } catch (err) {
      console.error("Error fetching qualification inputs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load: fetch extracted data automatically
  useEffect(() => {
    fetchExtractedData();
  }, []);

  // Button click handlers
  const handleExtractedClick = () => {
    setActiveTab("extracted");
    fetchExtractedData();
  };

  const handleUserInputClick = () => {
    setActiveTab("userInput");
    fetchQualificationData();
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={3} position="relative">
      <Typography fontWeight="600" fontSize={24} color={colors.black_text}>
        Confirm Technical & Financial Details
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            "& button": {
              backgroundColor: activeTab === "extracted" ? colors.green : "#E0E0E0",
              color: activeTab === "extracted" ? "#fff" : "#333",
            },
          }}
        >
          <CustomButton label="Extracted Data" onClick={handleExtractedClick} />
        </Box>

        <Box
          sx={{
            "& button": {
              backgroundColor: activeTab === "userInput" ? colors.green : "#E0E0E0",
              color: activeTab === "userInput" ? "#fff" : "#333",
            },
          }}
        >
          <CustomButton label="User Input Data" onClick={handleUserInputClick} />
        </Box>
      </Box>

      {/* Render content based on active tab */}
      <Box mt={2}>
        {loading && <Typography>Loading...</Typography>}
        {!loading && activeTab === "extracted" && (
          <ReviewExtracted height="70vh" extractedData={extractedData} />
        )}
        {!loading && activeTab === "userInput" && (
          <QualificationInputs height="70vh" initialData={qualificationData} />
        )}
      </Box>
    </Box>
  );
};

export default TechnicalConfirmation;
