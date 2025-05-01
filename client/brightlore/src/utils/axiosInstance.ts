import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://your-backend-url.com/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  }, // Include cookies for authentication if needed
});

// Optional: Request interceptor for adding authentication tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust based on your auth mechanism
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
