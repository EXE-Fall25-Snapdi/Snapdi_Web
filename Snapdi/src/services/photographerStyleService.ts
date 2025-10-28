import { API_CONSTANTS } from "../constants/apiConstants";
import { post } from "./apiService";

export interface AddMultipleStylesRequest {
  styleIds: number[];
}

class PhotographerStyleService {
  // Add multiple styles to photographer
  async addMultipleStyles(userId: number, styleIds: number[]): Promise<void> {
    await post(
      API_CONSTANTS.PHOTOGRAPHER_STYLES.ADD_MULTIPLE(userId),
      { styleIds }, true
    );
  }
}

export const photographerStyleService = new PhotographerStyleService();
