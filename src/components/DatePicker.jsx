import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";

const CustomDatePicker = ({ value, onChange, placeholder,disabled ,onBlur}) => {
    const [isEditable, setIsEditable] = useState(!disabled);
  return (
    <TextField
      type="date"
      value={value || ""}
      onChange={onChange}
       onBlur={(e) => {
    setIsEditable(false); 
    if (onBlur) onBlur(e); 
  }}
       disabled={disabled}
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      sx={{

        width: "45vw", 
        display: "flex",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          background:"#ffffff"
          
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