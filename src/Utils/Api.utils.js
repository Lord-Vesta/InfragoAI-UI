import { ApiConfig } from "./Api.config";
import axiosclient from "./Axios-Client";
const { SEND_OTP, VERIFY_OTP, UPLOAD_PDF_ANONYMOUS, PROJECTS } = ApiConfig;

export const sendOtp = async (data) => {
  try {
    const response = await axiosclient.post(SEND_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await axiosclient.post(VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadPdfAnonymous = async (data) => {
  try {
    const response = await axiosclient.post(UPLOAD_PDF_ANONYMOUS, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadPdfAuthenticated = async (data) => {
  try {
    const response = await axiosclient.post(
      PROJECTS + data?.project_id + "upload-pdf/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
