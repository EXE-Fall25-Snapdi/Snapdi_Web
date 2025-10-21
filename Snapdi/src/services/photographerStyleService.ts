import axiosInstance from "../config/axiosConfig";
import { API_CONSTANTS } from "../constants/apiConstants";

export interface AddMultipleStylesRequest {
  styleIds: number[];
}

class PhotographerStyleService {
  // Add multiple styles to photographer
  async addMultipleStyles(userId: number, styleIds: number[]): Promise<void> {
    await axiosInstance.post(
      API_CONSTANTS.PHOTOGRAPHER_STYLES.ADD_MULTIPLE(userId),
      { styleIds }
    );
  }
}

export const photographerStyleService = new PhotographerStyleService();
