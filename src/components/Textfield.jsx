import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ value, onChange, placeholder,disabled }) => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}
    />
  );
};

export default CustomTextField;
