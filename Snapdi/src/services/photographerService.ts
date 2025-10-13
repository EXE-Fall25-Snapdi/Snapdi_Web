import { API_CONSTANTS } from "../constants/apiConstants";
import type {
  PhotographerPendingLevelResponse,
  PhotographerPendingLevelSearchRequest,
  PhotographerSearchRequest,
  PhotographerSearchResponse,
} from "../lib/types";
import type { ResponseModel } from "../models/ResponseModel";
import { patch, post } from "./apiService";

export const photographerService = {
  searchPendingLevelAssignments: (
    payload: PhotographerPendingLevelSearchRequest
  ): Promise<ResponseModel<PhotographerPendingLevelResponse>> => {
    return post<PhotographerPendingLevelResponse>(
      API_CONSTANTS.USERS.SEARCH_PHOTOGRAPHER_PENDING_LEVEL,
      payload
    );
  },
  searchPhotographers: (
    payload: PhotographerSearchRequest
  ): Promise<ResponseModel<PhotographerSearchResponse>> => {
    return post<PhotographerSearchResponse>(
      API_CONSTANTS.USERS.SEARCH_PHOTOGRAPHERS,
      payload
    );
  },
  updatePhotographerLevel: (
    userId: number,
    levelPhotographer: string
  ): Promise<ResponseModel<null>> => {
    return patch<null>(
      API_CONSTANTS.USERS.UPDATE_PHOTOGRAPHER_LEVEL(userId),
      { levelPhotographer }
    );
  },
};
