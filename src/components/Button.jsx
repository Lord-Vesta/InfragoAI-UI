
import React from "react";
import { Button as MuiButton, CircularProgress, Box } from "@mui/material";
import colors from "../assets/colors";

const Button = ({
  label,
  onClick,
  disabled,
  width = "150px",
  height,
  bgColor,
  loading = false,
}) => {
  return (
    <MuiButton
      type="button"
      variant="contained"
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        backgroundColor: loading ? "#9e9e9e" : bgColor || colors.green, 
        color: "#fff",
        width: width,
        height: height || "40px",
        borderRadius: "8px",
        padding: "6px",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        "&:hover": {
          backgroundColor: loading
            ? "#9e9e9e"
            : bgColor
            ? bgColor
            : "#059669",
        },
      }}
    >
      {loading ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={20} color="inherit" thickness={5} />
          <span>Processing...</span>
        </Box>
      ) : (
        label
      )}
    </MuiButton>
  );
};

export default Button;
