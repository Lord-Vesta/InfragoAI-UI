import React, { useState, useEffect, forwardRef } from "react";
import { TextField, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const CustomTextField = forwardRef(({
  value,
  onChange,
  placeholder,
  multiline = false,
  label,
  minRows = 1,
  maxRows,
  width = "100%",
  showIcon = false,
  disabled = false,
  error,
  helperText,
  onBlur,
  disableOnBlur = false, 
  tooltip, // <--- new prop
}, ref) => {
  const [isEditable, setIsEditable] = useState(!disabled);

  useEffect(() => {
    setIsEditable(!disabled);
  }, [disabled]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  return (
    <div style={{ width }}>
      {label && (
        <Box display="flex" alignItems="center" sx={{ marginBottom: "6px" }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="body2" fontWeight={400} fontSize={14}>
              {label}
            </Typography>
          </Box>

          {showIcon && disabled && (
           <IconButton size="small" sx={{ ml: 1, color: "#0FB97D" }} onClick={handleEditClick}>
                <EditIcon fontSize="small" />
              </IconButton>
          )}
        </Box>
      )}

      {tooltip ? (
        <AlertTooltip title={tooltip} type="success" placement="top" arrow>
          <TextField
            fullWidth
            value={value}
            onChange={onChange}
            onBlur={(e) => {
              if (disableOnBlur) setIsEditable(false);
              if (onBlur) onBlur(e);
            }}
            placeholder={placeholder}
            disabled={!isEditable}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            error={error}
            helperText={helperText}
            variant="outlined"
            size="small"
            inputRef={ref} 
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#e2e8f0" },
                "&.Mui-focused fieldset": { borderColor: "grey !important", borderWidth: "1px !important" },
              },
              "& .MuiInputBase-input": { color: !isEditable ? "rgba(0,0,0,0.5)" : "black" },
            }}
          />
        </AlertTooltip>
      ) : (
        <TextField
          fullWidth
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            if (disableOnBlur) setIsEditable(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          disabled={!isEditable}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          error={error}
          helperText={helperText}
          variant="outlined"
          size="small"
          inputRef={ref} 
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              "& fieldset": { borderColor: "#e2e8f0" },
              "&:hover fieldset": { borderColor: "#e2e8f0" },
              "&.Mui-focused fieldset": { borderColor: "grey !important", borderWidth: "1px !important" },
            },
            "& .MuiInputBase-input": { color: !isEditable ? "rgba(0,0,0,0.5)" : "black" },
          }}
        />
      )}
    </div>
  );
});

export default CustomTextField;
