import axiosInstance from '../config/axiosConfig';
import { API_CONSTANTS } from '../constants/apiConstants';
import type { Review, PaginatedResponse } from '../lib/types';

interface ReviewResponse {
  success: boolean;
  message: string;
  data: PaginatedResponse<Review>;
}

export const reviewService = {
  /**
   * Get all reviews with pagination
   * @param page - Page number (default: 1)
   * @param pageSize - Page size (default: 10)
   * @returns Promise with reviews data
   */
  getReviews: async (page: number = 1, pageSize: number = 10): Promise<ReviewResponse> => {
    try {
      const response = await axiosInstance.get<ReviewResponse>(
        `${API_CONSTANTS.REVIEWS}?page=${page}&pageSize=${pageSize}`
      );

      return {
        success: response.data?.success ?? true,
        message: response.data?.message ?? 'Success',
        data: response.data?.data || response.data || {
          items: [],
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 0,
          hasPreviousPage: false,
          hasNextPage: false
        }
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  /**
   * Get review by ID
   * @param reviewId - Review ID
   * @returns Promise with review data
   */
  getReviewById: async (reviewId: number): Promise<{ success: boolean; data: Review }> => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: Review }>(
        `${API_CONSTANTS.REVIEWS}/${reviewId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching review ${reviewId}:`, error);
      throw error;
    }
  }
};
