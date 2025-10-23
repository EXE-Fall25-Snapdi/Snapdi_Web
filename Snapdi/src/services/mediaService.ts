import { post } from "./apiService";
import { API_CONSTANTS } from "../constants/apiConstants";

export type SignatureReq = {
  entityType: "user" | "portfolio";
  entityId: number;
  role: "avatar" | "thumbnail" | "photo";
};

export type SignatureRes = {
  cloudName: string;
  apiKey: string;
  signature: string;
  timestamp: number;
  folder: string;
  eager?: string;
};

export const getSignature = (req: SignatureReq) =>
  post<SignatureRes>(API_CONSTANTS.MEDIA.SIGNATURE, req);

export const confirmUpload = (body: {
  entityType: "user" | "portfolio";
  entityId: number;
  role: "avatar" | "thumbnail" | "photo";
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
}) => post<any>(API_CONSTANTS.MEDIA.CONFIRM, body);


