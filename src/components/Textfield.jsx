import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ value, onChange, placeholder,disabled, multiline = false,
  minRows = 1,    
  maxRows,}) => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      multiline={multiline}  
        minRows={minRows}   
        maxRows={maxRows}
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          width: '60vw',
        },
      }}
    />
  );
};

export default CustomTextField;
