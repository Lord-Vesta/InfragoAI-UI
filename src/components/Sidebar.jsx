import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudIcon from '@mui/icons-material/Cloud';
import logo from "../assets/logo.png";

export default function Sidebar() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    "Upload",
    "Review Extracted",
    "Qualification Inputs",
    "Technical & Financial Confirm",
    "Eligibility & BG Check",
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          ...(activeStep === null
            ? { width: 260, boxShadow: "0px 0px 25px 0px #00000059" }
            : { width: 290 }),
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "0 20px 20px 0",
          overflow: "hidden",
        }}
      >
        {/* Logo */}

        <Box
          sx={{
            px: 4,
            py: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 4,
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
            Infravo AI
          </Typography>
        </Box>

        {/* Menu Item */}

        {activeStep === null ? (
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                background:
                  "linear-gradient(269.06deg, rgba(15, 185, 125, 0) -29.73%, #0FB97D 99.21%)",
                py: 1,
                px: 4,
                fontWeight: "700",
                color: "#2F3B37",
                textAlign: "start",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              Profile
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              pl: 4,
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 0,
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
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: i === activeStep ? "#E5F9F3" : "transparent",
                    }}
                  >
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                        bgcolor: i === 1 ? "#0FB97D" : "black",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",

                        margin: 0,
                        padding: 0,
                      }}
                      onClick={() => setActiveStep(i)}
                    >
                      <CloudIcon fontSize="16" />
                    </Box>
                    <Typography variant="body2" sx={{ left: 80 }}>
                      {label}
                    </Typography>
                  </Box>
                  {i < steps.length - 1 && (
                    <hr
                      style={{ height: "50px", margin: "0 17px",boxShadow:'none',color:'gray',borderRight:'none',borderLeft:'2px dashed gray' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 4 }}
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

      {/* Right Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 100,
        }}
      >
        {activeStep === null ? (
          // Stepper Mode
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}
          >
            {steps.map((label, i) => (
              <React.Fragment key={i}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: i === 1 ? "#0FB97D" : "black",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveStep(i)} // 👈 expand on click
                >
                  <CloudIcon fontSize="16" />
                </Box>
                {i < steps.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      height: 60,
                      borderLeft: "2px dashed gray",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        ) : (
          // Expanded Content Mode
          <Box sx={{ textAlign: "center" }}></Box>
        )}
      </Box>
    </Box>
  );
}
