import React, { useState, useContext, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { userContext } from "../context/ContextProvider";

import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { logoutUser } from "../Utils/Api.utils";

export default function Sidebar() {
  const [activeStep, setActiveStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { project_id } = useParams();
  const { jwtToken, projectStatus } = useContext(userContext);
const storedProjectId = localStorage.getItem("anonProjectId");
const projectIdToUse = jwtToken ? project_id : storedProjectId;
  const handleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
 const location = useLocation().pathname;
  useEffect(() => {
    if (location === "/") {
      localStorage.removeItem("anonProjectId");
    }
  }, [location]);
  const steps = [
    "Upload",
    "Review Extracted",
    "Qualification Inputs",
    "Technical & Financial Confirm",
    "Eligibility & BG Check",
  ];

  const stepRoutes = [
    `/upload/${projectIdToUse}`,
    `/reviewextracted/${projectIdToUse}`,
    `/qualificationinputs/${projectIdToUse}`,
    `/technicalconfirmation/${projectIdToUse}`,
    `/bgsummary/${projectIdToUse}`,
  ];

 
  const handleStepClick = (i) => {
    if (!jwtToken && i >= 2) {
      toast.info("You must be logged in to access this step.");
      return;
    }
    setActiveStep(i);
    navigate(stepRoutes[i]);
  };

  useEffect(() => {
    stepRoutes.forEach((route, index) => {
      if (location.toLowerCase() === route) {
        setActiveStep(index);
      }
    });
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser({ refresh_token: jwtToken });
      if (response.status === 200) {
        toast.success("Logged out successfully");
        localStorage.removeItem("accessToken");
        navigate("/");
        window.location.reload();
      } else {
        const errorMessage = response.data?.message || "Logout failed.";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          ...(activeStep === null
            ? { width: 260, boxShadow: "0px 0px 25px 0px #00000059" }
            : { width: 260 }),
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "0 20px 20px 0",
          overflow: "hidden",
          boxShadow: "0px 0px 20px 0px #00000059",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            ml: "22px",
          }}
        >
          {isExpanded === true && location !== "/" ? (
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                bgcolor: "#0FB97D",
                "&:active": { bgcolor: "#0FB97D" },
                "&:focus": { bgcolor: "#0FB97D" },
                "&:hover": { bgcolor: "#0FB97D" },
              }}
            >
              <MenuIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
          ) : (
            <></>
          )}

          <Box
            sx={{
              py: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Box sx={{ width: 40, height: 40 }}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontSize: "22px", fontWeight: 700 }}>
              Infrago AI
            </Typography>
          </Box>
        </Box>

        {/* Menu Item */}

        {isExpanded === false || location === "/" ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {jwtToken ? (
              <Box
                sx={{
                  background:
                    "linear-gradient(90deg, #2fd6a7 50%, #eafaf6 95%)",
                  py: 1,
                  px: 4,
                  fontWeight: "700",
                  color: "#222",
                  textAlign: "start",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Profile
              </Box>
            ) : (
              <Box></Box>
            )}
            {jwtToken ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 2,
                  backgroundColor: "#e3e0e0ff",
                  cursor: "pointer",
                  
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#d5d2d2",
                  },
                }}
                onClick={handleLogout}
              >
                <Box
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                  
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Logout
                  </Typography>
                </Box>

                <LogoutIcon fontSize="small" />
              </Box>
            ) : (
              <Box></Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 0,
                width: "100%",
              }}
            >
              {steps.map((label, i) => {
                let maxAllowedStep = 0;
                if (projectStatus >= 20 && projectStatus < 40)
                  maxAllowedStep = 1;
                else if (projectStatus >= 40 && projectStatus < 60)
                  maxAllowedStep = 2;
                else if (projectStatus >= 60 && projectStatus < 80)
                  maxAllowedStep = 3;
                else if (projectStatus >= 80) maxAllowedStep = 4;

                // disable all steps beyond maxAllowedStep
                const isStepDisabled =
                  i > maxAllowedStep || (!jwtToken && i >= 2);
                return (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      width: "100%",
                      cursor:
                        (!jwtToken && i >= 2) || (jwtToken && isStepDisabled)
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        (!jwtToken && i >= 2) || (jwtToken && isStepDisabled)
                          ? 0.5
                          : 1,
                    }}
                    onClick={() => {
                      if ((!jwtToken && i >= 2) || (jwtToken && isStepDisabled))
                        return;
                      handleStepClick(i);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        background:
                          i === activeStep
                            ? "linear-gradient(180deg, #78ffd0ff , #eafaf6)"
                            : "transparent",

                        borderRadius: "16px",
                        width: "100%",
                        py: i === activeStep ? "10px" : "0",
                        ml: "10px",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 35,
                          height: 35,
                          borderRadius: "50%",
                          bgcolor: i === activeStep ? "#0FB97D" : "#2F3B37",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          margin: 0,
                          padding: 0,
                          ml: 4,
                        }}
                      >
                        <CloudUploadOutlinedIcon
                          fontSize="16"
                          sx={{ color: i < activeStep ? "#0FB97D" : "#fff" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          left: 80,
                          color: i < activeStep ? "#0FB97D" : "#2F3B37",
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                    {i < steps.length - 1 && (
                      <hr
                        style={{
                          height: "50px",
                          margin: "0 59px",
                          boxShadow: "none",
                          color: "gray",
                          borderRight: "none",
                          borderLeft: `2px ${
                            i < activeStep ? "solid" : "dashed"
                          } gray`,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 100,
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleExpanded}
      >
        {isExpanded === false && location !== "/" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              ml: 4,
            }}
          >
            {steps.map((label, i) => {
              let maxAllowedStep = 0;
              if (projectStatus >= 20 && projectStatus < 40) maxAllowedStep = 1;
              else if (projectStatus >= 40 && projectStatus < 60)
                maxAllowedStep = 2;
              else if (projectStatus >= 60 && projectStatus < 80)
                maxAllowedStep = 3;
              else if (projectStatus >= 80) maxAllowedStep = 4;

              // disable all steps beyond maxAllowedStep
              const isStepDisabled =
                i > maxAllowedStep || (!jwtToken && i >= 2);
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      (!jwtToken && i >= 2) || (jwtToken && isStepDisabled)
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      (!jwtToken && i >= 2) || (jwtToken && isStepDisabled)
                        ? 0.5
                        : 1,
                  }}
                  onClick={() => {
                    if ((!jwtToken && i >= 2) || (jwtToken && isStepDisabled))
                      return;
                    handleStepClick(i);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background:
                        i === activeStep
                          ? "linear-gradient(180deg, #0FB97D 0%, #d8fff1ff 60%)"
                          : "",
                      p: i === activeStep ? "10px" : "0px",
                      borderRadius: "15px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: i === activeStep ? "#0FB97D" : "black",
                        color: i < activeStep ? "#0FB97D" : "#fff ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveStep(i)}
                    >
                      <CloudUploadOutlinedIcon fontSize="16" color="#0FB97D" />
                    </Box>
                  </Box>

                  {i < steps.length - 1 && (
                    <Box
                      sx={{
                        width: 2,
                        height: 60,
                        borderLeft: `2px ${
                          i < activeStep ? "solid" : "dashed"
                        } gray`,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}></Box>
        )}
      </Box>
    </Box>
  );
}
