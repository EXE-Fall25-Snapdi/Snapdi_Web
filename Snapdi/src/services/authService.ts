import { get, post, put } from "./apiService";
import type { ResponseModel } from "../models/ResponseModel";
import { API_CONSTANTS } from "../constants/apiConstants";
import axiosInstance from '../config/axiosConfig';
import { toast } from "react-toastify";

interface AuthResponse {
  token: string;
}

interface UserInfo {
  _id: string;
  email: string;
  role_code: string;
}

interface Role {
  id: string;
  name: string;
}
export function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error: string | any) {
    toast.error("Error decoding JWT: " + error.message);
    return null;
  }
}

export const login = async (email: string, password: string): Promise<ResponseModel<AuthResponse>> => {
  const response = await post<AuthResponse>(API_CONSTANTS.AUTH.LOGIN, { email, password });
  // Note: This function is deprecated, use loginUser instead
  return response;
};

export const getUserInfobyToken = async (loading?: boolean): Promise<ResponseModel<UserInfo>> => {
  const response = await get<UserInfo>(API_CONSTANTS.AUTH.USER_INFO, "", loading);
  // useLoadingStore.setState({ isLoadingFlag: false });
  return response;
};

export const getAllRoles = async (keyword?: string): Promise<ResponseModel<Role[]>> => {
  const response = await get<Role[]>(API_CONSTANTS.ROLES.GET_ALL, { keyword });
  return response;
};

export const logoutApi = async (): Promise<void> => {
  await post(API_CONSTANTS.AUTH.LOGOUT, {});
};

export const forgotPassword = async (email: string): Promise<ResponseModel<null>> => {
  return await put<null>(API_CONSTANTS.AUTH.FORGOT_PASSWORD, { email });
};

export const verifyToken = async (token: string): Promise<ResponseModel<null>> => {
  return await post<null>(API_CONSTANTS.AUTH.VERIFY_TOKEN, { token });
};
export const triggerVerifyToken = async (email: string): Promise<ResponseModel<any>> => {
  return post(API_CONSTANTS.AUTH.VERIFY_TOKEN, {
    email,
  });
};
export const resendToken = async (email: string): Promise<ResponseModel<any>> => {
  return post(API_CONSTANTS.AUTH.RESEND_TOKEN, {
    email,
  });
}

// New login function for the updated API
export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    userId: number;
    roleId: number;
    roleName: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    isVerify: boolean;
    createdAt: string;
    locationAddress: string;
    locationCity: string;
    avatarUrl: string;
  };
}

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(API_CONSTANTS.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error: any) {
    // Handle different error types
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid email/phone or password');
    }
    if (error.response?.status === 400) {
      throw new Error('Please check your login credentials');
    }
    throw new Error('Login failed. Please try again.');
  }
};

// Registration Types
export interface RegisterClientRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  roleId?: number;
  locationAddress?: string;
  locationCity?: string;
  avatarUrl?: string;
}

export interface RegisterPhotographerRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  locationAddress?: string;
  locationCity: string;
  avatarUrl?: string;
  yearsOfExperience: string;
  equipmentDescription: string;
  description?: string;
  isAvailable?: boolean;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface UserResponse {
  userId: number;
  roleId: number;
  roleName: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerify: boolean;
  createdAt: string;
  locationAddress: string;
  locationCity: string;
  avatarUrl: string;
}

export interface PhotographerResponse {
  user: UserResponse & {
    photographerProfile: {
      userId: number;
      equipmentDescription: string;
      yearsOfExperience: string;
      avgRating: number;
      isAvailable: boolean;
      description: string;
      levelPhotographer: string;
    };
    photoPortfolios: Array<{
      photoPortfolioId: number;
      userId: number;
      photoUrl: string;
    }>;
  };
  message: string;
}

// Send verification code (resend OTP)
export const sendVerificationCode = async (email: string): Promise<void> => {
  await axiosInstance.post(API_CONSTANTS.AUTH.RESEND, { email });
};

// Register as client
export const registerClient = async (data: RegisterClientRequest): Promise<UserResponse> => {
  const response = await axiosInstance.post<UserResponse>(
    API_CONSTANTS.AUTH.SIGNUP,
    data
  );
  return response.data;
};

// Register as photographer
export const registerPhotographer = async (
  data: RegisterPhotographerRequest
): Promise<PhotographerResponse> => {
  const response = await axiosInstance.post<PhotographerResponse>(
    API_CONSTANTS.AUTH.SIGNUP_PHOTOGRAPHER,
    data
  );
  return response.data;
};

// Verify email with OTP code
export const verifyEmailCode = async (data: VerifyEmailRequest): Promise<void> => {
  try {
    await axiosInstance.post(API_CONSTANTS.AUTH.VERIFY_OTP, data);
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Verification failed. Please check your code.');
  }
};