import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

const CustomSelect = ({ value, onChange, placeholder, options = [], disabled }) => {
  return (
    <FormControl fullWidth size="small" sx={{ borderRadius: "12px" }}>
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
          width: "163px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey", 
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey !important", 
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey", 
          },
          "& .MuiSelect-select": {
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
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
  );
};

export default CustomSelect;
