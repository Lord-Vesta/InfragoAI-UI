import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, IconButton, Typography, Button, Icon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import CustomTextField from "../components/TextField";
import CustomSelect from "../components/Select";
import CustomDatePicker from "../components/DatePicker";
import colors from "../assets/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomButton from "../components/Button";
import Toggle from "../components/toggleButton";
import { userContext } from "../context/ContextProvider";
import { useLocation, useNavigate, useParams } from "react-router";
import { downloadPdf, updateProjectStatus } from "../Utils/Api.utils";
import { toTitleCase } from "../Utils/stringUtils";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AlertTooltip from "../components/Tooltip";
import Tooltip from "@mui/material/Tooltip";
import GetAppIcon from "@mui/icons-material/GetApp";
import { updateEditedFields, getExtractedInputs } from "../Utils/Api.utils";
import PdfViewer from "../components/PdfViewer";
import { toast } from "react-toastify";
import pdfImage from "../assets/PDF_file_icon.svg.png";
import GeneratePDF from "../components/GeneratePdf";
import DownloadIcon from "@mui/icons-material/Download";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const procurementModes = ["EPC", "BOQ", "PAR"];
const baseRates = ["DSR", "State SSR"];

const fieldConfig = [
  {
    label: "Tender Name",
    type: "text",
    validation: { required: true, maxLength: 200 },
  },
  {
    label: "tender ID",
    type: "text",
    validation: { required: true, pattern: /^[A-Za-z0-9-]+$/ },
  },
  { label: "Procuring Entity", type: "text", validation: { required: true } },
  {
    label: "Procurement Mode",
    type: "select",
    validation: { required: true, options: procurementModes },
  },
  { label: "Location", type: "text", validation: { required: true } },

  { label: " Dates", type: "heading" },
  {
    label: "pre-Bid-Date",
    type: "date",
    validation: { required: true, minDate: "today" },
  },
  {
    label: "submission-Deadline",
    type: "date",
    validation: {
      required: true,
      minDate: "today",
      afterField: "Pre-Bid Date",
    },
  },
  {
    label: "technical-Bid-Opening",
    type: "date",
    validation: { required: true, afterField: "Submission Date" },
  },
  {
    label: "financial-Bid-Opening",
    type: "date",
    validation: { required: true, afterField: "Technical Bid Opening" },
  },
  {
    label: "bid-Validity",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },

  { label: "Commercial/Security", type: "heading" },
  {
    label: "EMD Value",
    type: "text",
    validation: { required: true, number: true, min: 0.01 },
  },
  {
    label: "EMD Validity",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },
  {
    label: "PBG %",
    type: "text",
    validation: { required: true, number: true, min: 0, max: 10 },
  },
  {
    label: "additional PBG Rule",
    type: "text",
    validation: { required: false },
  },
  {
    label: "security Deposit %",
    type: "text",
    validation: { required: true, number: true, min: 0, max: 10 },
  },
  {
    label: "Retention %",
    type: "text",
    validation: { required: true, number: true, min: 0, max: 10 },
  },
  {
    label: "price Adjustment",
    type: "toggle",
    validation: { required: true },
  },
  {
    label: "Procurement Mode ",
    type: "select",
    validation: { required: true, options: baseRates },
  },
  {
    label: "tenure(months)",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },
  {
    label: "DLP(months)",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },

  { label: "Eligibility Thresholds (Tender-defined)", type: "heading" },
  {
    label: "avg annual turnover threshold",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },
  {
    label: "similar work threshold",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },
  {
    label: "Similar Work Definition",
    type: "text",
    validation: { required: true },
  },
  {
    label: "Net Worth Requirement",
    type: "text",
    validation: { required: true },
  },
  {
    label: "Liquid Assets / WC Requirement",
    type: "text",
    validation: { required: true, number: true, min: 1 },
  },
  {
    label: "Bid Capacity",
    type: "text",
    validation: { required: true },
  },
  { label: "JV Policy", type: "text", validation: { required: true } },
  {
    label: "Evaluation Process",
    type: "textarea",
    validation: { required: true, minLength: 5 },
  },
  {
    label: "key Personnel Requirement",
    type: "textarea",
    validation: { required: true, minLength: 5 },
  },
  {
    label: "Key Plant / Machinery List",
    type: "textarea",
    validation: { required: true, minLength: 5 },
  },
];

