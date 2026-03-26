import api from "./axiosInstance";
import type {
    LoginPayload,
    RegisterPayload,
} from "../types/auth";

export const registerUser = async (payload: RegisterPayload) => {
    const { data } = await api.post("api/auth/signup", payload);
    return data;
};

export const loginUser = async (payload: LoginPayload) => {
    const { data } = await api.post("api/auth/login", payload);
    return data;
};

export const logoutUser = async () => {
    const { data } = await api.get("api/auth/logout");
    return data;
};

export const fetchCurrentUser = async () => {
    const { data } = await api.get("api/auth/me");
    return data.user;
};