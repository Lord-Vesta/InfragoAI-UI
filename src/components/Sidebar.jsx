import React, { act, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const [activeStep, setActiveStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const steps = [
    "Upload",
    "Review Extracted",
    "Qualification Inputs",
    "Technical & Financial Confirm",
    "Eligibility & BG Check",
  ];

  const stepRoutes = [
    "/upload",
    "/ReviewExtracted",
    "/QualificationInputs",
    "/TechnicalConfirmation",
    "/BGsummary",
  ];
  const handleStepClick = (i) => {
    setActiveStep(i);
    navigate(stepRoutes[i]);
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
          boxShadow: "0px 0px 25px 0px #00000059",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            ml: "22px",
          }}
        >
          {isExpanded === true ? (
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
            }}
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

        {isExpanded === false ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(90deg, #2fd6a7 50%, #eafaf6 95%)",
                py: 1,
                px: 4,
                fontWeight: "700",
                color: "#222",
                textAlign: "start",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              Profile
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 4,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Lorem Ipsum
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Lorem Ipsum Lorem
                </Typography>
              </Box>
              <IconButton>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
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
              {steps.map((label, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    width: "100%",
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
                    onClick={() => handleStepClick(i)}
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
                      onClick={() => setActiveStep(i)}
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
              ))}
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
        {isExpanded === false ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              ml: 4,
            }}
          >
            {steps.map((label, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
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
                  onClick={() => handleStepClick(i)}
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
                    onClick={() => setActiveStep(i)} // 👈 expand on click
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
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}></Box>
        )}
      </Box>
    </Box>
  );
}
