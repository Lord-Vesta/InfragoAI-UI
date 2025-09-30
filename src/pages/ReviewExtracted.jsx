import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography,Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import CustomTextField from "../components/TextField";
import CustomSelect from "../components/Select";
import CustomDatePicker from "../components/DatePicker";
import colors from "../assets/colors";
import LogoutIcon from "@mui/icons-material/Logout";


import Toggle from "../components/toggleButton";

const procurementModes = ["EPC", "BOQ", "PAR"];
const baseRates = ["DSR", "State SSR"];

const fieldConfig = [
  { label: "Tender Name", type: "text", validation: { required: true, maxLength: 200 } },
  { label: "Tender Id/No.", type: "text", validation: { required: true, pattern: /^[A-Za-z0-9-]+$/ } },
  { label: "Procuring Entity", type: "text", validation: { required: true } },
  { label: "Procurement Mode", type: "select", validation: { required: true, options: procurementModes } },
  { label: "Location/State", type: "text", validation: { required: true } },

  { label: " Dates", type: "heading" },
  { label: "Pre-Bid Date", type: "date", validation: { required: true, minDate: "today" } },
  { label: "Submission Date", type: "date", validation: { required: true, minDate: "today", afterField: "Pre-Bid Date" } },
  { label: "Technical Bid Opening", type: "date", validation: { required: true, afterField: "Submission Date" } },
  { label: "Financial Bid Opening", type: "date", validation: { required: true, afterField: "Technical Bid Opening" } },
  { label: "Bid Validity(Days)", type: "text", validation: { required: true, number: true, min: 1 } },

  { label: "Commercial/Security", type: "heading" },
  { label: "EMD Values", type: "text", validation: { required: true, number: true, min: 0.01 } },
  { label: "EMD Validity (Days)", type: "text", validation: { required: true, number: true, min: 1 } },
  { label: "PBG %", type: "text", validation: { required: true, number: true, min: 0, max: 10 } },
  { label: "Additional PBG Rule (APBG)", type: "text", validation: { required: false } },
  { label: "Security Deposit %", type: "text", validation: { required: true, number: true, min: 0, max: 10 } },
  { label: "Retention %", type: "text", validation: { required: true, number: true, min: 0, max: 10 } },
  { label: "Price Adjustment (Escalation)", type: "toggle", validation: { required: true } },
  { label: "Procurement Mode ", type: "select", validation: { required: true, options: baseRates } },
  { label: "Tenure (months)", type: "text", validation: { required: true, number: true, min: 1 } },
  { label: "DLP (months)", type: "text", validation: { required: true, number: true, min: 1 } },

  { label: "Eligibility Thresholds (Tender-defined)", type: "heading" },
  { label: "Avg Annual Turnover Threshold", type: "text", validation: { required: true, number: true, min: 1 } },
  { label: "Similar Work Threshold (₹ Cr)", type: "text", validation: { required: true, number: true, min: 1 } },
  { label: "Similar Work Definition", type: "text", validation: { required: true } },
  { label: "Net Worth Requirement", type: "text", validation: { required: true } },
  { label: "Liquid Assets / WC Requirement", type: "text", validation: { required: true, number: true, min: 1 } },
  { label: "Bid Capacity Formula", type: "text", validation: { required: true } },
  { label: "JV Policy", type: "text", validation: { required: true } },
  { label: "Key Personnel List", type: "textarea", validation: { required: true, minLength: 5 } },
  { label: "Key Plant / Machinery List", type: "textarea", validation: { required: true, minLength: 5 } },
];

