import axios from "axios";
import { userStore } from "../store/userStore";

export const baseURL = "http://localhost:8080";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        ContentType: "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
    },
});

const isOngoingMaintenance = (status: number) => {
    if (status === 404 || status === 400) {
        window.location.href = "/notfound";
    } else if (status === 401) {
        window.location.href = "/login";
        const { logOut } = userStore();
        logOut();
    }
};

api.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        isOngoingMaintenance(error.response?.status);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        isOngoingMaintenance(response.data);
        return response;
    },
    (error) => {
        isOngoingMaintenance(error.response?.status);
        return Promise.reject(error);
    }
);

export default api;
