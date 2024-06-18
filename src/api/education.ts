import api, { baseURL } from "../config/axios";

const education = "api/educations";

export const getEducationByUserID = async (userID: string) => {
    return await api.get(`${baseURL}/${education}/${userID}`);
};

export const createEducation = async (userID: string, data: {}) => {
    return await api.get(`${baseURL}/${education}/${userID}`, data);
};

export const deleteEducation = async (id: string) => {
    return await api.delete(`${baseURL}/${education}/${id}`);
};

export const getEducationByID = async (id: string) => {
    return await api.get(`${baseURL}/${education}/${id}/show`);
};

export const updateEducation = async (id: string, data: {}) => {
    return await api.put(`${baseURL}/${education}/${id}`, data);
};
