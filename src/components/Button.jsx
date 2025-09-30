import React from "react";
import { Button as MuiButton } from "@mui/material";
import colors from "../assets/colors";

const Button = ({
  label,
  onClick,
  disabled,
  width = "150px",
  height,
  bgColor,
}) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: bgColor || colors.green,
        color: "#fff",
        width: width,
        height: height || "40px",
        borderRadius: "12px",
        padding: "6px",
        boxShadow: 3,
        textTransform: "none",
        "&:hover": {
          backgroundColor: bgColor
            ? bgColor
            : "#059669",
        },
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
