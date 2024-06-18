import api, { baseURL } from "../config/axios";

const users = "api/users";

export const getAllUser = async () => {
    return await api.get(`${baseURL}/${users}`);
};

export const getUserByID = async (id: string) => {
    return await api.get(`${baseURL}/${users}/${id}`);
};
