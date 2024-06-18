import api, { baseURL } from "../config/axios";

const post = "api/posts";

export const getAllPosts = async () => {
    return await api.get(`${baseURL}/${post}`);
};

export const createPost = async (data: {}) => {
    return await api.post(`${baseURL}/${post}`, data);
};

export const getPostsByUserID = async (userID: string) => {
    return await api.get(`${baseURL}/${post}/${userID}`);
};

export const updatePost = async (id: string, body: {}) => {
    return await api.put(`${baseURL}/${post}/${id}`, body);
};

export const deletePost = async (userID: string, postID: string) => {
    return await api.delete(
        `${baseURL}/${post}?postId=${postID}&userId=${userID}`
    );
};
