import React from "react";
import { Button as MuiButton } from "@mui/material";
import colors from "../assets/colors";

const Button = ({ label, onClick, disabled }) => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: colors.green,
        color: "#fff",
        width: "150px",
        borderRadius: "12px",
        padding:"6px",
        boxShadow: 3,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#059669",
        },
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
