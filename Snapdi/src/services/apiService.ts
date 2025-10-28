import axiosInstance from "../config/axiosConfig";
import { useLoadingStore } from "../config/zustand";
import type { ResponseModel } from "../models/ResponseModel";
import type { AxiosRequestConfig } from "axios";

interface ApiConfig extends AxiosRequestConfig {
  loading?: boolean;
}

export const get = async <T>(url: string, params?: any, config?: boolean | ApiConfig): Promise<ResponseModel<T>> => {
  try {
    const isLoading = typeof config === 'boolean' ? config : (config as ApiConfig)?.loading ?? true;
    const axiosConfig = typeof config === 'object' ? config : undefined;

    useLoadingStore.getState().setIsLoadingFlag(isLoading);
    const response = await axiosInstance.get<any>(url, { params, ...axiosConfig });

    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false);
  }
};

export const post = async <T>(url: string, data: any, config?: boolean | ApiConfig): Promise<ResponseModel<T>> => {
  try {
    const isLoading = typeof config === 'boolean' ? config : (config as ApiConfig)?.loading ?? true;
    const axiosConfig = typeof config === 'object' ? config : undefined;

    useLoadingStore.getState().setIsLoadingFlag(isLoading);
    const response = await axiosInstance.post<any>(url, data, axiosConfig);

    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error posting to ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false);
  }
};

export const put = async <T>(url: string, data: any, config?: boolean | ApiConfig): Promise<ResponseModel<T>> => {
  try {
    const isLoading = typeof config === 'boolean' ? config : (config as ApiConfig)?.loading ?? true;
    const axiosConfig = typeof config === 'object' ? config : undefined;

    useLoadingStore.getState().setIsLoadingFlag(isLoading);
    const response = await axiosInstance.put<any>(url, data, axiosConfig);

    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error updating ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false);
  }
};

export const del = async <T>(url: string, config?: boolean | ApiConfig): Promise<ResponseModel<T>> => {
  try {
    const isLoading = typeof config === 'boolean' ? config : (config as ApiConfig)?.loading ?? true;
    const axiosConfig = typeof config === 'object' ? config : undefined;

    useLoadingStore.getState().setIsLoadingFlag(isLoading);
    const response = await axiosInstance.delete<any>(url, axiosConfig);

    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error deleting ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false);
  }
};

export const patch = async <T>(url: string, data: any, config?: boolean | ApiConfig): Promise<ResponseModel<T>> => {
  try {
    const isLoading = typeof config === 'boolean' ? config : (config as ApiConfig)?.loading ?? true;
    const axiosConfig = typeof config === 'object' ? config : undefined;

    useLoadingStore.getState().setIsLoadingFlag(isLoading);
    const response = await axiosInstance.patch<any>(url, data, axiosConfig);

    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    return {
      success: true,
      message: 'Success',
      data: response.data,
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error patching ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false);
  }
};
