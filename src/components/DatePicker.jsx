import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import AlertTooltip from "./Tooltip";

const CustomDatePicker = ({ value, onChange, placeholder,disabled ,onBlur,tooltipText}) => {
    const [ setIsEditable] = useState(!disabled);
  return (
    <AlertTooltip title={tooltipText || ""} placement="top" arrow type="success">
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
    </AlertTooltip>
  );
};

export default CustomDatePicker;