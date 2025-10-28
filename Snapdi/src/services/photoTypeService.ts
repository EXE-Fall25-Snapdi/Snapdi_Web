import { API_CONSTANTS } from "../constants/apiConstants";
import type { PhotoType } from "../lib/types";
import { get, post, put, del } from "./apiService";
export interface CreatePhotoTypeRequest {
  photoTypeName: string;
}

export interface UpdatePhotoTypeRequest {
  photoTypeName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

class PhotoTypeService {
  // Get all photo types (Public endpoint)
  async getAllPhotoTypes(): Promise<PhotoType[]> {
    const response = await get<PhotoType[]>(
      API_CONSTANTS.PHOTO_TYPES.GET_ALL
    );
    return response.data;
  }

  // Get photo type by ID (Public endpoint)
  async getPhotoTypeById(id: number): Promise<PhotoType> {
    const response = await get<PhotoType>(
      API_CONSTANTS.PHOTO_TYPES.GET_BY_ID(id)
    );
    return response.data;
  }

  // Create new photo type (Admin only)
  async createPhotoType(data: CreatePhotoTypeRequest): Promise<PhotoType> {
    const response = await post<PhotoType>(
      API_CONSTANTS.PHOTO_TYPES.CREATE,
      data
    );
    return response.data;
  }

  // Update photo type (Admin only)
  async updatePhotoType(id: number, data: UpdatePhotoTypeRequest): Promise<PhotoType> {
    const response = await put<PhotoType>(
      API_CONSTANTS.PHOTO_TYPES.UPDATE(id),
      data
    );
    return response.data;
  }

  // Delete photo type (Admin only)
  async deletePhotoType(id: number): Promise<void> {
    await del (API_CONSTANTS.PHOTO_TYPES.DELETE(id));
  }

  // Check if photo type name exists (Public endpoint)
  async checkPhotoTypeNameExists(photoTypeName: string): Promise<boolean> {
    const response = await get<boolean>(
      API_CONSTANTS.PHOTO_TYPES.CHECK_NAME,
      { params: { photoTypeName } }
    );
    return response.data;
  }
}

export const photoTypeService = new PhotoTypeService();
