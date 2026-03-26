import axiosInstance from "./axiosInstance";

export const getUserByUsername = async (username: string) => {
    const response = await axiosInstance.get(`api/users/${username}`);
    return response.data;
};
