export const API_URL = import.meta.env.VITE_BACKEND_URL;
export const ApiConfig = {
  PROJECTS: `/api/projects/`,
  SEND_OTP: `/api/users/send-otp/`,
  VERIFY_OTP: `${API_URL}/api/users/verify-otp/`,
    QUALIFICATION_INPUTS:`/api/projects/1/data/submit/`,
    GET_QUALIFICATION_INPUTS:`/api/projects/1/data/`,
  UPLOAD_PDF_ANONYMOUS: `/api/projects/upload-pdf/`,
};
