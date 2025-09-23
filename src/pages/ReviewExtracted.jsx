import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomTextField from "../components/Textfield";
import CustomSelect from "../components/Select";
import CustomDatePicker from "../components/DatePicker";

const procurementModes = [
  "Open Tender",
  "Limited Tender",
  "Single Tender",
  "E-Procurement",
];

const ReviewExtracted = () => {
  const [fields, setFields] = useState([]);
  const [editableFields, setEditableFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        tenderName: "Lorem Ipsum",
        tenderId: "TND-001",
        procuringEntity: "ABC Corp",
        procurementMode: "Open Tender",
        location: "Maharashtra",
        preBidDate: "2025-10-01",
        submissionDate: "2025-10-10",
        technicalBidOpening: "2025-10-12",
        financialBidOpening: "2025-10-15",
        bidValidity: "30",
        emdValues: "1000",
        emdValidity: "60",
      };

      const apiData = [
        { label: "Tender Name", type: "text", value: response.tenderName },
        { label: "Tender Id/No.", type: "text", value: response.tenderId },
        { label: "Procuring Entity", type: "text", value: response.procuringEntity },
        { label: "Procurement Mode", type: "select", value: response.procurementMode },
        { label: "Location/State", type: "text", value: response.location },
        { label: "Pre-Bid Date", type: "date", value: response.preBidDate },
        { label: "Submission Date", type: "date", value: response.submissionDate },
        { label: "Technical Bid Opening", type: "date", value: response.technicalBidOpening },
        { label: "Financial Bid Opening", type: "date", value: response.financialBidOpening },
        { label: "Bid Validity(Days)", type: "text", value: response.bidValidity },
        { label: "EMD Values", type: "text", value: response.emdValues },
        { label: "EMD Validity (Days)", type: "text", value: response.emdValidity },
      ];

      setFields(apiData);
      setEditableFields(new Array(apiData.length).fill(false)); 
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    console.log("Editing field at index:", index);
    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? true : editable))
    );
  };
  console.log("Editable Fields State:", editableFields);

  const handleChange = (index, newValue) => {
    setFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, value: newValue } : field))
    );
  };

  return (
    <Box width={400} display="flex" flexDirection="column" gap={2}>
      {fields.map((field, index) => (
        <Box key={index}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="body1" fontWeight={500}>
              {field.label}
            </Typography>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: green[500],
                ml: 1,
              }}
            />
             <IconButton
              size="small"
              sx={{ ml: 0.5 }}
              onClick={() => handleEdit(index)}
            >
              <LogoutIcon fontSize="small" color="success" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ ml: 0.5 }}
              onClick={() => handleEdit(index)}
            >
              <EditIcon fontSize="small" color="success" />
            </IconButton>
          </Box>

         
          {field.type === "text" && (
            <CustomTextField
              value={field.value}
              placeholder={field.label}
              onChange={(e) => handleChange(index, e.target.value)}
              disabled={!editableFields[index]} 
            />
          )}

          {field.type === "select" && (
            <CustomSelect
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Select ${field.label}`}
              options={procurementModes}
              disabled={!editableFields[index]}
            />
          )}

          {field.type === "date" && (
            <CustomDatePicker
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Select ${field.label}`}
              disabled={!editableFields[index]}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ReviewExtracted;
