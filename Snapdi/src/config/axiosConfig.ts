import axios, { type InternalAxiosRequestConfig } from "axios";
import { useLoadingStore, useUserStore } from "./zustand"; // Adjust path
import { toast } from "react-toastify";


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean; // Allow requests to override loading behavior
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : "https://localhost:7000", // Use proxy for development
  timeout: 1000000,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    const { isLoadingFlag, setLoading } = useLoadingStore.getState();

    // Ensure isLoadingFlag is defined
    if (isLoadingFlag === undefined) {
      console.error("isLoadingFlag is undefined. Initializing to false.");
      useLoadingStore.getState().setIsLoadingFlag(false);
    }

    // Always set loading to true when a request starts
    if (isLoadingFlag && config.showLoading !== false) {
      setLoading(true);
    }

    // Attach token if available
    const token = useUserStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const { isLoadingFlag, setLoading } = useLoadingStore.getState();
    if (isLoadingFlag) {
      setLoading(false);
    }
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const { isLoadingFlag, setLoading } = useLoadingStore.getState();
    if (isLoadingFlag) {
      setLoading(false);
    }
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 201 || response.status === 204 || response.status === 202) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    return response;
  },
  (error) => {
    const { isLoadingFlag, setLoading } = useLoadingStore.getState();
    if (isLoadingFlag) {
      setLoading(false);
    }

    if (error.response) {
      // Handle different status codes
      switch (error.response.status) {
        case 400:
          if (error.response.data?.message) {
            toast.error(error.response.data.message);
          } else if (error.response.data) {
            toast.error(error.response.data);
          } else if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Bad Request");
          }
          break;
        case 401:
          toast.error("Unauthorized - Please login again");
          // Clear user data and redirect to login
          if (!window.location.pathname.includes('/admin-login')) {
            useUserStore.getState().clearUser();
            // You might want to redirect to login page here
            window.location.href = '/admin-login';
          }
          break;
        case 403:
          toast.error("Access denied - Insufficient permissions");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          if (error.response.data?.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred");
          }
      }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error("An error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
