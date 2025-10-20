import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import colors from "../assets/colors";

const Toggle = ({  value, onChange }) => {
  const normalizedValue = value?.toLowerCase() || "no";

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue === "yes" ? "Yes" : "No");
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
        value={normalizedValue}
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
              backgroundColor: "#e6f4ea", 
              color: colors.green,
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
        <ToggleButton value="yes">Yes</ToggleButton>
        <ToggleButton value="no">No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toggle;
