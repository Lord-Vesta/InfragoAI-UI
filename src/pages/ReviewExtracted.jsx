import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomTextField from "../components/Textfield";
import CustomSelect from "../components/Select";
import CustomDatePicker from "../components/DatePicker";
import colors from "../assets/colors";

const procurementModes = [
	"Open Tender",
	"Limited Tender",
	"Single Tender",
	"E-Procurement",
];

const fieldConfig = [
	{ label: "Tender Name", type: "text" },
	{ label: "Tender Id/No.", type: "text" },
	{ label: "Procuring Entity", type: "text" },
	{ label: "Procurement Mode", type: "select" },
	{ label: "Location/State", type: "text" },

	{ label: " Dates", type: "heading" },
	{ label: "Pre-Bid Date", type: "date" },
	{ label: "Submission Date", type: "date" },
	{ label: "Technical Bid Opening", type: "date" },
	{ label: "Financial Bid Opening", type: "date" },
	{ label: "Bid Validity(Days)", type: "text" },
	{ label: "Commercial/Security", type: "heading" },

	{ label: "EMD Values", type: "text" },
	{ label: "EMD Validity (Days)", type: "text" },
	{ label: "PBG %", type: "text" },
	{ label: "Additional PBG Rule (APBG)", type: "text" },
	{ label: "Security Deposit %", type: "text" },
	{ label: "Retention %", type: "text" },
	{ label: "Price Adjustment (Escalation)", type: "text" },
	{ label: "Procurement Mode ", type: "select" },
	{ label: "Tenure (months)", type: "text" },
	{ label: "DLP (months)", type: "text" },
	{ label: "Eligibility Thresholds (Tender-defined)", type: "heading" },
	{ label: "Avg Annual Turnover Threshold", type: "text" },
	{ label: "Similar Work Threshold (₹ Cr)", type: "text" },
	{ label: "Similar Work Definition", type: "text" },
	{ label: "Net Worth Requirement", type: "text" },
	{ label: "Liquid Assets / WC Requirement", type: "text" },
	{ label: "Bid Capacity Formula", type: "text" },
	{ label: "JV Policy", type: "text" },
	{ label: "Key Personnel List", type: "textarea" },
	{ label: "Key Plant / Machinery List", type: "textarea" },
];

const ReviewExtracted = ({ loggedIn }) => {
	const [fields, setFields] = useState([]);
	const [editableFields, setEditableFields] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = [
				{
					label: "Tender Name",
					value: "Lorem Ipsum",
					confidenceScore: 0.95,
					pageNo: 1,
				},
				{
					label: "Tender Id/No.",
					value: "TND-001",
					confidenceScore: 0.98,
					pageNo: 1,
				},
				{
					label: "Procuring Entity",
					value: "ABC Corp",
					confidenceScore: 0.92,
					pageNo: 1,
				},
				{
					label: "Procurement Mode",
					value: "Open Tender",
					confidenceScore: 0.97,
					pageNo: 2,
				},
				{
					label: "Location/State",
					value: "Maharashtra",
					confidenceScore: 0.93,
					pageNo: 2,
				},
				{
					label: "Pre-Bid Date",
					value: "2025-10-01",
					confidenceScore: 0.96,
					pageNo: 3,
				},
				{
					label: "Submission Date",
					value: "2025-10-10",
					confidenceScore: 0.94,
					pageNo: 3,
				},
				{
					label: "Technical Bid Opening",
					value: "2025-10-12",
					confidenceScore: 0.91,
					pageNo: 4,
				},
				{
					label: "Financial Bid Opening",
					value: "2025-10-15",
					confidenceScore: 0.92,
					pageNo: 4,
				},
				{
					label: "Bid Validity(Days)",
					value: "30",
					confidenceScore: 0.9,
					pageNo: 5,
				},
				{
					label: "EMD Values",
					value: "1000",
					confidenceScore: 0.88,
					pageNo: 5,
				},
				{
					label: "EMD Validity (Days)",
					value: "60",
					confidenceScore: 0.87,
					pageNo: 5,
				},
			];

			const apiData = fieldConfig.map((config) => {
				if (config.type === "heading" || config.type === "textarea")
					return config;
				const match = response.find((r) => r.label === config.label);
				return {
					...config,
					value: match ? match.value : "",
					confidenceScore: match ? match.confidenceScore : null,
					pageNo: match ? match.pageNo : null,
				};
			});

			setFields(apiData);
			setEditableFields(new Array(apiData.length).fill(false));
		};

		fetchData();
	}, []);

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
	};

	const handleLoginRedirect = () => {
		window.location.href = "/login";
	};

	const displayedFields = !loggedIn ? fields : fields.slice(0, 5);
	console.log("loggedIn", loggedIn);
	return (
		<Box
			width='70vw'
			height='70vh'
			display='flex'
			flexDirection='column'
			gap={2}
			position='relative'
			overflow='auto'>
			{displayedFields.map((field, index) => (
				<Box key={index}>
					{field.type === "heading" ? (
						<Typography
							fontWeight='700'
							fontSize={20}
							display={"flex"}
							color={colors.green}
							mb={1}>
							{field.label}
						</Typography>
					) : (
						<>
							<Box display='flex' alignItems='center' mb={1}>
								<Typography
									variant='body1'
									fontWeight={500}
									color={colors.black_text}>
									{field.label}
								</Typography>
								<Box display='flex' gap={2}>
									<IconButton
										sx={{
											ml: 0.5,
											"&:focus": { outline: "none", boxShadow: "none" },
										}}
										disableRipple>
										<CircleIcon
											style={{ color: colors.green, fontSize: "9px" }}
										/>
									</IconButton>
									<IconButton
										size='small'
										sx={{
											ml: 0.5,
											"&:focus": {
												outline: "none", 
												boxShadow: "none",
											},
										}}
										disableRipple
										onClick={() => handleExtract(index)}>
										{" "}
										<LogoutIcon
											style={{ color: colors.green, fontSize: "17px" }}
										/>
									</IconButton>

									<IconButton
										size='small'
										sx={{
											ml: 0.5,
											"&:focus": { outline: "none", boxShadow: "none" },
										}}
										disableRipple
										onClick={() => handleEdit(index)}>
										<EditIcon
											style={{ color: colors.green, fontSize: "17px" }}
										/>
									</IconButton>
								</Box>
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
									placeholder={`${field.label}`}
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
							{field.type === "textarea" && (
								<CustomTextField
									value={field.value}
									placeholder={field.label}
									onChange={(e) => handleChange(index, e.target.value)}
									disabled={!editableFields[index]}
									multiline
									minRows={3}
								/>
							)}
						</>
					)}
				</Box>
			))}

			{!loggedIn && (
				<Box
					display='flex'
					width="30vw"
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					mt={2}
					p={4}
					sx={{
						backdropFilter: "blur(5px)",
					 background: "linear-gradient(to bottom, white,grey,white)",
					borderRadius: "1rem",
					}}>
					<Button
						variant='contained'
						style={{ backgroundColor: colors.green, borderRadius: "10px" }}
						onClick={handleLoginRedirect}>
						Login to load more fields
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ReviewExtracted;
