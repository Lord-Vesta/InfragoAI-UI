import React, { useState, useEffect } from "react";
import { Box, Icon, Paper, Typography,Backdrop, CircularProgress } from "@mui/material";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import CustomTextField from "../components/TextField";
import CustomSelect from "../components/Select";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { qualificationInputs } from "../Utils/Api.utils";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

const QualificationInputs = ({ height = "85vh", initialData }) => {
  const [projects, setProjects] = useState([
    { name: "", scope: "", year: "", value: "" },
  ]);

  const [numericValues, setNumericValues] = useState({
    turnover3: "",
    turnover5: "",
    netWorth: "",
    workingCapital: "",
    workInHand: "",
    bgLimit: "",
    bgUtilized: "",
    bgAvailable: "",
    quotedPrice: "",
  });
  const [litigationStatus, setLitigationStatus] = useState("No");
  const [litigationDetails, setLitigationDetails] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (initialData) {
      setNumericValues({
        turnover3: initialData?.data?.turnover_past_3_years?.edited_value || "",
        turnover5: initialData?.data?.turnover_past_5_years?.edited_value || "",
        netWorth: initialData?.data?.net_worth?.edited_value || "",
        workingCapital: initialData?.data?.working_capital?.edited_value || "", // 🟢 added .data and .original_value
        workInHand: initialData?.data?.work_in_hand?.edited_value || "",
        bgLimit: initialData?.data?.bg_limit_sanctioned?.edited_value || "",
        bgUtilized: initialData?.data?.bg_utilized?.edited_value || "",
        bgAvailable: initialData?.data?.bg_available?.edited_value || "",
        quotedPrice: initialData?.data?.quoted_price?.edited_value || "",
      });

      setLitigationStatus(
        initialData?.data?.litigation_blacklist_status?.edited_value === "True"
          ? "Yes"
          : "No"
      );
      setLitigationDetails(
        initialData?.data?.litigation_blacklist_details?.edited_value || ""
      );

      if (
        initialData?.similar_projects &&
        Array.isArray(initialData.similar_projects)
      ) {
        const formattedProjects = initialData?.similar_projects.map((proj) => ({
          id: proj.similar_project_id,
          name: proj.is_edited ? proj.edited_name : proj.name,
          scope: proj.is_edited ? proj.edited_scope : proj.scope,
          year: proj.is_edited ? proj.edited_year || proj.year : proj.year,
          value: proj.is_edited ? proj.edited_value || proj.value : proj.value,
        }));
        setProjects(formattedProjects);
      }
    }
  }, [initialData]);
  const isInitialData = Boolean(
    initialData && Object.keys(initialData).length > 0
  );

  const handleAddProject = () => {
    setProjects([...projects, { name: "", scope: "", year: "", value: "" }]);
  };
  const handleNext = async () => {
    try {
      setLoading(true);
      const payload = {
        turnover_past_3_years: numericValues.turnover3,
        turnover_past_5_years: numericValues.turnover5,
        net_worth: numericValues.netWorth,
        working_capital: numericValues.workingCapital,
        work_in_hand: numericValues.workInHand,
        bg_limit_sanctioned: numericValues.bgLimit,
        bg_utilized: numericValues.bgUtilized,
        bg_available: numericValues.bgAvailable,
        quoted_price: numericValues.quotedPrice,
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

      const response = await qualificationInputs(formData, {  
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Qualification Inputs submitted successfully!");
    } catch (err) {
      if (err.response) {
        console.error("API Error Response:", err.response.data);
      } else {
        console.error(" Request Setup Error:", err.message);
      }
    }finally {
      setLoading(false);
    }
  };
  const handleChange = (field, value) => {
    if (value === "" || /^[0-9]*$/.test(value)) {
      const updatedValues = { ...numericValues, [field]: value };

      if (field === "bgLimit" || field === "bgUtilized") {
        const limit = Number(updatedValues.bgLimit) || 0;
        const utilized = Number(updatedValues.bgUtilized) || 0;
        updatedValues.bgAvailable =
          limit - utilized > 0 ? String(limit - utilized) : "0";
      }

      setNumericValues(updatedValues);

      if (value === "" || Number(value) <= 0) {
        setErrors({ ...errors, [field]: "Value must be greater than 0" });
      } else {
        const updatedErrors = { ...errors };
        delete updatedErrors[field];
        setErrors(updatedErrors);
      }
    }
  };

  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={3}
      height={height}
      position="relative"
      overflow="auto"
    >
      <Typography fontWeight="600" fontSize={24} color={colors.black_text}>
        Provide Qualification Inputs
      </Typography>

      <Box>
        <Typography fontWeight="400" mb={1}>
          Avg Annual Turnover (₹ Cr)
        </Typography>
        <Box display="flex" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                "& button": {
                  borderRadius: "12px 0 0 12px !important",
                  boxShadow: "none",
                  height: "40px !important",
                },
              }}
            >
              <CustomButton label="Past 3 years" />
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
                width="300px"
                value={numericValues.turnover3}
                onChange={(e) => handleChange("turnover3", e.target.value)}
                error={!!errors.turnover3}
                helperText={errors.turnover3}
                disabled={isInitialData}
                showIcon={true}
              />
            </Box>
          </Box>

          <Box display="flex" alignItems="center">
            <Box
              sx={{
                "& button": {
                  borderRadius: "12px 0 0 12px !important",
                  boxShadow: "none",
                  height: "40px !important",
                },
              }}
            >
              <CustomButton label="Past 5 years" />
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
                width="300px"
                value={numericValues.turnover5}
                onChange={(e) => handleChange("turnover5", e.target.value)}
                error={!!errors.turnover5}
                helperText={errors.turnover5}
                disabled={isInitialData}
                showIcon={true}
              />
            </Box>
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
            }}
          >
            <Typography fontWeight="700" fontSize={18} mb={2}>
              Project details {index + 1}
            </Typography>

            {["name", "scope", "year", "value"].map((field) => (
              <Box
                key={field}
                display="flex"
                alignItems="center"
                gap={2}
                mb={1}
              >
                <Typography fontSize={12} fontWeight={700} width="80px">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </Typography>
                <CustomTextField
                  placeholder={`Enter Project ${field}`}
                  width="300px"
                  value={project[field]}
                  disabled={isInitialData}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[index][field] = e.target.value;
                    setProjects(updated);
                  }}
                  showIcon={true}
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
            width="45vw"
            value={numericValues.netWorth}
            onChange={(e) => handleChange("netWorth", e.target.value)}
            error={!!errors.netWorth}
            helperText={errors.netWorth}
            showIcon={true}
            disabled={isInitialData}
          />
        </Box>
        <CustomTextField
          placeholder="Working Capital / Liquid Assets"
          label="Working Capital / Liquid Assets"
          width="45vw"
          value={numericValues.workingCapital}
          onChange={(e) => handleChange("workingCapital", e.target.value)}
          error={!!errors.workingCapital}
          helperText={errors.workingCapital}
          disabled={isInitialData}
          showIcon={true}
        />
        <CustomTextField
          placeholder="Work in Hand (B value for formula)"
          label="Work in Hand (B value for formula)"
          width="45vw"
          value={numericValues.workInHand}
          onChange={(e) => handleChange("workInHand", e.target.value)}
          error={!!errors.workInHand}
          helperText={errors.workInHand}
          disabled={isInitialData}
          showIcon={true}
        />
        <CustomTextField
          placeholder="BG Limit (Sanctioned)"
          label="BG Limit (Sanctioned)"
          width="45vw"
          value={numericValues.bgLimit}
          onChange={(e) => handleChange("bgLimit", e.target.value)}
          error={!!errors.bgLimit}
          helperText={errors.bgLimit}
          disabled={isInitialData}
          showIcon={true}
        />
        <CustomTextField
          placeholder="BG Utilized"
          label="BG Utilized"
          width="45vw"
          value={numericValues.bgUtilized}
          onChange={(e) => handleChange("bgUtilized", e.target.value)}
          error={!!errors.bgUtilized}
          helperText={errors.bgUtilized}
          disabled={isInitialData}
          showIcon={true}
        />
        <CustomTextField
          placeholder="BG Available (Sanctioned – Utilized)"
          label="BG Available (Sanctioned – Utilized)"
          width="45vw"
          value={numericValues.bgAvailable}
          error={!!errors.bgAvailable}
          helperText={errors.bgAvailable}
          disabled
        />
        <CustomTextField
          placeholder="Quoted Price"
          label="Quoted Price"
          width="45vw"
          value={numericValues.quotedPrice}
          onChange={(e) => handleChange("quotedPrice", e.target.value)}
          error={!!errors.quotedPrice}
          helperText={errors.quotedPrice}
          disabled={isInitialData}
          showIcon={true}
        />
      </Box>

      <Box mb={3} display={"flex"} flexDirection="column">
        <Typography fontWeight="400" fontSize={14} mb={1}>
          Litigation/Blacklist Declaration
        </Typography>

        <Box mb={3} display="flex" gap={2}>
          <CustomSelect
            options={["Yes", "No"]}
            placeholder="Yes"
            width="100px"
            value={litigationStatus}
            onChange={(event) => setLitigationStatus(event.target.value)}
            disabled={isInitialData}
          />
          <CustomTextField
            placeholder="Details if any"
            width="37vw"
            value={litigationDetails}
            onChange={(e) => setLitigationDetails(e.target.value)}
            disabled={isInitialData}
          />
        </Box>
      </Box>

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

        {initialData?.registration_file ? (
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
            <Typography fontWeight={600}>
              Uploaded File: {initialData.registration_file.file_name}
            </Typography>
            <Typography fontSize={12} color="gray">
              {(initialData.registration_file.file_size / 1024 / 1024).toFixed(
                2
              )}{" "}
              MB
            </Typography>

            {initialData.registration_file.file_type === "pdf" ? (
              <iframe
                src={initialData.registration_file.download_url}
                title="Uploaded PDF"
                width="100%"
                height="400px"
                style={{ borderRadius: "8px", border: "1px solid #ccc" }}
              />
            ) : (
              <img
                src={initialData.registration_file.download_url}
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
                  initialData.registration_file.download_url,
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
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Box
                sx={{
                  background: "#d1fae5",
                  color: "#34d399",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  fontSize: 12,
                }}
              >
                PDF
              </Box>
              <Box
                sx={{
                  background: "#d1fae5",
                  color: "#34d399",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  fontSize: 12,
                }}
              >
                DOCX
              </Box>
              <Box
                sx={{
                  background: "#d1fae5",
                  color: "#34d399",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  fontSize: 12,
                }}
              >
                TXT
              </Box>
              <Box
                sx={{
                  background: "#d1fae5",
                  color: "#34d399",
                  borderRadius: "4px",
                  px: 1.5,
                  py: 0.5,
                  fontSize: 12,
                }}
              >
                &gt; 10 MB
              </Box>
            </Box>
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
