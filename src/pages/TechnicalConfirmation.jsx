import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import ReviewExtracted from "./ReviewExtracted";
import QualificationInputs from "./QualificationInputs";
import { getQualificationInputs } from "../Utils/Api.utils";

const TechnicalConfirmation = () => {
  const [activeTab, setActiveTab] = useState("extracted");
  const [qualificationData, setQualificationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQualificationInputs();
        setQualificationData(res);
      } catch (err) {
        console.error("Error fetching qualification inputs:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={3}
      position="relative"
    >
      <Typography fontWeight="600" fontSize={24} color={colors.black_text}>
        Confirm Technical & Financial Details
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            "& button": {
              backgroundColor:
                activeTab === "extracted" ? colors.green : "#E0E0E0",
              color: activeTab === "extracted" ? "#fff" : "#333",
            },
          }}
        >
          <CustomButton
            label={"Extracted Data"}
            onClick={() => setActiveTab("extracted")}
          />
        </Box>

        <Box
          sx={{
            "& button": {
              backgroundColor:
                activeTab === "userInput" ? colors.green : "#E0E0E0",
              color: activeTab === "userInput" ? "#fff" : "#333",
            },
          }}
        >
          <CustomButton
            label={"User Input Data"}
            onClick={() => setActiveTab("userInput")}
          />
        </Box>
      </Box>

      <Box mt={2}>
        {activeTab === "extracted" && <ReviewExtracted height="70vh" />}
        {activeTab === "userInput" && (
          <QualificationInputs height="70vh" initialData={qualificationData} />
        )}
      </Box>
    </Box>
  );
};

export default TechnicalConfirmation;