const ReviewExtracted = ({ loggedIn, height = "85vh", extractedData }) => {
  const [fields, setFields] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const [pdfBuffer, setPdfBuffer] = useState(null);
  const { jwtToken } = useContext(userContext);
  const { project_id } = useParams();
  const location = useLocation().pathname;

  const navigate = useNavigate();

  const handleDownloadPdf = async () => {
    try {
      const response = await downloadPdf(project_id);
      const arrayBuffer = await response.arrayBuffer();
      setPdfBuffer(arrayBuffer);
    } catch (error) {
      toast.error(error);
    }
  };

  const fieldRefs = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let dataArray = [];

        if (!extractedData) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await getExtractedInputs(project_id);
          dataArray = Array.isArray(response.data) ? response.data : [];
        } else {
          dataArray = extractedData.data;
        }

        const normalizedResponse = dataArray.map((item) => ({
          ...item,
          normalizedKey: item.field_key
            .toLowerCase()
            .replace(/[\s-/_()]+/g, ""),
        }));

        const apiData = fieldConfig.map((config) => {
          if (config.type === "heading") return config;

          const normalizedLabel = config.label
            .toLowerCase()
            .replace(/[\s-/_()]+/g, "");

          const match = normalizedResponse.find(
            (r) => r.normalizedKey === normalizedLabel
          );

          let value = match
            ? match.edited_value ?? match.field_value
            : config.type === "toggle"
            ? "No"
            : "";

          if (
            match &&
            config.type === "date" &&
            /^\d{2}\/\d{2}\/\d{4}$/.test(value)
          ) {
            const [day, month, year] = value.split("/");
            value = `${year}-${month}-${day}`;
          }

          return {
            ...config,
            value,
            confidenceScore: match ? parseFloat(match.confidence_score) : null,
            pageNo: match ? match.source_page_number : null,
            snippet: match ? match.snippet : "",
            extraction_id: match ? match.extraction_id : null,
          };
        });

        setFields(apiData);
        handleDownloadPdf();
        setEditableFields(new Array(apiData.length).fill(false));
        setErrors(new Array(apiData.length).fill(""));
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [extractedData]);

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
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, prevValue: field.value } : field
      )
    );

    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? true : editable))
    );

    setTimeout(() => {
      const input = fieldRefs.current[index];
      if (input) {
        input.focus();
        const length = input.value?.length || 0;
        input.setSelectionRange(length, length);
      }
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // const handleEdit = (index) => {

  //   setEditableFields((prev) =>
  //     prev.map((editable, i) => (i === index ? true : editable))
  //   );

  //   setTimeout(() => {
  //     const input = fieldRefs.current[index];

  //     if (input) {
  //       input.focus();
  //       const length = input.value?.length || 0;
  //       input.setSelectionRange(length, length);
  //     }
  //     input?.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }, 100);
  // };
  const handleCancel = (index) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index
          ? {
              ...field,
              value: field.prevValue,
              isEdited: false,
              prevValue: undefined,
            }
          : field
      )
    );

    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? false : editable))
    );

    setErrors((prev) => prev.map((err, i) => (i === index ? "" : err)));
  };

  const handleChange = (index, newValue) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index ? { ...field, value: newValue, isEdited: true } : field
      )
    );
    validateField(index, newValue);
  };
  const handleBlur = (index) => {
    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? false : editable))
    );
  };
  const handleExtract = (index) => {
    const pageNo = fields[index]?.pageNo;
    if (pageNo && !isPdfViewerOpen) {
      setPdfPageNumber(pageNo);
      setIsPdfViewerOpen(true);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const handleNext = async () => {
    const editedFields = fields
      .filter(
        (field) =>
          field.value !== undefined && field.value !== "" && field.isEdited
      )
      .map((field) => ({
        extraction_id: field.extraction_id,
        edited_value: field.value,
      }));

    const payload = { fields: editedFields };

    if (jwtToken) {
      try {
        const response = await updateEditedFields(payload, project_id);
        await updateProjectStatus(
          {
            completion_percentage: location
              .toLowerCase()
              .includes("reviewextracted")
              ? 40
              : 80,
            project_status: "in progress",
          },
          response.project_id || project_id
        );
        location.toLowerCase().includes("reviewextracted")
          ? navigate(`/QualificationInputs/${project_id}`)
          : navigate(`/BGsummary/${project_id}`);
      } catch (error) {
        console.error("API Error:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const displayedFields = jwtToken ? fields : fields.slice(0, 5);
  return loading ? (
    <Box
      width="100%"
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={18} color={colors.green}>
        Loading...
      </Typography>
    </Box>
  ) : (
    <Box
      width="100%"
      height={height}
      display="flex"
      flexDirection="column"
      gap={2}
      overflow="auto"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        gap={1}
        mb={2}
        mt={1}
      >
        <Typography fontWeight="700" fontSize={24} color={colors.black_text}>
          Review & Qualification{" "}
        </Typography>
        {jwtToken && (
          <Box display="flex" gap={2} mx={2}>
            <Button
              variant="outlined"
              sx={{
                color: colors.green,
                borderColor: colors.green,
                borderRadius: "4px",
                textTransform: "capitalize",
                "&:hover": {
                  borderColor: colors.green,
                },
              }}
              onClick={() => {
                const pdfData = fields
                  .filter((f) => f.type !== "heading")
                  .map((f) => ({
                    field_key: f.label,
                    field_value: f.value,
                    confidence_score: f.confidenceScore ?? "",
                    source_page_number: f.pageNo ?? "-",
                  }));

              GeneratePDF(pdfData, "extracted_data.pdf");
            }}
          >
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ p: 0, color: colors.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DownloadIcon />
              </Box>
              <Typography >Download Bid Data</Typography>
            </Box>
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: colors.green,
              borderColor: colors.green,
              borderRadius: "4px",
              textTransform: "capitalize",
              "&:hover": {
                borderColor: colors.green,
              },
            }}
            onClick={() => {
              if (!isPdfViewerOpen) {
                setIsPdfViewerOpen(true);
              }
            }}
          >
            <Box sx={{ display: "flex", gap: "8px" }}>
              <IconButton sx={{ p: 0, color: colors.green }}>
                <FileCopyIcon />
              </IconButton>
              <Typography>View pdf</Typography>
            </Box>
          </Button>
        </Box>
      </Box>

      {displayedFields.map((field, index) => (
        <Box key={index}>
          {field.type === "heading" ? (
            <Typography
              fontWeight="700"
              fontSize={20}
              color={colors.green}
              mb={1}
            >
              {field.label}
            </Typography>
          ) : (
            <>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={colors.black_text}
                >
                  {toTitleCase(field.label)}
                </Typography>

                <Box display="flex" gap={2} alignItems="center">
                  <IconButton disableRipple>
                    <CircleIcon
                      style={{
                        color: (() => {
                          const score = field.confidenceScore ?? 10;
                          if (score >= 0.8) return "green";
                          if (score >= 0.5) return "orange";
                          return "red";
                        })(),
                        fontSize: "9px",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    disableRipple
                    onClick={() => handleExtract(index)}
                  >
                    <LogoutIcon
                      style={{ color: colors.green, fontSize: "17px" }}
                    />
                  </IconButton>

                  <IconButton
                    size="small"
                    disableRipple
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon
                      style={{ color: colors.green, fontSize: "17px" }}
                    />
                  </IconButton>
                  {(!field.value ||
                    field.value === "" ||
                    field.value === "Not found in document") && (
                    <AlertTooltip
                      title="No value found for particular label in document"
                      type="error"
                    >
                      <ErrorOutlineIcon
                        style={{
                          color: "red",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    </AlertTooltip>
                  )}
                </Box>
              </Box>

              {field.type === "toggle" ? (
                <Toggle
                  label={field.label}
                  value={field.value}
                  onChange={(val) => handleChange(index, val ? "yes" : "no")}
                  // disabled={!editableFields[index]}
                />
              ) : field.type === "text" ? (
                <span>
                  {(() => {
                    const cleanedText = field.value
                      ? field.value.replace(/\s+/g, " ")
                      : "";
                    const isLongText = cleanedText.length > 100;

                    return (
                      <Box display="flex" alignItems="center" gap={1}>
                        <CustomTextField
                          value={field.value}
                          ref={(el) => (fieldRefs.current[index] = el)}
                          placeholder={field.label}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onBlur={() => handleBlur(index)}
                          disableOnBlur={true}
                          disabled={!editableFields[index]}
                          width="45vw"
                          multiline={isLongText}
                          minRows={
                            isLongText ? Math.ceil(field.value.length / 80) : 1
                          }
                          tooltip={field.snippet}
                        />

                        {editableFields[index] && (
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleCancel(index)}
                          >
                            Cancel
                          </Button>
                        )}
                      </Box>
                    );
                  })()}
                </span>
              ) : field.type === "select" ? (
                <span>
                  <CustomSelect
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder={field.label}
                    onBlur={() => handleBlur(index)}
                    options={field.validation?.options || []}
                    disabled={!editableFields[index]}
                    tooltipText={field.snippet}
                  />
                </span>
              ) : field.type === "date" ? (
                <span>
                  <CustomDatePicker
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onBlur={() => handleBlur(index)}
                    placeholder={`Select ${field.label}`}
                    disabled={!editableFields[index]}
                    width="40vw"
                    tooltipText={field.snippet}
                  />
                </span>
              ) : field.type === "textarea" ? (
                <span>
                  <CustomTextField
                    value={field.value}
                    placeholder={field.label}
                    onChange={(e) => handleChange(index, e.target.value)}
                    disabled={!editableFields[index]}
                    multiline
                    minRows={3}
                    width="45vw"
                    ref={(el) => (fieldRefs.current[index] = el)}
                    tooltip={field.snippet}
                  />
                </span>
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

      {!jwtToken && (
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

      {jwtToken && (
        <Box
          sx={{
            position: "sticky",
            bottom: "1rem",
            right: 32,
            display: "flex",
            marginRight: 4,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton label="Next" onClick={handleNext} />
        </Box>
      )}

      {isPdfViewerOpen && pdfBuffer && pdfBuffer.byteLength > 0 && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            background: "rgba(0,0,0,0.15)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "stretch",
          }}
          onClick={() => {
            setIsPdfViewerOpen(false);
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
              position: "relative",
              borderTopLeftRadius: "2rem",
              borderBottomLeftRadius: "2rem",
              boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
              bgcolor: "white",
              transition: "transform 0.3s ease-in-out",
              transform: isPdfViewerOpen ? "translateX(0)" : "translateX(100%)",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <PdfViewer
              fileUrl={
                pdfBuffer.slice
                  ? pdfBuffer.slice(0)
                  : new Uint8Array(pdfBuffer).buffer
              }
              initialPage={pdfPageNumber}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ReviewExtracted;
