import api, { baseURL } from "../config/axios";

const auth = "api/auth";

export const login = async (data: {}) => {
    return await api.post(`${baseURL}/${auth}/login`, data);
};

export const register = async (data: {}) => {
    return await api.post(`${baseURL}/${auth}/register`, data);
};

export const verifyMail = async (data: {}) => {
    return await api.post(`${baseURL}/${auth}/verify-mail`, data);
};

export const otpCode = async (data: {}) => {
    return await api.post(`${baseURL}/${auth}/newOTP`, data);
};

export const restPasswordWithPassword = async (data: {}) => {
    return await api.put(`${baseURL}/${auth}/reset-password`, data);
};

export const verifyOTPCode = async (data: {}) => {
    return await api.post(`${baseURL}/${auth}/verify-otp`, data);
};

export const resetPasswordWithOTP = async (data: {}) => {
    return await api.put(`${baseURL}/${auth}/reset-password-otp`, data);
};
