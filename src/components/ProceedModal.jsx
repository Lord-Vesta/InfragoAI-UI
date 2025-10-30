import React from "react";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import colors from "../assets/colors";
import CustomButton from "../components/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "#fff",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const BeforeProceedModal = ({ open, handleClose, handleProceed, loading }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          mb={2}
          sx={{ color: "#1E3787", fontSize: "20px" }}
        >
          Before We Proceed
        </Typography>

        <Typography
          align="center"
          mb={3}
          sx={{ fontSize: "14px", color: "#4B555F" }}
        >
          To personalize your tender insights and connect you with Bank Guarantee
          providers or potential Joint Venture partners…
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            flexWrap: "wrap",
            mb: 3,
          }}
        >
          <Box
            sx={{
              flex: "1",
              minWidth: "260px",
              p: 2,
              border: "1px solid #e1e1e1",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <GppGoodOutlinedIcon
              fontSize="large"
              style={{ color: "#0FB97D" }}
            />
            <Typography fontWeight="600" mt={1}>
              Secure & Confidential
            </Typography>
            <Typography fontSize="14px" color="#4B555F">
              Your financial data is encrypted and is used only for qualification
              and BG matching. We never share it without your consent.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: "1",
              minWidth: "260px",
              p: 2,
              border: "1px solid #e1e1e1",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <PeopleOutlineOutlinedIcon
              fontSize="large"
              style={{ color: "#1E3787" }}
            />
            <Typography fontWeight="600" mt={1}>
              Access to Verified Partners
            </Typography>
            <Typography fontSize="14px" color="#4B555F">
              Sharing your details allows Infrago to recommend trusted Bank
              Guarantee providers and qualified JV partners to strengthen your
              bid.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            mt: 2,
            bgcolor: "#e8fff0",
            borderRadius: "8px",
            border: "1px solid #059669",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <LockOutlinedIcon
              fontSize="small"
              sx={{ color: colors.green, mt: "3px" }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography fontSize="14px" fontWeight={600} color="#059669">
                Why we ask this information
              </Typography>
              <Typography
                sx={{ fontSize: "12px", lineHeight: 1.4, color: "#059669" }}
              >
                Your turnover, net worth and BG limit help our AI engine
                calculate your eligibility and proactively match you with
                financial partners who can issue required guarantees on time.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CustomButton
            label={
              loading ? (
                <>
                  <CircularProgress
                    size={18}
                    color="inherit"
                    sx={{ mr: 1 }}
                  />
                  Proceeding...
                </>
              ) : (
                "Continue to Provide Details"
              )
            }
            onClick={handleProceed}
            width="250px"
            disabled={loading}
          />
        </Box>

        <Typography
          mt={2}
          textAlign="center"
          fontSize="12px"
          color="#4B555F"
        >
          By continuing, you agree that Infrago may process your data securely
          to assist with qualification and financial facilitation.
        </Typography>
      </Box>
    </Modal>
  );
};

export default BeforeProceedModal;
