import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { useLoadingStore, useUserStore } from "./zustand"; // Adjust path
import { toast } from "react-toastify";
import { API_CONSTANTS } from "../constants/apiConstants";


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean; // Allow requests to override loading behavior
  _retry?: boolean; // Flag to prevent infinite retry loops
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : "https://snapdi-api-652504949137.asia-southeast1.run.app", // Use proxy for development
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
  async (error: AxiosError) => {
    const { isLoadingFlag, setLoading } = useLoadingStore.getState();
    if (isLoadingFlag) {
      setLoading(false);
    }

    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // Handle 401 Unauthorized - Try to refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useUserStore.getState().getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/${API_CONSTANTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { token, refreshToken: newRefreshToken } = response.data.data;

        // Update tokens in store
        useUserStore.getState().setToken(token);
        if (newRefreshToken) {
          useUserStore.getState().setRefreshToken(newRefreshToken);
        }

        // Update authorization header with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        // Retry original request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed - logout user
        toast.error("Session expired - Please login again");
        useUserStore.getState().clearUser();

        if (!window.location.pathname.includes('/admin-login')) {
          window.location.href = '/admin-login';
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      // Handle different status codes
      switch (error.response.status) {
        case 400:
          if ((error.response.data as any)?.message) {
            toast.error((error.response.data as any).message);
          } else if (error.response.data) {
            toast.error(error.response.data as string);
          } else if (error.message) {
            toast.error(error.message);
          } else {
            toast.error("Bad Request");
          }
          break;
        case 401:
          // Already handled above with token refresh
          if (originalRequest?._retry) {
            toast.error("Unauthorized - Please login again");
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
          if ((error.response.data as any)?.message) {
            toast.error((error.response.data as any).message);
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
