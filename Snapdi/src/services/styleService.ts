import axiosInstance from "../config/axiosConfig";
import { API_CONSTANTS } from "../constants/apiConstants";
import type { Style } from "../lib/types";
// Style Types


export interface CreateStyleRequest {
  styleName: string;
}

export interface UpdateStyleRequest {
  styleName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

class StyleService {
  // Get all styles (Public endpoint)
  async getAllStyles(): Promise<Style[]> {
    const response = await axiosInstance.get<Style[]>(
      API_CONSTANTS.STYLES.GET_ALL
    );
    return response.data;
  }

  // Create new style (Admin only)
  async createStyle(data: CreateStyleRequest): Promise<Style> {
    const response = await axiosInstance.post<Style>(
      API_CONSTANTS.STYLES.CREATE,
      data
    );
    return response.data;
  }

  // Update style (Admin only)
  async updateStyle(id: number, data: UpdateStyleRequest): Promise<Style> {
    const response = await axiosInstance.put<Style>(
      API_CONSTANTS.STYLES.UPDATE(id),
      data
    );
    return response.data;
  }

  // Delete style (Admin only)
  async deleteStyle(id: number): Promise<void> {
    await axiosInstance.delete(API_CONSTANTS.STYLES.DELETE(id));
  }
}

export const styleService = new StyleService();
