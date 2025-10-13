import axiosInstance from "../config/axiosConfig";
import { useLoadingStore } from "../config/zustand";
import type { ResponseModel } from "../models/ResponseModel";

export const get = async <T>(url: string, params?: any, loading?: boolean): Promise<ResponseModel<T>> => {
  try {
    useLoadingStore.getState().setIsLoadingFlag(loading ?? true); // Set loading flag
    const response = await axiosInstance.get<any>(url, { params });

    // Check if response is already in ResponseModel format
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    // If not, wrap the response in ResponseModel format
    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false); // Clear loading flag
  }
};

export const post = async <T>(url: string, data: any, loading?: boolean): Promise<ResponseModel<T>> => {
  try {
    useLoadingStore.getState().setIsLoadingFlag(loading ?? true); // Set loading flag
    const response = await axiosInstance.post<any>(url, data);

    // Check if response is already in ResponseModel format
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    // If not, wrap the response in ResponseModel format
    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error posting to ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false); // Clear loading flag
  }
};

export const put = async <T>(url: string, data: any, loading?: boolean): Promise<ResponseModel<T>> => {
  try {
    useLoadingStore.getState().setIsLoadingFlag(loading ?? true); // Set loading flag
    const response = await axiosInstance.put<any>(url, data);

    // Check if response is already in ResponseModel format
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    // If not, wrap the response in ResponseModel format
    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error updating ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false); // Clear loading flag
  }
};

export const del = async <T>(url: string, loading?: boolean): Promise<ResponseModel<T>> => {
  try {
    useLoadingStore.getState().setIsLoadingFlag(loading ?? true); // Set loading flag
    const response = await axiosInstance.delete<any>(url);

    // Check if response is already in ResponseModel format
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response.data as ResponseModel<T>;
    }

    // If not, wrap the response in ResponseModel format
    return {
      success: true,
      message: 'Success',
      data: response.data
    } as ResponseModel<T>;
  } catch (error) {
    console.error(`Error deleting ${url}:`, error);
    throw error;
  } finally {
    useLoadingStore.getState().setIsLoadingFlag(false); // Clear loading flag
  }
};

export const patch = async <T>(url: string, data: any, loading?: boolean): Promise<ResponseModel<T>> => {
  try {
    useLoadingStore.getState().setIsLoadingFlag(loading ?? true);
    const response = await axiosInstance.patch<any>(url, data);

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
