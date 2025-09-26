import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import colors from "../assets/colors";

const Toggle = ({ label, value, onChange }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 1,
        display: "inline-block",
      }}
    >
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        sx={{
          borderRadius: 1,
          width: 180,
          "& .MuiToggleButton-root": {
            textTransform: "none",
            width: "50%",
            border: `1px solid ${colors.green}`,
            backgroundColor: "#fff", 
            color: colors.green,
            "&:hover": {
              backgroundColor: "none",
              color: "#fff",
            },
            "&.Mui-selected": {
              backgroundColor: colors.green,
              color: "#fff",
              "&:hover": {
                backgroundColor: colors.green,
              },
            },
          },
        }}
      >
        <ToggleButton value="Yes">Yes</ToggleButton>
        <ToggleButton value="No">No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
