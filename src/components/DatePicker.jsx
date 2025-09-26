import React from "react";
import { TextField } from "@mui/material";

const CustomDatePicker = ({ value, onChange, placeholder,disabled }) => {
  return (
    <TextField
      type="date"
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      sx={{
        width: "50vw", 
        display: "flex",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
        "& .MuiInputBase-input": {
          padding: "8px 12px",
        },
      }}
      InputLabelProps={{
        shrink: false, 
      }}
    />
  );
};

export default CustomDatePicker;