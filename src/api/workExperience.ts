import api, { baseURL } from "../config/axios";

const workExperience = "api/work-experiences";

export const getWorkExperienceByUserID = async (userID: string) => {
    return await api.get(`${baseURL}/${workExperience}/${userID}`);
};

export const createWorkExperience = async (userID: string, data: {}) => {
    return await api.post(`${baseURL}/${workExperience}/${userID}`, data);
};

export const deleteWorkExperience = async (id: string) => {
    return await api.delete(`${baseURL}/${workExperience}/${id}`);
};

export const getWorkExperienceByID = async (id: string) => {
    return await api.get(`${baseURL}/${workExperience}/${id}/show`);
};

export const updateWorkExperience = async (id: string, data: {}) => {
    return await api.put(`${baseURL}/${workExperience}/${id}`, data);
};