const ReviewExtracted = ({ loggedIn,height = "70vh" }) => {
  const [fields, setFields] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const response = [
      { label: "Tender Name", value: "Lorem Ipsum", confidenceScore: 0.95, pageNo: 1 },
      { label: "Tender Id/No.", value: "TND-001", confidenceScore: 0.98, pageNo: 1 },
      { label: "Procuring Entity", value: "ABC Corp", confidenceScore: 0.92, pageNo: 1 },
      { label: "Procurement Mode", value: "EPC", confidenceScore: 0.97, pageNo: 2 },
      { label: "Location/State", value: "Maharashtra", confidenceScore: 0.93, pageNo: 2 },
      { label: "Pre-Bid Date", value: "2025-10-01", confidenceScore: 0.96, pageNo: 3 },
      { label: "Submission Date", value: "2025-10-10", confidenceScore: 0.94, pageNo: 3 },
      { label: "Price Adjustment (Escalation)", value: "Yes", confidenceScore: 0.99, pageNo: 4 },
    ];

    const apiData = fieldConfig.map((config) => {
      if (config.type === "heading") return config;
      const match = response.find((r) => r.label === config.label);
      return {
        ...config,
        value: match ? match.value : config.type === "toggle" ? "No" : "", // default toggle to "No"
        confidenceScore: match ? match.confidenceScore : null,
        pageNo: match ? match.pageNo : null,
      };
    });

    setFields(apiData);
    setEditableFields(new Array(apiData.length).fill(false));
    setErrors(new Array(apiData.length).fill(""));
  }, []);

  const validateField = (index, value) => {
    const rules = fieldConfig[index]?.validation;
    let error = "";

    if (!rules) return "";

    if (rules.required && !value?.toString().trim()) {
      error = "This field is required";
    } else if (rules.number && isNaN(value)) {
      error = "Must be a number";
    } else if (rules.pattern && !rules.pattern.test(value)) {
      error = "Invalid format";
    } else if (rules.maxLength && value.length > rules.maxLength) {
      error = `Maximum ${rules.maxLength} characters allowed`;
    } else if (rules.min && Number(value) < rules.min) {
      error = `Must be at least ${rules.min}`;
    } else if (rules.max && Number(value) > rules.max) {
      error = `Must be at most ${rules.max}`;
    } else if (rules.minLength && value.length < rules.minLength) {
      error = `Minimum ${rules.minLength} characters required`;
    } else if (rules.minDate === "today") {
      const today = new Date();
      const inputDate = new Date(value);
      if (inputDate < today.setHours(0, 0, 0, 0)) {
        error = "Date must be today or later";
      }
    } else if (rules.afterField) {
      const otherField = fields.find((f) => f.label === rules.afterField);
      if (otherField?.value && new Date(value) < new Date(otherField.value)) {
        error = `Must be on or after ${rules.afterField}`;
      }
    }

    setErrors((prev) => prev.map((err, i) => (i === index ? error : err)));
    return error;
  };

  const handleEdit = (index) => {
    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? true : editable))
    );
  };

  const handleChange = (index, newValue) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
    validateField(index, newValue);
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const handleNext = () => {
    let valid = true;
    fields.forEach((field, i) => {
      if (field.type !== "heading") {
        const error = validateField(i, field.value);
        if (error) valid = false;
      }
    });
    if (valid) {
      alert("All validations passed!");
    }
  };

  const displayedFields = !loggedIn ? fields : fields.slice(0, 5);

  return (
    <Box
      width="65vw"
      height={height}      
      display="flex"
      flexDirection="column"
      gap={2}
      position="relative"
      overflow="auto"
    >
      <Typography fontWeight="700" fontSize={24} color={colors.black_text} mb={2} mt={1}>
        Review & Qualification
      </Typography>

      {displayedFields.map((field, index) => (
        <Box key={index}>
          {field.type === "heading" ? (
            <Typography fontWeight="700" fontSize={20} color={colors.green} mb={1}>
              {field.label}
            </Typography>
          ) : (
            <>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" fontWeight={500} color={colors.black_text}>
                  {field.label}
                </Typography>
                <Box display="flex" gap={2}>
                  <IconButton disableRipple>
                    <CircleIcon style={{ color: colors.green, fontSize: "9px" }} />
                  </IconButton>
				  <IconButton size="small" disableRipple onClick={() => handleExtract(index)}>
                    <LogoutIcon style={{ color: colors.green, fontSize: "17px" }} />
                  </IconButton>
                  <IconButton size="small" disableRipple onClick={() => handleEdit(index)}>
                    <EditIcon style={{ color: colors.green, fontSize: "17px" }} />
                  </IconButton>
                </Box>
              </Box>


              {field.type === "toggle" ? (
                <Toggle
                  label={field.label}
                  value={field.value || "No"}
                  onChange={(val) => handleChange(index, val)}
                  disabled={!editableFields[index]}
                />
              ) : field.type === "text" ? (
                <CustomTextField
                  value={field.value}
                  placeholder={field.label}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={!editableFields[index]}
                  width="45vw"
                />
              ) : field.type === "select" ? (
                <CustomSelect
                  value={field.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={field.label}
                  options={field.validation?.options || []}
                  disabled={!editableFields[index]}
                />
              ) : field.type === "date" ? (
                <CustomDatePicker
                  value={field.value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Select ${field.label}`}
                  disabled={!editableFields[index]}
                  width="40vw"
                />
              ) : field.type === "textarea" ? (
                <CustomTextField
                  value={field.value}
                  placeholder={field.label}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={!editableFields[index]}
                  multiline
                  minRows={3}
                  width="45vw"
                />
              ) : null}


              {errors[index] && (
                <Typography color="error" fontSize={12} mt={0.5}>
                  {errors[index]}
                </Typography>
              )}
            </>
          )}
        </Box>
      ))}

      {!loggedIn && (
        <Box
          display="flex"
          width="30vw"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={2}
          p={4}
          sx={{
            backdropFilter: "blur(5px)",
            background: "linear-gradient(to bottom, white,grey,white)",
            borderRadius: "1rem",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: colors.green, borderRadius: "10px" }}
            onClick={handleLoginRedirect}
          >
            Login to load more fields
          </Button>
        </Box>
      )}


      <Box

        sx={{
          position: "sticky",
          bottom: 16,
          right: 32,
          display: "flex",
          marginRight: 4,
          justifyContent: "flex-end",
          mt: "auto",
        }}
      >
        <Button

          variant="contained"
          sx={{
            backgroundColor: colors.green,
            color: "#fff",
            width: "180px",
            borderRadius: "12px",
            px: 4,
            py: 1,
            boxShadow: 3,
            "&:hover": { backgroundColor: "#059669" },
          }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );

};

export default ReviewExtracted;
