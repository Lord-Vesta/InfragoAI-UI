import React, { useContext, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import background1 from "../assets/bg1.png";
import background2 from "../assets/bg2.png";
import logo1 from "../assets/logo1.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp } from "../Utils/Api.utils";
import { useNavigate } from "react-router";
import { userContext } from "../context/ContextProvider";

const Login = () => {
  const theme = createTheme({
    typography: { fontFamily: "Montserrat, sans-serif" },
    button: { fontFamily: "Montserrat, sans-serif" },
  });

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { sessionId, setSessionId, projectId } = useContext(userContext);

  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleGetOtp = async () => {
    try {
      if (!mobile) {
        toast.error("Please enter mobile number 9876543210");
        return;
      } else {
        const response = await sendOtp({ phone_number: mobile });
        if (response) {
          toast.success("OTP sent successfully");
          alert(`Your OTP is ${response.message}`);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const data = { phone_number: mobile, otp_code: "1234" };
      if (sessionId) {
        data.session_id = sessionId;
      }
      const response = await verifyOtp(data);

      if (response) {
        const { access } = response;
        localStorage.setItem("accessToken", access);
        if (sessionId) {
          setSessionId(null);
          navigate("/reviewextracted/" + projectId);
        } else {
          navigate("/");
        }
        window.location.reload();
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "Enter") {
      handleVerifyOtp(otp.join(""));
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#f9f9f9",
        maxWidth: "100%",
        p: 4,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          bgcolor: "#0FB97D",
          color: "white",
          borderRadius: 2,
          pb: 20,
          backgroundImage: `url(${background1}), url(${background2})`,
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "100%",
          backgroundSize: "cover, contain",
        }}
      >
        <AppBar
          position="static"
          sx={{ bgcolor: "transparent", boxShadow: "none", pt: 3 }}
        >
          <Toolbar sx={{ justifyContent: "space-between", marginX: "3rem" }}>
            {/* Logo */}

            <Typography
              variant="h6"
              theme={theme}
              sx={{
                fontWeight: "bold",
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img src={logo1} alt="logo" style={{ width: 30, height: 30 }} />{" "}
              Infrago AI
            </Typography>

            {/* Nav Links */}
            {/* <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Button
                theme={theme}
                color="inherit"
                sx={{
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DashboardIcon sx={{ fontSize: "15px" }} /> Dashboard
              </Button>
              <Button
                theme={theme}
                color="inherit"
                sx={{
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon sx={{ fontSize: "15px" }} /> Profile
              </Button>
              <Button
                theme={theme}
                color="inherit"
                sx={{
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccountCircleIcon sx={{ fontSize: "15px" }} /> Sign Up
              </Button>
              <Button
                theme={theme}
                color="inherit"
                sx={{
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <KeyIcon
                  sx={{ fontSize: "15px", transform: "rotate(130deg)" }}
                />{" "}
                Sign In
              </Button>
            </Box> */}
            <Button
              variant="contained"
              theme={theme}
              sx={{
                bgcolor: "white",
                color: "#12b76a",
                textTransform: "none",
                "&:hover": { bgcolor: "#f1f1f1" },
                borderRadius: "20px",
                px: 6,
              }}
              onClick={() => navigate("/upload")}
            >
              Start Bid Assessment
            </Button>
          </Toolbar>
        </AppBar>

        {/* Welcome Section */}
        <Container sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" theme={theme}>
            Welcome!
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 1, opacity: 0.9, fontWeight: "500"}}
            theme={theme}
          >
          Upload your bid document and Infrago AI will highlight key requirements, show your eligibility, and help you prepare your bid confidently.
          </Typography>
        </Container>
      </Box>

      {/* Register Card */}
      <Container sx={{ mt: -12 }}>
        <Paper
          elevation={1}
          sx={{
            width: "30%",
            mx: "auto",
            px: 4,
            py: 3,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography
            theme={theme}
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Register with
          </Typography>

          {/* Phone Input */}
          <Typography
            theme={theme}
            variant="body2"
            sx={{ textAlign: "left", mb: 1, color: "#000000" }}
          >
            Mobile Number
          </Typography>
          <TextField
            fullWidth
            placeholder="Your Mobile Number"
            variant="outlined"
            size="small"
            InputProps={{
              style: { padding: "3px 0px" },
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                "&:hover fieldset": {
                  borderColor: "#0FB97D",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0FB97D",
                },
              },
              "& .MuiInputBase-input": {
                color: "black",
                "::placeholder": {
                  color: "gray",
                  opacity: 0.5,
                },
              },
              "& .MuiOutlinedInput-root:hover .MuiInputBase-input::placeholder":
                {
                  color: "#0FB97D",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input::placeholder":
                {
                  color: "#0FB97D",
                  opacity: 0.5,
                },
            }}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleGetOtp();
              }
            }}
          />

          <Button
            variant="contained"
            theme={theme}
            sx={{
              bgcolor: "#0FB97D",
              mb: 2,
              width: "50%",
              borderRadius: "12px",
            }}
            onClick={handleGetOtp}
          >
            Get OTP
          </Button>

          {/* OTP Boxes */}
          <Typography
            theme={theme}
            variant="body2"
            sx={{ textAlign: "left", mb: 1, color: "#000000" }}
          >
            OTP
          </Typography>
          <Grid container gap={2} justifyContent="center" sx={{ mb: 5 }}>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Grid item key={idx}>
                  <TextField
                    inputRef={(el) => (inputRefs.current[idx] = el)}
                    value={otp[idx]}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    variant="outlined"
                    size="small"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", width: "1.7rem" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "2.5rem",
                        "&:hover fieldset": {
                          borderColor: "#0FB97D", // border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0FB97D",
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
          </Grid>

          <Button
            theme={theme}
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#0FB97D", mb: 2, borderRadius: "12px" }}
            onClick={handleVerifyOtp}
          >
            SIGN UP
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
