import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import CustomTextField from "../components/TextField";

const BGsummary = () => {
  const [qualificationResult, setQualificationResult] = useState(null);
  const [bgEligibilityResult, setBgEligibilityResult] = useState(null);
  const [openShortfall, setOpenShortfall] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);

  const fields = [
    { label: "Bid Capacity", placeholder: "Lorem ipsum" },
    { label: "Required PBG (1 Cr)", placeholder: "Lorem ipsum" },
    { label: "Additional PBG (if under-quoted)", placeholder: "Lorem ipsum" },
    { label: "Total BG Required", placeholder: "Lorem ipsum" },
    { label: "BG Gap", placeholder: "Lorem ipsum" },
    { label: "Variance from Estimate %", placeholder: "Lorem ipsum" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = {
        qualification: "PASS",
        bgEligibility: "FAIL",
      };

      setQualificationResult(apiResponse.qualification);
      setBgEligibilityResult(apiResponse.bgEligibility);
    };

    fetchData();
  }, []);

  const getButtonColor = (result) => {
    if (result === "PASS") return colors.green;
    if (result === "FAIL") return colors.red;
    return colors.grey;
  };

  return (
    <Box
      width="100%"
      display="flex"
      height={"78vh"}
      overflow={"auto"}
      flexDirection="column"
      gap={3}
      position="relative"
    >
      <Typography fontWeight="600" fontSize={24} color={colors.black_text}>
        Eligibility & BG Summary
      </Typography>

      {fields.map((field, index) => (
        <CustomTextField
          key={index}
          label={field.label}
          placeholder={field.label}
        />
      ))}

      <Box display={"flex"} gap={2} justifyContent={"space-between"}>
        {/* Results */}
        <Box display={"flex"} flexDirection={"column"} gap={2} mb={1}>
          {/* Qualification */}
          <Box display="flex" flexDirection="column" alignItems="start" gap="4px">
            <Typography fontWeight="500" fontSize={16} color={colors.black_text}>
              Qualification Result
            </Typography>
            <CustomButton
              label={qualificationResult || "Loading..."}
              disabled={!qualificationResult}
              width="150px"
              height="30px"
              bgColor={getButtonColor(qualificationResult)}
              sx={{ color: "#fff", borderRadius: "8px" }}
            />
          </Box>

          {/* BG Eligibility */}
          <Box display="flex" flexDirection="column" alignItems="start" gap="4px">
            <Typography fontWeight="500" fontSize={16} color={colors.black_text}>
              BG Eligibility Result
            </Typography>
            <CustomButton
              label={bgEligibilityResult || "Loading..."}
              disabled={!bgEligibilityResult}
              width="150px"
              height="30px"
              bgColor={getButtonColor(bgEligibilityResult)}
              sx={{ color: "#fff", borderRadius: "8px" }}
              onClick={() => {
                if (bgEligibilityResult === "FAIL") {
                  setOpenShortfall(true);
                }
              }}
            />
          </Box>
        </Box>

        {/* Download Summary Report */}
        <Box display="flex" justifyContent="flex-end" alignItems="end" mt={3} mx={2} mb={1}>
          <CustomButton
            label="Downloadable summary report"
            width="250px"
            height="35px"
            onClick={() => setOpenDownload(true)}
            sx={{
              backgroundColor: colors.green,
              color: "#fff",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>

      {/* Shortfall Modal */}
      <Dialog open={openShortfall} onClose={() => setOpenShortfall(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "flex-end", pb: 0 }}>
          <IconButton onClick={() => setOpenShortfall(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 4, maxWidth: 400 }}>
          <Typography fontSize={50} mb={1}>
            😟
          </Typography>
          <Typography variant="h6" fontWeight="600" color={colors.green} gutterBottom>
            Shortfall Detected
          </Typography>
          <Typography color="text.secondary" mb={3}>
            BG shortfall identified. <br />
            Review your financials and connect with our partnered Bank
            Guarantee providers directly in-platform.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.green,
              borderRadius: "10px",
              px: 4,
              textTransform: "none",
              "&:hover": { backgroundColor: "#059669" },
            }}
            onClick={() => setOpenShortfall(false)}
          >
            Request Facilitation
          </Button>
        </DialogContent>
      </Dialog>

      {/* Download Files Modal */}
      <Dialog open={openDownload} onClose={() => setOpenDownload(false)} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography fontWeight="600" fontSize={18} color={colors.green}>
            Downloadable Summary Report
          </Typography>
          <IconButton onClick={() => setOpenDownload(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* File Row */}
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <img src="src\assets\excel.png" alt="excel" width={35} height={35} />
              <Box>
                <Typography>Project Name.xlsx</Typography>
                <Typography fontSize={12} color="text.secondary">
                  Size → 3 kb
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Box>
<hr></hr>
          {/* File Row */}
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <img src="src\assets\PDF_file_icon.svg.png" alt="pdf" width={35} height={35} />
              <Box>
                <Typography>Project Name.pdf</Typography>
                <Typography fontSize={12} color="text.secondary">
                  Size → 3 kb
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BGsummary;
