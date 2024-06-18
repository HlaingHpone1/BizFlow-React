import api, { baseURL } from "../config/axios";

const skill = "api/skills";

export const createSkill = async (userID: string, data: {}) => {
    return api.post(`${baseURL}/${skill}/${userID}`, data);
};

export const getSkillByUserID = async (userID: string) => {
    return await api.get(`${baseURL}/${skill}/${userID}`);
};

export const getSkillByID = async (id: string) => {
    return await api.get(`${baseURL}/${skill}/${id}/show`);
};

export const deleteSkill = async (id: string) => {
    return await api.delete(`${baseURL}/${skill}/${id}`);
};

export const updateSkill = async (id: string, data: {}) => {
    return await api.put(`${baseURL}/${skill}/${id}`, data);
};
