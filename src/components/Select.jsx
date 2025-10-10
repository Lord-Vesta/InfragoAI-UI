import React from "react";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";

const CustomSelect = ({
  value,
  onChange,
  placeholder,
  options = [],
  disabled,
  width = "163px",
  label,
}) => {
  return (
    <div style={{ width }}>
      {label && (
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ marginBottom: "6px", color: "#333" }}
        >
          {label}
        </Typography>
      )}
      <FormControl fullWidth size="small" sx={{ width }}>
        <Select
          value={value}
          onChange={onChange}
          disabled={disabled}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span style={{ color: "#999", textAlign: "left" }}>
                  {placeholder}
                </span>
              );
            }
            return <span style={{ textAlign: "left" }}>{selected}</span>;
          }}
          sx={{
            borderRadius: "12px",
            "& .MuiSelect-select": {
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              background:"#ffffff"
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>

  );
};

export default CustomSelect;
