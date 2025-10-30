import React, { useState, useEffect, useContext, use } from "react";
import { Box, Icon, Paper, Typography, Button } from "@mui/material";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import CustomTextField from "../components/TextField";
import CustomSelect from "../components/Select";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  getQualificationInputs,
  qualificationInputs,
  updateProjectStatus,
} from "../Utils/Api.utils";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import { GenerateQualificationPDF } from "../components/GenerateQualificationPDF";
import { useParams, useNavigate, useLocation } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import DownloadIcon from "@mui/icons-material/Download";

const QualificationInputs = ({ height = "85vh", initialData }) => {
  const [projects, setProjects] = useState([
    { name: "", scope: "", year: "", value: "" },
  ]);
  const [turnoverEditable, setTurnoverEditable] = useState(false);
  const [litigationEditable, setLitigationEditable] = useState(false);
  const location = useLocation().pathname;

  const [projectsEditable, setProjectsEditable] = useState(
    projects.map(() => false)
  );
  const [numericValues, setNumericValues] = useState({
    Turnover_3_years: "",
    Turnover_5_years: "",
    netWorth: "",
    workingCapital: "",
    workInHand: "",
    bgLimit: "",
    bgUtilized: "",
    bgAvailable: "",
    quotedPrice: "",
  });
  const [litigationStatus, setLitigationStatus] = useState("No");
  const [currencyValues, setCurrencyValues] = useState({
    Turnover_3_years: "Crore",
    Turnover_5_years: "Crore",
    netWorth: "Crore",
    workingCapital: "Crore",
    workInHand: "Crore",
    bgLimit: "Crore",
    bgUtilized: "Crore",
    bgAvailable: "Crore",
    quotedPrice: "Crore",
  });
  const [litigationDetails, setLitigationDetails] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [editableFields, setEditableFields] = useState({
    Turnover_3_years: false,
    Turnover_5_years: false,
    netWorth: false,
    workingCapital: false,
    workInHand: false,
    bgLimit: false,
    bgUtilized: false,
    bgAvailable: false,
    quotedPrice: false,
  });
  const [errors, setErrors] = useState({});
  const [qualificationApiData, setQualificationApiData] = useState(null);
  const [showUpload, setShowUpload] = useState(
    !initialData?.registration_file && !qualificationApiData?.registration_file
  );
  const { project_id } = useParams();
  const navigate = useNavigate();
  const mergedData =
    qualificationApiData?.data &&
    Object.keys(qualificationApiData.data).length > 0
      ? qualificationApiData
      : initialData;
  const validateNumericField = (field, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else if (!/^[0-9]*$/.test(value)) {
      error = "Only numeric values allowed";
    } else if (Number(value) <= 0) {
      error = "Value must be greater than 0";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };
  const validateYearField = (year) => {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 5; // past 5 years
    if (!year) return "This field is required";
    if (!/^\d{4}$/.test(year)) return "Enter a valid 4-digit year";
    if (Number(year) < minYear || Number(year) > currentYear)
      return `Year must be between ${minYear} and ${currentYear}`;
    return "";
  };

  useEffect(() => {
    if (mergedData) {
      setNumericValues({
        Turnover_3_years:
          mergedData?.data?.turnover_past_3_years?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.turnover_past_3_years?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.turnover_past_3_years?.edited_value / 100000
              ).toString() || "",
        Turnover_5_years:
          mergedData?.data?.turnover_past_5_years?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.turnover_past_5_years?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.turnover_past_5_years?.edited_value / 100000
              ).toString() || "",
        netWorth:
          mergedData?.data?.net_worth?.edited_value / 10000000 >= 1
            ? (mergedData?.data?.net_worth?.edited_value / 10000000).toString()
            : (mergedData?.data?.net_worth?.edited_value / 100000).toString() ||
              "",
        workingCapital:
          mergedData?.data?.working_capital?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.working_capital?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.working_capital?.edited_value / 100000
              ).toString() || "", // 🟢 added .data and .original_value
        workInHand:
          mergedData?.data?.work_in_hand?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.work_in_hand?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.work_in_hand?.edited_value / 100000
              ).toString() || "",
        bgLimit:
          mergedData?.data?.bg_limit_sanctioned?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.bg_limit_sanctioned?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.bg_limit_sanctioned?.edited_value / 100000
              ).toString() || "",
        bgUtilized:
          mergedData?.data?.bg_utilized?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.bg_utilized?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.bg_utilized?.edited_value / 100000
              ).toString() || "",
        bgAvailable:
          mergedData?.data?.bg_available?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.bg_available?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.bg_available?.edited_value / 100000
              ).toString() || "",
        quotedPrice:
          mergedData?.data?.quoted_price?.edited_value / 10000000 >= 1
            ? (
                mergedData?.data?.quoted_price?.edited_value / 10000000
              ).toString()
            : (
                mergedData?.data?.quoted_price?.edited_value / 100000
              ).toString() || "",
      });
      setCurrencyValues({
        Turnover_3_years:
          mergedData?.data?.turnover_past_3_years?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        Turnover_5_years:
          mergedData?.data?.turnover_past_5_years?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        netWorth:
          mergedData?.data?.net_worth?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        workingCapital:
          mergedData?.data?.working_capital?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        workInHand:
          mergedData?.data?.work_in_hand?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        bgLimit:
          mergedData?.data?.bg_limit_sanctioned?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        bgUtilized:
          mergedData?.data?.bg_utilized?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        bgAvailable:
          mergedData?.data?.bg_available?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
        quotedPrice:
          mergedData?.data?.quoted_price?.edited_value / 10000000 >= 1
            ? "Crore"
            : "Lakhs",
      });

      setLitigationStatus(
        mergedData?.data?.litigation_blacklist_status?.edited_value === "True"
          ? "Yes"
          : "No"
      );
      setLitigationDetails(
        mergedData?.data?.litigation_blacklist_details?.edited_value || ""
      );

      if (
        mergedData?.similar_projects &&
        Array.isArray(mergedData.similar_projects)
      ) {
        const formattedProjects = mergedData?.similar_projects.map((proj) => ({
          similar_project_id: proj.similar_project_id,
          name: proj.is_edited ? proj.edited_name : proj.name,
          scope: proj.is_edited ? proj.edited_scope : proj.scope,
          year: proj.is_edited ? proj.edited_year || proj.year : proj.year,
          value: proj.is_edited ? proj.edited_value || proj.value : proj.value,
        }));
        setProjects(formattedProjects);
      }
      setShowUpload(!mergedData?.registration_file);
    }
  }, [mergedData]);

  const handleFetchQualificationInputs = async () => {
    try {
      const response = await getQualificationInputs(project_id);
      if (response) {
        setQualificationApiData(response);
      }
    } catch (error) {
      toast.error("Error fetching qualification inputs");
    }
  };

  useEffect(() => {
    handleFetchQualificationInputs();
  }, [project_id]);

  const isInitialData = Boolean(
    mergedData && Object.keys(mergedData).length > 0
  );

  const handleAddProject = () => {
    setProjects([...projects, { name: "", scope: "", year: "", value: "" }]);
  };
  const validateAllFields = () => {
    let valid = true;
    const newErrors = {};

    // Validate numeric fields
    Object.keys(numericValues).forEach((key) => {
      const value = numericValues[key];
      if (!value) {
        newErrors[key] = "This field is required";
        valid = false;
      } else if (!/^[0-9]*$/.test(value)) {
        newErrors[key] = "Only numeric values allowed";
        valid = false;
      } else if (Number(value) <= 0) {
        newErrors[key] = "Value must be greater than 0";
        valid = false;
      }
    });

    // Validate similar projects
    const projectErrors = projects.map((proj) => {
      const projErr = {};
      ["name", "scope", "year", "value"].forEach((field) => {
        if (!proj[field]) {
          projErr[field] = "Required";
          valid = false;
        }
        if (field === "year") {
          const yearError = validateYearField(proj[field]);
          if (yearError) {
            projErr[field] = yearError;
            valid = false;
          }
        }
      });
      return projErr;
    });

    setErrors(newErrors);
    setProjects((prev) =>
      prev.map((proj, idx) => ({
        ...proj,
        errors: projectErrors[idx],
      }))
    );

    // Validate file if required
    if (!certificateFile && showUpload) {
      toast.error("Please upload registration/certificate file");
      valid = false;
    }

    return valid;
  };

  const handleNext = async () => {
    try {
      // if (projectStatus < 60) {
      const payload = {
        turnover_past_3_years:
          currencyValues.Turnover_3_years === "Crore"
            ? numericValues.Turnover_3_years * 10000000
            : numericValues.Turnover_3_years * 100000,
        turnover_past_5_years:
          currencyValues.Turnover_5_years === "Crore"
            ? numericValues.Turnover_5_years * 10000000
            : numericValues.Turnover_5_years * 100000,
        net_worth:
          currencyValues.netWorth === "Crore"
            ? numericValues.netWorth * 10000000
            : numericValues.netWorth * 100000,
        working_capital:
          currencyValues.workingCapital === "Crore"
            ? numericValues.workingCapital * 10000000
            : numericValues.workingCapital * 100000,
        work_in_hand:
          currencyValues.workInHand === "Crore"
            ? numericValues.workInHand * 10000000
            : numericValues.workInHand * 100000,
        bg_limit_sanctioned:
          currencyValues.bgLimit === "Crore"
            ? numericValues.bgLimit * 10000000
            : numericValues.bgLimit * 100000,
        bg_utilized:
          currencyValues.bgUtilized === "Crore"
            ? numericValues.bgUtilized * 10000000
            : numericValues.bgUtilized * 100000,
        bg_available:
          currencyValues.bgAvailable === "Crore"
            ? numericValues.bgAvailable * 10000000
            : numericValues.bgAvailable * 100000,
        quoted_price:
          currencyValues.quotedPrice === "Crore"
            ? numericValues.quotedPrice * 10000000
            : numericValues.quotedPrice * 100000,
        litigation_blacklist_status:
          litigationStatus === "Yes" ? "True" : "False",
        litigation_blacklist_details: litigationDetails,
        similar_projects: JSON.stringify(projects),
      };

      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      if (certificateFile) {
        formData.append("registration_certification", certificateFile);
      }

      const response = await qualificationInputs(formData, project_id);
      if (response) {
        await updateProjectStatus(
          {
            completion_percentage: location
              .toLowerCase()
              .includes("qualificationinputs")
              ? 60
              : 80,
            project_status: "in progress",
          },
          response.project_id
        );

        if (location.toLowerCase().includes("qualificationinputs")) {
          navigate(`/technicalConfirmation/${project_id}`);
        } else {
          navigate(`/bgsummary/${project_id}`);
        }
      }
      // } else {
      //   if (location.toLowerCase().includes("qualificationinputs")) {
      //     navigate(`/TechnicalConfirmation/${project_id}`);
      //   } else {
      //     navigate(`/BGsummary/${project_id}`);
      //   }
      // }
    } catch (err) {
      if (err.response) {
        console.error("API Error Response:", err.response.data);
      } else {
        console.error(" Request Setup Error:", err.message);
      }
    }
  };
  const handleChange = (field, value) => {
    const numericFields = [
      "turnover3",
      "turnover5",
      "netWorth",
      "workingCapital",
      "workInHand",
      "bgLimit",
      "bgUtilized",
      "bgAvailable",
      "quotedPrice",
    ];
    const floatRegex = /^[0-9]*\.?[0-9]*$/;

    if (
      numericFields.includes(field) &&
      value !== "" &&
      !floatRegex.test(value)
    ) {
      return;
    }

    const updatedValues = { ...numericValues, [field]: value };

    if (field === "bgLimit" || field === "bgUtilized") {
      const limit = Number(updatedValues.bgLimit) || 0;
      const utilized = Number(updatedValues.bgUtilized) || 0;

      const limitNumbericValue =
        limit * (currencyValues.bgLimit === "Crore" ? 10000000 : 100000);
      const utilizedNumericValue =
        utilized * (currencyValues.bgUtilized === "Crore" ? 10000000 : 100000);
      const bgAvaliableNumeric = limitNumbericValue - utilizedNumericValue;
      updatedValues.bgAvailable = Math.max(
        (limitNumbericValue - utilizedNumericValue) / 10000000 >= 1
          ? (bgAvaliableNumeric / 10000000).toString()
          : (bgAvaliableNumeric / 100000).toString(),
        0
      ).toString();
      setCurrencyValues((prev) => ({
        ...prev,
        bgAvailable: bgAvaliableNumeric >= 10000000 ? "Crore" : "Lakhs",
      }));
    }

    setNumericValues(updatedValues);

    // Set error
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
    } else if (parseFloat(value) <= 0) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Value must be greater than 0",
      }));
    } else {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const handleDeleteFile = () => {
    setCertificateFile(null);
    setShowUpload(true);
    toast.success("File deleted successfully");
  };

  const handleCurrencyChange = (field, value) => {
    // const updatedValues = { ...numericValues, [field]: value };
    // if (field === "bgLimit" || field === "bgUtilized") {
    //   const limit = Number(updatedValues.bgLimit) || 0;
    //   const utilized = Number(updatedValues.bgUtilized) || 0;

    //   const limitNumbericValue =
    //     limit * (currencyValues.bgLimit === "Crore" ? 10000000 : 100000);
    //   const utilizedNumericValue =
    //     utilized * (currencyValues.bgUtilized === "Crore" ? 10000000 : 100000);
    //     console.log("Limit:", limitNumbericValue, "Utilized:", utilizedNumericValue);
    //   const bgAvaliableNumeric = limitNumbericValue - utilizedNumericValue;
    //   updatedValues.bgAvailable = Math.max(
    //       (limitNumbericValue - utilizedNumericValue) / 10000000 >= 1
    //         ? (bgAvaliableNumeric / 10000000).toString()
    //         : (bgAvaliableNumeric / 100000).toString(),
    //       0
    //     ).toString();
    //   setCurrencyValues((prev) => ({
    //     ...prev,
    //     [field]: value,
    //     bgAvailable: bgAvaliableNumeric >= 10000000 ? "Crore" : "Lakhs",
    //   }));
    //   // setNumericValues(updatedValues);
    // } else {
    //   setCurrencyValues((prev) => ({
    //     ...prev,
    //     [field]: value,
    //   }));
    // }

    setCurrencyValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    // setNumericValues(updatedValues);
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        gap={3}
        height={height}
        position="relative"
        overflow="auto"
      >
        <Typography
          fontWeight="600"
          fontSize={24}
          color={colors.black_text}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {mergedData ? "Review " : "Provide "}
          Qualification Inputs{" "}
          {initialData ? (
            <Box component="span" sx={{ display: "inline-block" }}>
              {/* <GetAppIcon
              style={{ fontSize: 20, cursor: "pointer", color: "#1976d2" }}
              onClick={() =>
                GenerateQualificationPDF(
                  numericValues,
                  litigationStatus,
                  litigationDetails,
                  projects
                )
              }
            /> */}
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
                onClick={() =>
                  GenerateQualificationPDF(
                    numericValues,
                    litigationStatus,
                    litigationDetails,
                    projects
                  )
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "16px",
                  }}
                >
                  <Box
                    sx={{
                      p: 0,
                      color: colors.green,
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "2px",
                    }}
                  >
                    <DownloadIcon />
                  </Box>
                  <Typography>Download User Input Data</Typography>
                </Box>
              </Button>
            </Box>
          ) : null}
        </Typography>

        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography fontWeight="400">Avg Annual Turnover (₹ Cr)</Typography>

            {/* Edit Icon */}
            {isInitialData && (
              <IconButton
                size="small"
                sx={{ ml: 1, color: "#0FB97D" }}
                onClick={() => setTurnoverEditable(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  backgroundColor: colors.green,
                  color: "#fff",
                  padding: "9px 16px",
                  borderRadius: "12px 0 0 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Past 3 years
              </Box>

              <Box
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0 12px 12px 0 !important",
                    backgroundColor: "#fff",
                  },
                }}
              >
                <CustomTextField
                  placeholder="Enter value"
                  width="100%"
                  value={numericValues.Turnover_3_years}
                  onChange={(e) =>
                    handleChange("Turnover_3_years", e.target.value)
                  }
                  //               error={!!errors.Turnover_3_years}
                  // helperText={errors.Turnover_3_years}
                  disabled={isInitialData}
                  showIcon={true}
                  keyValue={"Turnover_3_years"}
                  setEditableFields={setEditableFields}
                />
              </Box>
            </Box>
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              value={currencyValues.Turnover_3_years}
              disabled={isInitialData}
              onChange={(e) =>
                handleCurrencyChange("Turnover_3_years", e.target.value)
              }
              editableFields={editableFields.Turnover_3_years}
              keyValue={"Turnover_3_years"}
            />
            {/* </Box>
      <Box display="flex" alignItems="center" gap={2}> */}

            <Box display="flex" alignItems="center" gap={1}>
              <Box display="flex">
                <Box
                  sx={{
                    backgroundColor: colors.green,
                    color: "#fff",
                    padding: "9px 16px",
                    borderRadius: "12px 0 0 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  Past 5 years
                </Box>
                <Box
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0 12px 12px 0 !important",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  <CustomTextField
                    placeholder="Enter value"
                    width="100%"
                    value={numericValues.Turnover_5_years}
                    onChange={(e) =>
                      handleChange("Turnover_5_years", e.target.value)
                    }
                    error={!!errors.turnover5}
                    helperText={errors.turnover5}
                    disabled={isInitialData}
                    showIcon={true}
                    setEditableFields={setEditableFields}
                    keyValue={"Turnover_5_years"}
                  />
                </Box>
              </Box>
              <CustomSelect
                options={["Crore", "Lakhs"]}
                placeholder="Crore"
                width="100px"
                value={currencyValues.Turnover_5_years}
                disabled={isInitialData}
                onChange={(e) =>
                  handleCurrencyChange("Turnover_5_years", e.target.value)
                }
                editableFields={editableFields.Turnover_5_years}
                keyValue={"Turnover_5_years"}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography fontWeight="400" fontSize={16}>
            Similar Projects Executed
          </Typography>

          {projects.map((project, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: "12px",
                border: "1px solid #E0E0E0",
                bgcolor: "#fff",
                width: "80%",
                position: "relative",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
                onClick={() => {
                  const updated = projects.filter((_, i) => i !== index);
                  setProjects(updated);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Box sx={{ display: "flex" }}>
                <Typography fontWeight="700" fontSize={18} mb={2}>
                  Project details {index + 1}
                </Typography>
                {isInitialData && (
                  <IconButton
                    onClick={() => {
                      const updated = [...projectsEditable];
                      updated[index] = true;
                      setProjectsEditable(updated);
                    }}
                    size="small"
                    sx={{ ml: 1, color: "#0FB97D", mb: 2 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {["name", "scope", "year", "value"].map((field) => (
                <Box
                  key={field}
                  display="flex"
                  alignItems={field === "scope" ? "flex-start" : "center"}
                  gap={2}
                  mb={1}
                >
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    width="80px"
                    mt={field === "scope" ? "6px" : 0}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </Typography>
                  <CustomTextField
                    placeholder={`Enter Project ${field}`}
                    width="100%"
                    value={project[field]}
                    disabled={!projectsEditable[index] && isInitialData}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (
                        (field === "year" || field === "value") &&
                        value !== "" &&
                        !/^[0-9]*$/.test(value)
                      ) {
                        return;
                      }

                      const updated = [...projects];
                      updated[index][field] = value;
                      setProjects(updated);
                    }}
                    showIcon={true}
                    multiline={field === "scope"}
                    minRows={field === "scope" ? 3 : 1}
                    type={
                      field === "year" || field === "value" ? "number" : "text"
                    }
                    keyValue={`${field}-${index}`}
                    setEditableFields={setEditableFields}
                  />
                </Box>
              ))}
            </Paper>
          ))}

          <Box mb={2}>
            <CustomButton label="Add More" onClick={handleAddProject} />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="Net Worth (CA certified)"
              label="Net Worth (CA certified)"
              width="48vw"
              value={numericValues.netWorth}
              onChange={(e) => handleChange("netWorth", e.target.value)}
              error={!!errors.netWorth}
              helperText={errors.netWorth}
              showIcon={true}
              disabled={isInitialData}
              keyValue={"netWorth"}
              setEditableFields={setEditableFields}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.netWorth}
              disabled={isInitialData}
              onChange={(e) => handleCurrencyChange("netWorth", e.target.value)}
              editableFields={editableFields.netWorth}
              keyValue={"netWorth"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="Working Capital / Liquid Assets"
              label="Working Capital / Liquid Assets"
              width="48vw"
              value={numericValues.workingCapital}
              onChange={(e) => handleChange("workingCapital", e.target.value)}
              error={!!errors.workingCapital}
              helperText={errors.workingCapital}
              disabled={isInitialData}
              showIcon={true}
              keyValue={"workingCapital"}
              setEditableFields={setEditableFields}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.workingCapital}
              disabled={isInitialData}
              onChange={(e) =>
                handleCurrencyChange("workingCapital", e.target.value)
              }
              editableFields={editableFields.workingCapital}
              keyValue={"workingCapital"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="Work in Hand (B value for formula)"
              label="Work in Hand (B value for formula)"
              width="48vw"
              value={numericValues.workInHand}
              onChange={(e) => handleChange("workInHand", e.target.value)}
              error={!!errors.workInHand}
              helperText={errors.workInHand}
              disabled={isInitialData}
              showIcon={true}
              keyValue={"workInHand"}
              setEditableFields={setEditableFields}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.workInHand}
              disabled={isInitialData}
              onChange={(e) =>
                handleCurrencyChange("workInHand", e.target.value)
              }
              editableFields={editableFields.workInHand}
              keyValue={"workInHand"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="BG Limit (Sanctioned)"
              label="BG Limit (Sanctioned)"
              width="48vw"
              value={numericValues.bgLimit}
              onChange={(e) => handleChange("bgLimit", e.target.value)}
              error={!!errors.bgLimit}
              helperText={errors.bgLimit}
              disabled={isInitialData}
              showIcon={true}
              keyValue={"bgLimit"}
              setEditableFields={setEditableFields}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.bgLimit}
              disabled={isInitialData}
              onChange={(e) => handleCurrencyChange("bgLimit", e.target.value)}
              editableFields={editableFields.bgLimit}
              keyValue={"bgLimit"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="BG Utilized"
              label="BG Utilized"
              width="48vw"
              value={numericValues.bgUtilized}
              onChange={(e) => handleChange("bgUtilized", e.target.value)}
              error={!!errors.bgUtilized}
              helperText={errors.bgUtilized}
              disabled={isInitialData}
              showIcon={true}
              keyValue={"bgUtilized"}
              setEditableFields={setEditableFields}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.bgUtilized}
              disabled={isInitialData}
              onChange={(e) =>
                handleCurrencyChange("bgUtilized", e.target.value)
              }
              editableFields={editableFields.bgUtilized}
              keyValue={"bgUtilized"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="BG Available (Sanctioned – Utilized)"
              label="BG Available (Sanctioned – Utilized)"
              width="48vw"
              value={numericValues.bgAvailable}
              error={!!errors.bgAvailable}
              helperText={errors.bgAvailable}
              disabled
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder={currencyValues.bgAvailable}
              width="100px"
              disabled={true}
              sx={{ marginTop: numericValues.netWorth ? "25px" : "25px" }}
              value={currencyValues.bgAvailable}
              onChange={(e) =>
                handleCurrencyChange("bgAvailable", e.target.value)
              }
              editableFields={editableFields.bgAvailable}
              keyValue={"bgAvailable"}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CustomTextField
              placeholder="Quoted Price"
              label="Quoted Price"
              width="48vw"
              value={numericValues.quotedPrice}
              onChange={(e) => handleChange("quotedPrice", e.target.value)}
              error={!!errors.quotedPrice}
              helperText={errors.quotedPrice}
              disabled={isInitialData}
              keyValue={"quotedPrice"}
              setEditableFields={setEditableFields}
              showIcon={true}
            />
            <CustomSelect
              options={["Crore", "Lakhs"]}
              placeholder="Crore"
              width="100px"
              sx={{ marginTop: numericValues.netWorth ? "35px" : "25px" }}
              value={currencyValues.quotedPrice}
              disabled={isInitialData}
              keyValue={"quotedPrice"}
              editableFields={editableFields.quotedPrice}
              onChange={(e) =>
                handleCurrencyChange("quotedPrice", e.target.value)
              }
            />
          </Box>
        </Box>

        {/* <Box mb={3} display={"flex"} flexDirection="column">
        <Typography fontWeight="400" fontSize={14} mb={1}>
          Litigation/Blacklist Declaration
        </Typography>

        <Box mb={3} display="flex" gap={2}>
          <CustomSelect
            options={["Yes", "No"]}
            placeholder="Yes"
            width="100px"
            value={litigationStatus}
            onChange={(event) => {
              const value = event.target.value;
              setLitigationStatus(value);
              if (value === "No") {
                setLitigationDetails(""); // ✅ clear the details if status is No
              }
            }}
            disabled={isInitialData}
          />
          <CustomTextField
            placeholder="Details if any"
            width="65%"
            value={litigationDetails}
            onChange={(e) => setLitigationDetails(e.target.value)}
            disabled={isInitialData}
          />
        </Box>
      </Box> */}
        <Box mb={3} display={"flex"} flexDirection="column">
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography fontWeight="400" fontSize={14}>
              Litigation/Blacklist Declaration
            </Typography>

            {/* ✅ Edit Icon for Litigation Section */}
            {isInitialData && (
              <IconButton
                size="small"
                sx={{ color: "#0FB97D" }}
                onClick={() => setLitigationEditable(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

      <Box mb={3} display="flex" gap={2}>
        <CustomSelect
          options={["Yes", "No"]}
          placeholder="Select"
          width="100px"
          value={litigationStatus}
          onChange={(event) => setLitigationStatus(event.target.value)}
          disabled={isInitialData && !litigationEditable}
        />
        <CustomTextField
          placeholder="Details if any"
          width="65%"
          value={litigationDetails}
          onChange={(e) => setLitigationDetails(e.target.value)}
          disabled={isInitialData && !litigationEditable || litigationStatus === "No"}
          showIcon={true}
        />
      </Box>
    </Box>


        {/* Registration / Certificates */}
        <Box mb={3}>
          <Typography
            fontWeight="400"
            fontSize={14}
            mb={1}
            color="#000000"
            fontStyle={"montserrat"}
          >
            Registration/Certificates
          </Typography>

          {mergedData?.registration_file && !showUpload ? (
            <Box
              bgcolor="#fff"
              border="1px solid #e0e0e0"
              borderRadius="12px"
              p={3}
              width="60vw"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap={1}
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={2} width="100%">
                <Typography fontWeight={600}>
                  Uploaded File: {mergedData.registration_file.file_name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleDeleteFile}
                  sx={{ color: "#d32f2f" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography fontSize={12} color="gray">
                {(mergedData.registration_file.file_size / 1024 / 1024).toFixed(
                  2
                )}{" "}
                MB
              </Typography>

              {mergedData.registration_file.file_type === "pdf" ? (
                <iframe
                  src={mergedData.registration_file.download_url}
                  title="Uploaded PDF"
                  width="100%"
                  height="400px"
                  style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                />
              ) : (
                <img
                  src={mergedData.registration_file.download_url}
                  alt="Uploaded file"
                  style={{
                    width: "200px",
                    height: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              )}

              <Typography
                sx={{
                  color: "#007BFF",
                  textDecoration: "underline",
                  mt: 1,
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(
                    mergedData.registration_file.download_url,
                    "_blank"
                  )
                }
              >
                Download / View Full File
              </Typography>
            </Box>
          ) : (
            <Box
              bgcolor={"#FFFFFF"}
              elevation={3}
              sx={{
                borderRadius: "12px",
                padding: "24px",
                width: "60vw",
                gap: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                // padding: "24px",
                marginBottom: "8px",
              }}
            >
              <Icon sx={{ fontSize: 36, color: "#4ec9b0", mt: 3 }}>
                <UploadFileOutlinedIcon
                  sx={{ fontSize: 36, color: "#4ec9b0", mb: 1 }}
                />
              </Icon>

              <Typography
                sx={{
                  color: "#6e6e6eff",
                  cursor: "pointer",
                  mb: 2,
                  fontWeight: 500,
                  textDecoration: "underline",
                  textDecorationColor: "#6e6e6eff",
                }}
                onClick={() =>
                  document.getElementById("certificate-upload-input").click()
                }
              >
                Click to upload
              </Typography>
              <input
                id="certificate-upload-input"
                type="file"
                style={{ display: "none" }}
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files.length > 0) {
                    setCertificateFile(e.target.files[0]);
                  }
                }}
              />
              {certificateFile && (
                <Typography fontSize={12} mt={1} color="green">
                  Selected: {certificateFile.name}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            position: "sticky",
            bottom: 16,
            right: 32,
            display: "flex",
            marginRight: 4,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton label="Next" onClick={handleNext} />
        </Box>
      </Box>
    </>
  );
};

export default QualificationInputs;
