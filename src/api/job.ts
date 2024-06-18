import api, { baseURL } from "../config/axios";

const job = "api/jobs";

export const getJobPost = async () => {
    return await api.get(`${baseURL}/${job}`);
};

export const createJobPost = async (data: {}) => {
    return await api.post(`${baseURL}/${job}`, data);
};

export const getJobPostByJobID = async (id: string) => {
    return await api.get(`${baseURL}/${job}/${id}`);
};
