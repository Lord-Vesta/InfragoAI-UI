export const API_URL = import.meta.env.VITE_BACKEND_URL;
export const ApiConfig = {
  PROJECTS: `/api/projects/`,
  SEND_OTP: `/api/users/send-otp/`,
  VERIFY_OTP: `${API_URL}/api/users/verify-otp/`,
  UPLOAD_PDF_ANONYMOUS: `/api/projects/upload-pdf/`,
  PROJECTLIST: `/api/projects/userprojects/`,
  CREATEPROJECT: `/api/projects/create/`,
  QUALIFICATION_INPUTS: (projectId) => `/api/projects/${projectId}/data/submit/`,
  GET_QUALIFICATION_INPUTS: (projectId) => `/api/projects/${projectId}/data/`,
  GET_EXTRACTED_DATA:  (projectId) => `/api/projects/${projectId}/extract/`,
  PDF_DOWNLOAD: `/api/projects/`,
  EDIT_EXTRACTED_DATA: (projectId) => `/api/projects/${projectId}/update-edited-fields/`,
  GET_EXTRACTED_INPUTS: (projectId) => `/api/projects/${projectId}/extracted-data/`,
};
