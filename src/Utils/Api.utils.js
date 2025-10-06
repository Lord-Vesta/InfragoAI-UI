import { ApiConfig } from "./Api.config";
import axiosclient from "./Axios-Client";
const {SEND_OTP, VERIFY_OTP, QUALIFICATION_INPUTS,GET_QUALIFICATION_INPUTS} = ApiConfig

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

export const qualificationInputs= async(data)=>{
    try{
        const response= await axiosclient.post(QUALIFICATION_INPUTS, data);
        return response.data;
    } catch (error){
        throw error;
    }
}

export const getQualificationInputs= async(data)=>{
    try{
        const response= await axiosclient.get(GET_QUALIFICATION_INPUTS);
        return response.data;
    }catch(error){
        throw error;
    }
}