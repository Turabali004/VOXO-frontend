import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auto logout on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.config.url !== "api/auth/login"
    ) {
      localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;