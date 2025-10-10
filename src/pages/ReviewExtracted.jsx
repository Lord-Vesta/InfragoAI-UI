import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
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
import { useNavigate } from "react-router";
import { getExtractedData } from "../Utils/Api.utils";
import { toTitleCase } from "../Utils/stringUtils";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AlertTooltip from "../components/Tooltip";
import Tooltip from "@mui/material/Tooltip";
import GetAppIcon from "@mui/icons-material/GetApp";

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
    label: "Bid Capacity Formula",
    type: "text",
    validation: { required: true },
  },
  { label: "JV Policy", type: "text", validation: { required: true } },
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

const ReviewExtracted = ({ loggedIn, height = "85vh" }) => {
  const [fields, setFields] = useState([]);
  const [editableFields, setEditableFields] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { jwtToken } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await getExtractedData(); // API call
        const response = {
          data: [
            {
              extraction_id: 1,
              field_key: "tender Name",
              field_value:
                "Watershed Development of Sabarmati River Banks with waterbody from Narmada main canal to 500m D/S of PDPU Bridge, Ta.- Dist.- Gandhinagar. (Phase - 4, Part - 1)",
              confidence_score: "1.0000",
              source_page_number: 1,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.613839Z",
              updated_at: "2025-10-10T05:06:38.180110Z",
              project: 1,
              snippet:
                "Watershed Development of Sabarmati River Banks, Gandhinagar",
            },
            {
              extraction_id: 2,
              field_key: "tender ID",
              field_value: "Not found in document",
              confidence_score: "0.0000",
              source_page_number: null,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.615049Z",
              updated_at: "2025-10-10T05:06:38.183994Z",
              project: 1,
              snippet: "Tender ID not found",
            },
            {
              extraction_id: 3,
              field_key: "procuring Entity",
              field_value:
                "Narmada, Water Resources, Water Supply and Kalpsar Department",
              confidence_score: "1.0000",
              source_page_number: 1,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.620320Z",
              updated_at: "2025-10-10T05:06:38.187605Z",
              project: 1,
              snippet: "Procuring: Narmada Water Resources Dept.",
            },
            {
              extraction_id: 4,
              field_key: "location",
              field_value: "Gandhinagar",
              confidence_score: "1.0000",
              source_page_number: 1,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.620320Z",
              updated_at: "2025-10-10T05:06:38.193636Z",
              project: 1,
              snippet: "Location: Gandhinagar",
            },
            {
              extraction_id: 5,
              field_key: "pre-Bid-Date",
              field_value: "14/07/2025",
              confidence_score: "1.0000",
              source_page_number: 6,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.626985Z",
              updated_at: "2025-10-10T05:06:38.196863Z",
              project: 1,
              snippet: "Pre-bid on 14/07/2025",
            },
            {
              extraction_id: 6,
              field_key: "submission-Deadline",
              field_value: "Not found in document",
              confidence_score: "0.0000",
              source_page_number: null,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.633004Z",
              updated_at: "2025-10-10T05:06:38.199042Z",
              project: 1,
              snippet: "Submission deadline not found",
            },
            {
              extraction_id: 7,
              field_key: "technical-Bid-Opening",
              field_value: "05/08/2025",
              confidence_score: "1.0000",
              source_page_number: 30,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.635557Z",
              updated_at: "2025-10-10T05:06:38.202597Z",
              project: 1,
              snippet: "Technical bid opens on 05/08/2025",
            },
            {
              extraction_id: 8,
              field_key: "financial-Bid-Opening",
              field_value: "Not found in document",
              confidence_score: "0.0000",
              source_page_number: null,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.636866Z",
              updated_at: "2025-10-10T05:06:38.206192Z",
              project: 1,
              snippet: "Financial bid opening not found",
            },
            {
              extraction_id: 9,
              field_key: "bid-Validity",
              field_value: "120",
              confidence_score: "1.0000",
              source_page_number: 22,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.641756Z",
              updated_at: "2025-10-10T05:06:38.209353Z",
              project: 1,
              snippet: "Bid validity: 120 days",
            },
            {
              extraction_id: 10,
              field_key: "EMD Value",
              field_value: "48593000.0",
              confidence_score: "1.0000",
              source_page_number: 5,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.645768Z",
              updated_at: "2025-10-10T05:06:38.211346Z",
              project: 1,
              snippet: "EMD Value ₹48,593,000",
            },
            {
              extraction_id: 11,
              field_key: "EMD Validity",
              field_value: "45",
              confidence_score: "1.0000",
              source_page_number: 23,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.648092Z",
              updated_at: "2025-10-10T05:06:38.213679Z",
              project: 1,
              snippet: "EMD Validity: 45 days",
            },
            {
              extraction_id: 12,
              field_key: "PBG %",
              field_value: "5",
              confidence_score: "1.0000",
              source_page_number: 29,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.651606Z",
              updated_at: "2025-10-10T05:06:38.217266Z",
              project: 1,
              snippet: "PBG: 5%",
            },
            {
              extraction_id: 13,
              field_key: "Additional PBG Rule",
              field_value:
                "If the Contract Price offered by the Selected Bidder is lower than 10% but up to 20% of the Estimated Project Cost, then the Additional Performance Security shall be calculated @ 20% of the difference in the Estimated Project Cost and Contract Price offered by the selected Bidder.",
              confidence_score: "1.0000",
              source_page_number: 29,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.651606Z",
              updated_at: "2025-10-10T05:06:38.220108Z",
              project: 1,
              snippet: "Additional PBG if bid < 20% of cost",
            },
            {
              extraction_id: 14,
              field_key: "Security Deposit %",
              field_value: "5",
              confidence_score: "1.0000",
              source_page_number: 34,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.658362Z",
              updated_at: "2025-10-10T05:06:38.222512Z",
              project: 1,
              snippet: "Security Deposit: 5%",
            },
            {
              extraction_id: 38,
              field_key: "retention %",
              field_value: "6",
              confidence_score: "1.0000",
              source_page_number: 68,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-10T05:06:38.225446Z",
              updated_at: "2025-10-10T05:06:38.225446Z",
              project: 1,
              snippet: "Retention: 6%",
            },
            {
              extraction_id: 16,
              field_key: "Price Adjustment",
              field_value: "yes",
              confidence_score: "1.0000",
              source_page_number: 47,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.664002Z",
              updated_at: "2025-10-10T05:06:38.229452Z",
              project: 1,
              snippet: "Price adjustment applicable",
            },
            {
              extraction_id: 39,
              field_key: "tenure(months)",
              field_value: "18",
              confidence_score: "1.0000",
              source_page_number: 78,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-10T05:06:38.232640Z",
              updated_at: "2025-10-10T05:06:38.232640Z",
              project: 1,
              snippet: "Tenure: 18 months",
            },
            {
              extraction_id: 18,
              field_key: "DLP(months)",
              field_value: "36",
              confidence_score: "1.0000",
              source_page_number: 78,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.666597Z",
              updated_at: "2025-10-10T05:06:38.237238Z",
              project: 1,
              snippet: "DLP: 36 months",
            },
            {
              extraction_id: 19,
              field_key: "Avg annual turnover threshold",
              field_value: "3240000000.0",
              confidence_score: "1.0000",
              source_page_number: 30,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.666597Z",
              updated_at: "2025-10-10T05:06:38.241663Z",
              project: 1,
              snippet: "Avg. turnover ≥ ₹3,240,000,000",
            },
            {
              extraction_id: 20,
              field_key: "Similar work threshold",
              field_value: "1945000000.0",
              confidence_score: "1.0000",
              source_page_number: 11,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.666597Z",
              updated_at: "2025-10-10T05:06:38.245038Z",
              project: 1,
              snippet: "Similar work ≥ ₹1,945,000,000",
            },
            {
              extraction_id: 21,
              field_key: "Similar work definition",
              field_value:
                "The work Similar Project means Dam/Barrage/Aqueduct/Canal Syphon/Bridge over River/River Front Development (like Diaphragm Wall & Retaining Wall) /Marine Works etc. work done under government/semi government department.",
              confidence_score: "1.0000",
              source_page_number: 11,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.676147Z",
              updated_at: "2025-10-10T05:06:38.248957Z",
              project: 1,
              snippet: "Includes Dam, Barrage, Canal, Riverfront etc.",
            },
            {
              extraction_id: 22,
              field_key: "Net worth requirement",
              field_value: "Not found in document",
              confidence_score: "0.0000",
              source_page_number: null,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.679433Z",
              updated_at: "2025-10-10T05:06:38.252169Z",
              project: 1,
              snippet: "Net worth requirement not found",
            },
            {
              extraction_id: 23,
              field_key: "Liquid Assets/WC requirement",
              field_value: "1215000000.0",
              confidence_score: "1.0000",
              source_page_number: 30,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.681873Z",
              updated_at: "2025-10-10T05:06:38.256196Z",
              project: 1,
              snippet: "Liquid assets ≥ ₹1,215,000,000",
            },
            {
              extraction_id: 24,
              field_key: "Key Personnel Requirement",
              field_value:
                "- Project Manager: B.E. Civil + 15 Years Experience (10 Years as Manager)\n- Senior Site Engineer: B.E. Civil + 8 Years Experience or Dip. Civil + 10 Years Experience\n- Senior Quantity Surveyor / Contracts Manager: B.E. Civil + 8 Years Experience or Dip. Civil + 10 Years Experience\n- Plant Engineer: B.E. Civil + 5 Years Experience or Dip. Civil + 8 Years Experience\n- Survey Engineer: B.E. Civil + 5 Years Experience or Dip. Civil + 8 Years Experience\n- Material & Quality Control Engineer: B.E. Civil + 8 Years Experience or Dip. Civil + 10 Years Experience\n- Junior Site Engineer: B.E. Civil + 5 Years Experience or Dip. Civil + 8 Years Experience",
              confidence_score: "1.0000",
              source_page_number: 13,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.681873Z",
              updated_at: "2025-10-10T05:06:38.260364Z",
              project: 1,
              snippet: "Personnel: PM + engineers (BE/Diploma, 5–15 yrs exp)",
            },
            {
              extraction_id: 25,
              field_key: "Key plant/Machinery List",
              field_value:
                "- Diaphragm wall Hydraulic grab unit with all accessories: Suitable for 600mm width Diaphragm wall\n- Cranes: 50 tonne\n- Cranes: 75 tonne\n- Polymer setup unit: Suitable for 600mm width Diaphragm wall\n- Stop end pipes: Suitable for 600mm width Diaphragm wall\n- D G set: 75/125 KVA\n- Water pump for polymer mixing: 6 set+2 standby\n- Tremie pipe: Suitable for 600mm width Diaphragm wall\n- Concrete batching and mixing plant: 30-60 Cum/Hr\n- Boom Placer: 2 sets\n- Concrete Vibrators (Needle, Surface vibrators): 6 sets\n- Reinforcement cutting and bending Machine: 6 sets\n- Transit mixer: 4.5 / 6 Cum: 12 Nos.\n- Tippers/ Dumpers: 5 / 10 Cum: 24 Nos\n- Hydraulic Motor Grader: 2 No\n- Water tanker/sprinkler: 10 cum: 6 Nos\n- Surveying Equipment: 6 Nos\n- Total Station: 6 Nos\n- Plate compactor: 12 Nos\n- Air compressor: 6 Nos\n- Concrete breaker: 4 Nos\n- Welding machine: 12 Nos\n- Shuttering Plates/System: Full height shuttering made from 5 mm thick plate: 50000 Sqmt\n- JCB: 6 Nos\n- Concrete mixer machine with batching: 2 Bag: 4 Nos\n- Hydra Crane: 8 Tonne: 6 Nos\n- Tandem Vibratory Roller: Minimum 8 tonne: 4 Nos\n- Tandem Vibratory Roller for compaction of edges (self propelling): Minimum operating weight 1 tonne: 2 Nos",
              confidence_score: "1.0000",
              source_page_number: 14,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.681873Z",
              updated_at: "2025-10-10T05:06:38.263491Z",
              project: 1,
              snippet:
                "Key machinery: diaphragm wall setup, cranes, batching plant, JCBs",
            },
            {
              extraction_id: 26,
              field_key: "Evaluation Process",
              field_value:
                "- Qualification based on Applicant’s meeting all the following minimum pass/fail criteria regarding the Applicant’s general and particular experience, personnel and equipment capabilities and financial positions.\n- To qualify for more than one contract, the applicant must demonstrate having experience and resources sufficient to meet the aggregate of the qualification criteria for each contract.\n- The evaluation will consider the financial position, experience, and resources of the applicant.",
              confidence_score: "1.0000",
              source_page_number: 11,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.681873Z",
              updated_at: "2025-10-10T05:06:38.265524Z",
              project: 1,
              snippet:
                "Evaluation: Experience, financials, equipment & personnel",
            },
            {
              extraction_id: 27,
              field_key: "Base Rates",
              field_value: "Not found in document",
              confidence_score: "0.0000",
              source_page_number: null,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.691724Z",
              updated_at: "2025-10-10T05:06:38.267903Z",
              project: 1,
              snippet: "Base rates not found",
            },
            {
              extraction_id: 28,
              field_key: "JV Policy",
              field_value:
                "Joint Ventures must comply with the following requirement: The lead partner shall meet not less than 50 percent of all criteria given in para 4.5.3 & 4.5.6 above. The joint venture must collectively satisfy the criteria of para 4.5.3 & 4.5.6 above.",
              confidence_score: "1.0000",
              source_page_number: 17,
              is_edited: false,
              edited_value: null,
              created_at: "2025-10-09T09:57:26.695386Z",
              updated_at: "2025-10-10T05:06:38.271331Z",
              project: 1,
              snippet: "JV lead must meet ≥50% of criteria",
            },
          ],
          pdf_file: {
            file_name: "01 Vol-1 SBD.pdf",
            file_path: "pdfs/9876543210_01 Vol-1 SBD.pdf",
            file_size: 1763654,
            file_exists: true,
            download_url:
              "http://informingly-cormous-oscar.ngrok-free.dev/media/pdfs/9876543210_01 Vol-1 SBD.pdf",
          },
        };
        console.log("res", response);
        const dataArray = Array.isArray(response.data) ? response.data : [];

        const normalizedResponse = dataArray.map((item) => ({
          ...item,
          normalizedKey: item.field_key
            .toLowerCase()
            .replace(/[\s-/_()]+/g, ""),
        }));
        console.log("normalizedKey", normalizedResponse);
        const apiData = fieldConfig.map((config) => {
          if (config.type === "heading") return config;

          const normalizedLabel = config.label
            .toLowerCase()
            .replace(/[\s-/_()]+/g, "");

          const match = normalizedResponse.find(
            (r) => r.normalizedKey === normalizedLabel
          );
          console.log("matc", match);
          let value = match
            ? match.field_value
            : config.type === "toggle"
            ? "No"
            : "";

          if (
            match &&
            config.type === "date" &&
            /^\d{2}\/\d{2}\/\d{4}$/.test(match.field_value)
          ) {
            const [day, month, year] = match.field_value.split("/");
            value = `${year}-${month}-${day}`;
          }

          return {
            ...config,
            value,
            confidenceScore: match ? parseFloat(match.confidence_score) : null,
            pageNo: match ? match.source_page_number : null,
            snippet: match ? match.snippet : "test",
          };
        });

        setFields(apiData);
        setEditableFields(new Array(apiData.length).fill(false));
        setErrors(new Array(apiData.length).fill(""));
      } catch (err) {
        console.error("Error fetching extracted data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  const handleBlur = (index) => {
    setEditableFields((prev) =>
      prev.map((editable, i) => (i === index ? false : editable))
    );
  };
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const handleNext = () => {
    // let valid = true;
    // fields.forEach((field, i) => {
    //   if (field.type !== "heading") {
    //     const error = validateField(i, field.value);
    //     if (error) valid = false;
    //   }
    // });
    // if (valid) {
    //   alert("All validations passed!");
    // }
    if (jwtToken) {
      navigate("/QualificationInputs");
    } else {
      navigate("/login");
    }
  };

  const displayedFields = jwtToken ? fields : fields.slice(0, 5);
  console.log("dissssssssssssssssss", displayedFields);
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
      position="relative"
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
          <Box component="span" sx={{ display: "inline-block" }}>
            <GetAppIcon
              style={{ fontSize: 20, cursor: "pointer", color: "#1976d2" }}
            />
          </Box>
        </Typography>
        <img
          src="src/assets/PDF_file_icon.svg.png"
          alt="pdf"
          width={50}
          height={50}
          style={{ marginRight: "16px" }}
        />
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
                  {/* Confidence circle */}
                  <IconButton disableRipple>
                    <CircleIcon
                      style={{
                        color: (() => {
                          const score = field.confidenceScore ?? 10; // default 0 if null
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
                <AlertTooltip
                  title={
                    <Typography sx={{ fontSize: 12 }}>
                      {field.snippet}
                    </Typography>
                  }
                  type="success"
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          maxWidth: "700px",
                          whiteSpace: "normal",
                        },
                      },
                    },
                  }}
                >
                  <span>
                    <CustomTextField
                      value={field.value}
                      placeholder={field.label}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onBlur={() => handleBlur(index)}
                      disabled={!editableFields[index]}
                      width="45vw"
                    />
                  </span>
                </AlertTooltip>
              ) : // <CustomTextField
              //   value={field.value}
              //   placeholder={field.label}
              //   onChange={(e) => handleChange(index, e.target.value)}
              //   onBlur={() => handleBlur(index)}
              //   disabled={!editableFields[index]}
              //   width="45vw"
              // />
              field.type === "select" ? (
                <Tooltip
                  title={
                    <Typography sx={{ fontSize: 12 }}>
                      {field.snippet}
                    </Typography>
                  }
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          maxWidth: "700px",
                          whiteSpace: "normal",
                        },
                      },
                    },
                  }}
                >
                  <span>
                    <CustomSelect
                      value={field.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder={field.label}
                      options={field.validation?.options || []}
                      disabled={!editableFields[index]}
                    />
                  </span>
                </Tooltip>
              ) : field.type === "date" ? (
                <Tooltip
                  title={
                    <Typography sx={{ fontSize: 12 }}>
                      {field.snippet}
                    </Typography>
                  }
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          maxWidth: "700px",
                          whiteSpace: "normal",
                        },
                      },
                    },
                  }}
                >
                  <span>
                    <CustomDatePicker
                      value={field.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder={`Select ${field.label}`}
                      disabled={!editableFields[index]}
                      width="40vw"
                    />
                  </span>
                </Tooltip>
              ) : field.type === "textarea" ? (
                <Tooltip
                  title={
                    <Typography sx={{ fontSize: 12 }}>
                      {field.snippet}
                    </Typography>
                  }
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          maxWidth: "700px",
                          whiteSpace: "normal",
                        },
                      },
                    },
                  }}
                >
                  <span>
                    <CustomTextField
                      value={field.value}
                      placeholder={field.label}
                      onChange={(e) => handleChange(index, e.target.value)}
                      disabled={!editableFields[index]}
                      multiline
                      minRows={3}
                      width="45vw"
                    />
                  </span>
                </Tooltip>
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
    </Box>
  );
};

export default ReviewExtracted;
