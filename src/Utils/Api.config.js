export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const ApiConfig = {
    SEND_OTP: `/api/users/send-otp/`,
    VERIFY_OTP: `${API_URL}/api/users/verify-otp/`,
}