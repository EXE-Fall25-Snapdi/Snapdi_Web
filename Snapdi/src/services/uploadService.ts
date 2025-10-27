import axiosInstance from "../config/axiosConfig";
import { API_CONSTANTS } from "../constants/apiConstants";

// Cloudinary Types
export interface CloudinaryUploadResponse {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resourceType: string;
  createdAt: string;
  signature: string;
  etag: string;
}

export interface CloudinaryMultipleUploadResponse {
  successfulUploads: CloudinaryUploadResponse[];
  failedUploads: Array<{
    fileName: string;
    error: string;
    details: string;
  }>;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
}

// PhotoPortfolio Types
export interface PhotoPortfolio {
  photoPortfolioId: number;
  userId: number;
  photoUrl: string; // This will store publicId
}

export interface CreateMultiplePortfoliosRequest {
  photoUrls: string[]; // Array of publicIds
}

export interface CreateMultiplePortfoliosResponse {
  createdPortfolios: PhotoPortfolio[];
  failedPhotoUrls: string[];
  totalAttempted: number;
  successCount: number;
  failedCount: number;
  isCompleteSuccess: boolean;
  message: string;
}

class CloudinaryService {
  // Upload single image
  async uploadSingle(
    file: File,
    publicId: string | '',
    uploadType: string
  ): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("publicId", publicId ? publicId : '');
    formData.append("uploadType", uploadType);

    const response = await axiosInstance.post<CloudinaryUploadResponse>(
      API_CONSTANTS.CLOUDINARY.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  // Upload multiple images
  async uploadMultiple(
    files: File[],
    uploadType: string = "portfolio"
  ): Promise<CloudinaryMultipleUploadResponse> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("uploadType", uploadType);

    const response = await axiosInstance.post<CloudinaryMultipleUploadResponse>(
      API_CONSTANTS.CLOUDINARY.UPLOAD_MULTIPLE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  // Delete single image
  async deleteSingle(publicId: string): Promise<void> {
    await axiosInstance.delete(API_CONSTANTS.CLOUDINARY.DELETE, {
      params: { publicId },
    });
  }

  // Delete multiple images
  async deleteMultiple(publicIds: string[]): Promise<void> {
    await axiosInstance.delete(API_CONSTANTS.CLOUDINARY.DELETE_MULTIPLE, {
      data: publicIds,
    });
  }

  // Transform URL - Get Cloudinary image URL from publicId
  async transformUrl(
    publicId: string,
    transformOptions?: {
      autoOptimize?: boolean;
      crop?: string;
      gravity?: string;
      quality?: number;
      width?: number;
      height?: number;
      format?: string;
    }
  ): Promise<{ url: string }> {
    const response = await axiosInstance.post<{ url: string }>(
      `${API_CONSTANTS.CLOUDINARY.TRANSFORM_URL}?publicId=${encodeURIComponent(publicId)}`,
      transformOptions || {
        autoOptimize: true,
        crop: 'fill',
        gravity: 'auto',
        quality: 80
      }
    );
    return response.data;
  }
}

class PhotoPortfolioService {
  // Create multiple portfolios
  async createMultiple(
    publicIds: string[]
  ): Promise<CreateMultiplePortfoliosResponse> {
    const response = await axiosInstance.post<CreateMultiplePortfoliosResponse>(
      API_CONSTANTS.PHOTO_PORTFOLIO.CREATE_MULTIPLE,
      { photoUrls: publicIds }
    );
    return response.data;
  }

  // Get user's portfolios
  async getMyPortfolios(): Promise<PhotoPortfolio[]> {
    const response = await axiosInstance.get<PhotoPortfolio[]>(
      API_CONSTANTS.PHOTO_PORTFOLIO.GET_MY_PORTFOLIOS
    );
    return response.data;
  }

  // Delete portfolio
  async deletePortfolio(portfolioId: number): Promise<void> {
    await axiosInstance.delete(
      API_CONSTANTS.PHOTO_PORTFOLIO.DELETE(portfolioId)
    );
  }
}

export const cloudinaryService = new CloudinaryService();
export const photoPortfolioService = new PhotoPortfolioService();
