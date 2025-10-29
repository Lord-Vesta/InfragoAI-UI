
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import shortFallRed from "../assets/shortFallRed.png";
import shortFallWhite from "../assets/shortFallWhite.png";
import Ellipse_Green from "../assets/Ellipse_Green.png";
import { toast } from "react-toastify";
import { tenderEvaluateStatus } from "../Utils/Api.utils";
import { useParams } from "react-router";
import { PuffLoader } from "react-spinners";

const QualificationBox = ({ title, status }) => {
  const isFullyMet = status === "Fully Met";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        textAlign: "center",
        border: `1px solid ${isFullyMet ? "#4CAF50" : "#F44336"}`,
        backgroundColor: isFullyMet ? "#008D0005" : "#FF4F5205",
        borderRadius: "15px",
        height: "100%",
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <img
          src={isFullyMet ? Ellipse_Green : shortFallRed}
          style={{ width: isFullyMet ? "50px" : "70px", height: "50px" }}
          alt="status"
        />
      </Box>

      <Typography variant="body1" fontWeight="bold">
        {title}
      </Typography>

      <Typography variant="h5" fontWeight="bold" sx={{ color: isFullyMet ? "#4CAF50" : "#F44336" }}>
        {status}
      </Typography>
    </Paper>
  );
};

const QualificationResult = () => {
  const [status, setStatus] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { project_id } = useParams();

  const convertStatus = (val) => (val === "Pass" ? "Fully Met" : "Shortfall");

  useEffect(() => {
    const fetchQualificationResult = async () => {
      try {
        setError(false);
        const response = await tenderEvaluateStatus(project_id);
        console.log("resp", response)
      

        const result = response;

        const technicalStatus = convertStatus(result.technical_qualification.status);
        const financialStatus = convertStatus(result.financial_qualification.status);

        setApiData({
          technical: technicalStatus,
          financial: financialStatus,
        });

        setStatus(
          technicalStatus === "Fully Met" && financialStatus === "Fully Met"
            ? "Pass"
            : "Fail"
        );
      } catch (error) {
          setError(true);
            setLoading(false);
        console.log("err", error)
        toast.error("Failed to fetch qualification results");
      } finally {
        setLoading(false);
      }
    };

    fetchQualificationResult();
  }, [project_id]);
if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            border: "1px solid #FF4F52",
            backgroundColor: "#FFEBEE",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#F44336" gutterBottom>
            Failed to Load BG Summary
          </Typography>
          <Typography fontSize={15} color="#444">
            We couldn’t retrieve the summary data at the moment.
          </Typography>
          <Typography fontSize={14} color="#666" mt={1}>
            Please try again later or check your network connection.
          </Typography>
        </Paper>
      </Container>
    );
  }
  if (loading || !apiData) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", 
        }}
      >
        <PuffLoader color="#0FB97D" size={60} />
        <Typography fontSize={16} fontWeight="500" mt={2}>
          Loading qualification results...
        </Typography>
      </Box>
    );
  }
  
  let facilitationLabel = "";
  if (apiData.technical === "Shortfall" && apiData.financial === "Fully Met") {
    facilitationLabel = "Request BG Facilitation";
  } else if (apiData.technical === "Fully Met" && apiData.financial === "Shortfall") {
    facilitationLabel = "Request JV Facilitation";
  } else if (apiData.technical === "Shortfall" && apiData.financial === "Shortfall") {
    facilitationLabel = "Request Facilitation";
  }

  const showQualificationBoxes = status === "Fail";
  const showFacilitationBox = facilitationLabel !== "";

  return (
    <>
      {status === "Fail" ? (
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Paper sx={{ p: 0, borderRadius: "8px", border: "1px solid #FF4F52" }}>
            <Box sx={{ borderBottom: "1px solid #FF4F52" }}>
              <Box display="flex" alignItems="center">
                <Box sx={{ p: 2, backgroundColor: "#FF4F52", borderRadius: "6px 6px 0 0", mr: 2 }}>
                  <img src={shortFallWhite} style={{ width: "70px", height: "52px" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#FF4F52">
                    Shortfall Detected
                  </Typography>
                  <Typography fontWeight={700} fontSize={15}>
                    Qualification Result
                  </Typography>
                  <Typography fontSize={14} color="#4B5563">
                    Our analysis shows a shortfall in one or more qualification areas.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {showQualificationBoxes && (
              <Box sx={{ p: 3 }}>
                <Grid container spacing={2} justifyContent="center"
                  alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <QualificationBox title="Technical Qualification" status={apiData.technical} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <QualificationBox title="Financial Qualification" status={apiData.financial} />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>

          {showFacilitationBox && (
            <Box
              sx={{
                backgroundColor: "#E9FFF7",
                p: 3,
                border: "1px solid #0FB97D",
                borderRadius: "8px",
                mt: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Infravo can help bridge the gap
              </Typography>

              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body2" sx={{ maxWidth: "70%" }}>
                  Whether you need support in enhancing your technical qualification or securing additional financial backing, Infrago's Facilitation Network can connect you to the right partners - quickly, confidentially, and with full guidance till approval.
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0FB97D",
                    "&:hover": { backgroundColor: "#0FB97D" },
                    textTransform: "none",
                    px: 3,
                    height:"40px",
                  }}
                >
                  {facilitationLabel}
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      ) : (
        <Container
          maxWidth="md"
          sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Paper
            sx={{
              border: "1px solid #4CAF50",
              borderRadius: "8px",
              p: 3,
              width: "100%",
              maxWidth: 600,
            }}
          >
            <Box display="flex" alignItems="center">
              <Box sx={{ p: 2, backgroundColor: "#008D00", borderRadius: "6px", mr: 2 }}>
                <CheckCircleIcon sx={{ color: "#fff", fontSize: 45 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="#008D00">
                  Congratulations!
                </Typography>
                <Typography fontWeight={700} fontSize={15}>
                  Qualification Result
                </Typography>
                <Typography fontSize={14}>
                  You met all the technical and financial eligibility criteria.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default QualificationResult;
