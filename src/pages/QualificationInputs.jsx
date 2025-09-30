import React from "react";
import { Box, Button, Typography } from "@mui/material";
import colors from "../assets/colors";
import CustomButton from "../components/Button";
import CustomTextField from "../components/TextField";
import CustomSelect from "../components/Select"; // if you have it

const QualificationInputs = ({ height = "70vh" }) => {
	return (
		<Box
			width='67vw'
			display='flex'
			flexDirection='column'
			gap={3}
			height={height} 
			position='relative'
			overflow='auto'>
			<Typography
				fontWeight='600'
				fontSize={24}
				color={colors.black_text}
				>
				Provide Qualification Inputs
			</Typography>

			<Box>
				<Typography fontWeight='400' mb={1}>
					Avg Annual Turnover (₹ Cr)
				</Typography>

				<Box display='flex' alignItems='center' gap={3}>
					<Box display='flex' alignItems='center'>
						<Box
							sx={{
								"& button": {
									borderRadius: "12px 0 0 12px !important",
									boxShadow: "none",
									height: "40px !important", 
								},
							}}>
							<CustomButton label='Past 3 years' />
						</Box>
						<Box
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "0 12px 12px 0 !important",
									backgroundColor: "#fff",
								},
							}}>
							<CustomTextField placeholder='Lorem Ipsum' width='300px' />
						</Box>
					</Box>

					<Box display='flex' alignItems='center'>
						<Box
							sx={{
								"& button": {
									borderRadius: "12px 0 0 12px !important",
									boxShadow: "none",
									height: "40px !important", 
								},
							}}>
							<CustomButton label='Past 5 years' />
						</Box>
						<Box
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: "0 12px 12px 0 !important",
									backgroundColor: "#fff",
								},
							}}>
							<CustomTextField placeholder='Lorem Ipsum' width='300px' />
						</Box>
					</Box>
				</Box>
			</Box>
			<Box display={'flex'} flexDirection='column' gap={1}>
			<Typography fontWeight='400' fontSize={16}>
				Similar Projects Executed
			</Typography>
	  {/* {projects.map((project, index) => ( */}
 <Box
          // key={index}
          p={2}
          border="1px solid #E0E0E0"
          borderRadius="12px"
          bgcolor="#fff"
          width={"60vw"}
        >
          <Typography fontWeight="700" fontSize={18} mb={2}>
            Project details
          </Typography>

          <Typography fontSize={12} fontWeight={700} mb={1}>
            <strong>Name:</strong>
             {/* {project.name} */}
          </Typography>
          <Typography fontSize={12} fontWeight={700} mb={1}>
            <strong>Scope:</strong> 
            {/* {project.scope} */}
          </Typography>
         <Typography fontSize={12} fontWeight={700} mb={1}>
            <strong>Year:</strong>
             {/* {project.year} */}
          </Typography>
          <Typography fontSize={12} fontWeight={700} mb={1}>
            <strong>Value:</strong>
             {/* {project.value} */}
          </Typography>
        </Box>
		<Box mb={2}
		>
		<CustomButton label='Add More ' />
		</Box>
		</Box>
			<Box display='flex' flexDirection='column' gap={2}>
				<CustomTextField
					placeholder='Net Worth (CA certified)'
					label='Net Worth (CA certified)'
					width='45vw'
				/>
				<CustomTextField
					placeholder='Working Capital / Liquid Assets'
					label='Working Capital / Liquid Assets'
					width='45vw'
				/>
				<CustomTextField
					placeholder='Work in Hand (B value for formula)'
					label='Work in Hand (B value for formula)'
					width='45vw'
				/>
				<CustomTextField
					placeholder='BG Limit (Sanctioned)'
					label='BG Limit (Sanctioned)'
					width='45vw'
				/>
				<CustomTextField
					placeholder='BG Utilized'
					label='BG Utilized'
					width='45vw'
				/>
				<CustomTextField
					placeholder='BG Available (Sanctioned – Utilized)'
					label='BG Available (Sanctioned – Utilized)'
					width='45vw'
				/>
				<CustomTextField
					placeholder='Quoted Price'
					label='Quoted Price'
					width='45vw'
				/>
			</Box>
			<Box mb={3} display={"flex"} flexDirection='column'>
				<Typography fontWeight='400'fontSize={14} mb={1}>
					Litigation/Blacklist Declaration
				</Typography>

				<Box mb={3} display='flex' gap={2}>
					<CustomSelect
						options={["Yes", "No"]}
						placeholder='Yes'
						width='100px'
					/>
					<CustomTextField placeholder='Lorem Ipsum' width='37vw' />
				</Box>
			</Box>

			{/* Next Button */}
			<Box
				sx={{
					position: "sticky",
					bottom: 16,
					right: 32,
					display: "flex",
					marginRight: 4,
					justifyContent: "flex-end",
				}}>
				<CustomButton label='Next' />
			</Box>
		</Box>
	);
};

export default QualificationInputs;
