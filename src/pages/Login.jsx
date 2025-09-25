import React from "react";
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
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import background1 from "../assets/bg1.png";
import background2 from "../assets/bg2.png";

const Login = () => {
    const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  button:{
    fontFamily: "Montserrat, sans-serif",
  },
  
});
  return (
    <Box sx={{ minHeight: "screen", bgcolor: "#f9f9f9", maxWidth: "100%", p: 4 }}>
      {/* Top Green Section */}

      <Box
        sx={{
          bgcolor: "#0FB97D",
          color: "white",
          borderRadius: 5,
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
          <Toolbar sx={{ justifyContent: "space-evenly" }}>
            {/* Logo */}
            <Typography variant="h6" theme={theme} sx={{ fontWeight: "bold" }}>
              Infravo AI
            </Typography>

            {/* Nav Links */}
            <Box  sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Button theme={theme} color="inherit">Dashboard</Button>
              <Button theme={theme} color="inherit">Profile</Button>
              <Button theme={theme} color="inherit">Sign Up</Button>
              <Button theme={theme} color="inherit">Sign In</Button>
            </Box>
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
            >
              Lorem Ipsum
            </Button>
          </Toolbar>
        </AppBar>

        {/* Welcome Section */}
        <Container sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" theme={theme}>
            Welcome!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }} theme={theme}>
            Use these awesome forms to login or create new account in your
            project for free.
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
          <Typography theme={theme} variant="h6" fontWeight="bold" sx={{ mb: 4 }}>
            Register with
          </Typography>

          {/* Phone Input */}
          <Typography
          theme={theme}
            variant="body2"
            sx={{ textAlign: "left", mb: 1, color: "#000000" }}
          >
            Email ID
          </Typography>
          <TextField
            fullWidth
            label="Your Email Number"
            variant="outlined"
            size="small"
            InputProps={{
              style: { padding: "3px 0px" },
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiInputLabel-root": {
                top: 2,
              },
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
          <Grid container spacing={5} justifyContent="center" sx={{ mb: 5 }}>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Grid item key={idx}>
                  <TextField
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
                      },
                    }}
                  />
                </Grid>
              ))}
          </Grid>

          {/* Sign Up */}
          <Button
          theme={theme}
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#0FB97D", mb: 2, borderRadius: "12px" }}
          >
            SIGN UP
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
