import type { ResponseModel } from "../models/ResponseModel";
import type { Blog, PaginatedResponse } from "../lib/types";
import { API_CONSTANTS } from "../constants/apiConstants";
import { get, post, put, del } from "./apiService";

export const getBlogWithPaging = async (pageNumber: number, pageSize: number) => {
  const response = await get<PaginatedResponse<Blog>>(API_CONSTANTS.BLOGS.GET_PAGED, { pageNumber, pageSize });
  return response;
};
export const getActiveBlogWithPaging = async (pageNumber: number, pageSize: number): Promise<ResponseModel<PaginatedResponse<Blog>>> => {
  console.log("Fetching active blogs with paging:", API_CONSTANTS.BLOGS.GET_ACTIVE_PAGED);
  const response = await get<PaginatedResponse<Blog>>(API_CONSTANTS.BLOGS.GET_ACTIVE_PAGED, { pageNumber, pageSize });
  return response;
};

export const getBlogById = async (blogId: string): Promise<ResponseModel<Blog>> => {
  const response = await get<Blog>(API_CONSTANTS.BLOGS.GET_BY_ID(blogId));
  return response;
};
export const getBlogsByAuthorWithPaging = async (authorId: string, page: number, pageSize: number): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_BY_AUTHOR_PAGED(authorId), { page, pageSize });
  return response;
};

export const getBlogsByKeywordWithPaging = async (keywordId: string, page: number, pageSize: number): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_BY_KEYWORD_PAGED(keywordId), { page, pageSize });
  return response;
};
export const getAllBlogs = async (): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_ALL);
  return response;
};

export const getActiveBlogs = async (): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_ACTIVE);
  return response;
};
export const getBlogsByAuthor = async (authorId: string): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_BY_AUTHOR(authorId));
  return response;
}
export const getBlogsByKeyword = async (keywordId: string): Promise<ResponseModel<Blog[]>> => {
  const response = await get<Blog[]>(API_CONSTANTS.BLOGS.GET_BY_KEYWORD(keywordId));
  return response;
}

export const createBlog = async (blogData: Partial<Blog>): Promise<ResponseModel<Blog>> => {
  const response = await post<Blog>(API_CONSTANTS.BLOGS.CREATE, blogData);
  return response;
};

export const updateBlog = async (blogId: string, blogData: Partial<Blog>): Promise<ResponseModel<Blog>> => {
  const response = await put<Blog>(API_CONSTANTS.BLOGS.UPDATE(blogId), blogData);
  return response;
};
export const changeBlogStatus = async (blogId: string, isActive: boolean): Promise<ResponseModel<Blog>> => {
  const response = await put<Blog>(API_CONSTANTS.BLOGS.UPDATE(blogId), { isActive });
  return response;
};

export const deleteBlog = async (blogId: string): Promise<ResponseModel<null>> => {
  const response = await del<null>(API_CONSTANTS.BLOGS.DELETE(blogId));
  return response;
};