import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Container,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const QualificationBox = ({ title, status, isShortfall }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      textAlign: "center",
      border: `2px solid ${isShortfall ? "#F44336" : "#4CAF50"}`,
      borderRadius: "8px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <Box sx={{ mb: 1.5 }}>
      {isShortfall ? (
        <WarningIcon sx={{ color: "#F44336", fontSize: 40 }} />
      ) : (
        <CheckCircleOutlineIcon sx={{ color: "#4CAF50", fontSize: 40 }} />
      )}
    </Box>
    <Typography variant="body1" fontWeight="bold" sx={{ color: "#666" }}>
      {title}
    </Typography>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ color: isShortfall ? "#F44336" : "#4CAF50", mt: 0.5 }}
    >
      {status}
    </Typography>
  </Paper>
);

const QualificationResult = ({ isSuccess, apiResponseData }) => {
  const mockData = apiResponseData || {
    fileName: "Project Name.xlxs",
    fileSize: "3 kb",
    qualifications: [
      { name: "Bank Guarantee Qualification", status: "Fully Met", met: true },
      { name: "JV Qualification", status: "Shortfall", met: false },
    ],
  };

  if (isSuccess) {
    return (
      <Container
        maxWidth="md"
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90%",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            border: "1px solid #4CAF50",
            borderRadius: "8px",
            width: "90%",
            pb: 4,
            boxShadow: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 0, m: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                p: 2,
                backgroundColor: "#008D00",
                borderRadius: "6px 6px 0 0",
                height: "100%",
              }}
            >
              <CheckCircleIcon sx={{ color: "#FFFFFF", fontSize: 45 }} />
            </Box>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h5" fontWeight="bold" color="#008D00">
                Congratulations!
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#000000", fontWeight: 700, fontSize: 15 }}
              >
                Qualification Result
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#000000", fontSize: 14, fontWeight: 400 }}
              >
                You met all the technical and financial eligibility criteria for
                this bid.
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="h6"
            align="center"
            fontWeight="bold"
            sx={{ mb: 2, color: "#585858" }}
          >
            Download Summary Report
          </Typography>

          <Paper
            sx={{
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
              borderRadius: "8px",
              mx: "auto",
              boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box display="flex" alignItems="center">
              <img
                src="/src/assets/PDF_file_icon.svg.png"
                alt="pdf"
                width={50}
                height={50}
                style={{ marginRight: "16px", cursor: "pointer" }}
              />
              <Typography variant="body1" fontWeight="medium">
                {mockData.fileName}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mr: 1 }}
                >
                  Size → {mockData.fileSize}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <DownloadIcon
                sx={{ color: "text.secondary", cursor: "pointer" }}
              />
            </Box>
          </Paper>
        </Paper>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper
          elevation={1}
          sx={{
            p: 0,
            borderRadius: "8px",
            border: "1px solid #FF4F52",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid #FF4F52",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  p: 2,
                  backgroundColor: "#FF4F52",
                  borderRadius: "6px 6px 0 0",
                  height: "100%",
                  mr: 2,
                }}
              >
                <WarningIcon sx={{ color: "#FFFFFF", fontSize: 52 }} />
              </Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#FF4F52"
                sx={{ pt: 0.5, pb: 0.5 }}
              >
                Shortfall Detected
                <Typography
                  variant="h6"
                  fontWeight="700"
                  color="#000000"
                  fontSize={15}
                >
                  Qualification Result
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our analysis shows a shortfall in one or more qualification
                  areas.
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 3, pb: 5 }}>
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
              {mockData.qualifications.map((q, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <QualificationBox
                    title={q.name}
                    status={q.status}
                    isShortfall={!q.met}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography
              variant="h6"
              align="center"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Download Summary Report
            </Typography>

            <Paper
              // variant="outlined"
              sx={{
                p: 1.5,
                maxWidth: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "8px",
                mx: "auto",
                boxShadow: "0px 3px 6px 0px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box display="flex" alignItems="center">
                <img
                  src="/src/assets/PDF_file_icon.svg.png"
                  alt="pdf"
                  width={50}
                  height={50}
                  style={{ marginRight: "16px", cursor: "pointer" }}
                />
                <Typography variant="body1" fontWeight="medium">
                  {mockData.fileName}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Size → {mockData.fileSize}
                  </Typography>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <DownloadIcon
                  sx={{ color: "text.secondary", cursor: "pointer" }}
                />
              </Box>
            </Paper>
          </Box>

         
        </Paper>
         <Box
            sx={{
              backgroundColor: "#E9FFF7",
              p: 3,
              border: "1px solid #0FB97D",
              borderRadius: "8px",
              mt: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#388E3C"
              sx={{ mb: 1 }}
            >
              Infravo can help bridge the gap
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: "70%" }}
              >
                Whether you need support in enhancing your technical
                qualification or securing additional financial backing,
                Infravgo’s Facilitation Network can connect you to the right
                partners - **quickly, confidentially, and with full guidance
                till approval.**
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0FB97D",
                  "&:hover": { backgroundColor: "#0FB97D" },
                  borderRadius: "4px",
                  textTransform: "none",
                  px:4
                }}
              >
                Request Facilitation
              </Button>
            </Box>
          </Box>
      </Container>
    );
  }
};

export default QualificationResult;
