import type { ResponseModel } from "../models/ResponseModel";
import type { Keyword } from "../lib/types";
import { API_CONSTANTS } from "../constants/apiConstants";
import { get, post, put } from "./apiService";

export const getAllKeywords = async ():Promise<ResponseModel<Keyword[]>> => {
  const response = await get<Keyword[]>(API_CONSTANTS.KEYWORDS.GET_ALL);
  return response;
}; 
export const getKeywordById = async (keywordId: string):Promise<ResponseModel<Keyword>> => {
  const response = await get<Keyword>(API_CONSTANTS.KEYWORDS.GET_BY_ID(keywordId));
  return response;
};
export const getBlogsByKeyword = async (keywordId: string):Promise<ResponseModel<Keyword>> => {
  const response = await get<Keyword>(API_CONSTANTS.KEYWORDS.GET_BLOGS(keywordId));
  return response;
};
export const searchKeywords = async (query: string):Promise<ResponseModel<Keyword[]>> => {
  const response = await get<Keyword[]>(API_CONSTANTS.KEYWORDS.SEARCH, { query });
  return response;
};
export const getKeywordsByBlog = async (blogId: string):Promise<ResponseModel<Keyword[]>> => {
  const response = await get<Keyword[]>(API_CONSTANTS.KEYWORDS.GET_BLOG_KEYWORDS(blogId));
  return response;
};

export const createKeyword = async (keywordData: Partial<Keyword>):Promise<ResponseModel<Keyword>> => {
  const response = await post<Keyword>(API_CONSTANTS.KEYWORDS.CREATE, keywordData);
  return response;
};
export const getOrCreateKeywords = async (keywords: string[]):Promise<ResponseModel<Keyword[]>> => {
  const response = await post<Keyword[]>(API_CONSTANTS.KEYWORDS.GET_OR_CREATE, { keywords });
  return response;
};

export const updateKeyword = async (keywordId: string, keywordData: Partial<Keyword>):Promise<ResponseModel<Keyword>> => {
  const response = await put<Keyword>(API_CONSTANTS.KEYWORDS.UPDATE(keywordId), keywordData);
  return response;
};
