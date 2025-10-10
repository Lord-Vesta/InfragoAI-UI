import React from "react";
import { Tooltip, styled, tooltipClasses } from "@mui/material";

const StyledTooltip = styled(
  ({ className, type, ...props }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      arrow
      placement="right" 
    />
  )
)(({ theme, type }) => {
  const colors = {
    error: "#FF4F52",
    success: "#0FB97D",
    text:"#A0AEC0"
  };

  const color = colors[type] || colors.text;

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color,
      fontWeight: 600,
      fontSize: "0.85rem",
      borderRadius: "6px",
      border: `2px solid ${color}`,
      padding: "6px 10px",
      boxShadow: theme.shadows[2],
    },
    [`& .${tooltipClasses.arrow}`]: {
      color,
    },
  };
});

const AlertTooltip = ({ title, children, type = "error", ...props }) => {
  return (
    <StyledTooltip title={title} type={type} {...props}>
      {children}
    </StyledTooltip>
  );
};

export default AlertTooltip;
