import React from "react";
import { TextField, Typography } from "@mui/material";

const CustomTextField = ({
  value,
  onChange,
  placeholder,
  disabled,
  multiline = false,
  label,
  minRows = 1,
  maxRows,
  width = "52vw",
}) => {
  return (
    <div style={{ width }}>
      {label && (
        <Typography
          variant="body2"
          fontWeight={400}
          fontSize={14}
          sx={{ marginBottom: "6px", color: "#333" }}
        >
          {label}
        </Typography>
      )}
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
             "& fieldset": {
            borderColor: "#e2e8f0",
          },
          "&:hover fieldset": {
            borderColor: "#e2e8f0", 
          },
        "&.Mui-focused fieldset": {
  borderColor: "grey !important", 
  borderWidth: "1px !important",
},
          },
        }}
      />
    </div>
  );
};

export default CustomTextField;
