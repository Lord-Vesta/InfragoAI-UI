import { ApiConfig } from "./Api.config";
import axiosclient from "./Axios-Client";
const {SEND_OTP, VERIFY_OTP} = ApiConfig

export const sendOtp = async (data) => {
    try {
        const response = await axiosclient.post(SEND_OTP, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verifyOtp = async (data) => {
    try {
        const response = await axiosclient.post(VERIFY_OTP, data);
        return response.data;
    } catch (error) {
        throw error;
    }   
}