import { get, post, put, del } from './apiService';
import { API_CONSTANTS } from '../constants/apiConstants';
import type { User, CreateUserRequest, UpdateUserRequest, UserFilterRequest, PaginatedResponse } from '../lib/types';
import type { ResponseModel } from '../models/ResponseModel';

export const userService = {
  // Create new user (Admin only)
  createUser: (data: CreateUserRequest): Promise<ResponseModel<User>> => {
    return post<User>(API_CONSTANTS.USERS.CREATE_USER, data);
  },

  // Get users with filtering and paging (Admin only)
  getUsers: (filters: UserFilterRequest): Promise<ResponseModel<PaginatedResponse<User>>> => {
    return post<PaginatedResponse<User>>(API_CONSTANTS.USERS.GET_USERS_FILTER, filters);
  },

  // Get user by ID (Public endpoint)
  getUserById: (id: number): Promise<ResponseModel<User>> => {
    return get<User>(API_CONSTANTS.USERS.GET_USER_BY_ID(id));
  },

  // Update user
  updateUser: (id: number, data: UpdateUserRequest): Promise<ResponseModel<User>> => {
    return put<User>(API_CONSTANTS.USERS.UPDATE_USER(id), data);
  },

  // Delete user (Admin only)
  deleteUser: (id: number): Promise<ResponseModel<void>> => {
    return del<void>(API_CONSTANTS.USERS.DELETE_USER(id));
  },
};