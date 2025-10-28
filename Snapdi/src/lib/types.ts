export type User = {
  userId: number;
  roleId: number;
  roleName: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerify: boolean;
  createdAt: string;
  locationAddress: string;
  locationCity: string;
  avatarUrl: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
  roleId: number;
  locationAddress: string;
  locationCity: string;
  avatarUrl: string;
};

export type UpdateUserRequest = {
  name: string;
  phone: string;
  locationAddress: string;
  locationCity: string;
  avatarUrl: string;
  isActive: boolean;
  isVerify: boolean;
};

export type UserFilterRequest = {
  page: number;
  pageSize: number;
  searchTerm?: string;
  roleId?: number;
  isActive?: boolean;
  isVerified?: boolean;
  locationCity?: string;
  sortBy?: string;
  sortDirection?: string;
  createdFrom?: string;
  createdTo?: string;
};

export type Blog = {
  blogId: string;
  title: string;
  authorName: string;
  content: string;
  isActive: boolean;
  createAt: Date;
  updatedAt?: Date;
  thumbnailUrl: string;
  keywords: Keyword[];
};
export type Keyword = {
  keywordId: string;
  keyword: string;
  blogCount: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type SupportTicket = {
  id: string;
  subject: string;
  user: {
    name: string;
    email: string;
  };
  date: string;
  content: string;
  status: 'Open' | 'Closed' | 'In Progress';
};

export type PhotographerPortfolioItem = {
  photoPortfolioId: number;
  userId: number;
  photoUrl: string;
};

export type PhotographerProfileDetails = {
  userId: number;
  equipmentDescription?: string;
  yearsOfExperience?: number | string | null;
  avgRating?: number | null;
  isAvailable?: boolean | null;
  workLocation?: string | null;
  photoTypes: Type[];
  description?: string | null;
  levelPhotographer?: string | null;
  photographerStyles: Style[];
};
export interface Style {
  styleId: number;
  styleName: string;
}

export interface PhotoType {
  photoTypeId: number;
  photoTypeName: string;
  photoPrice?: number;
  time?: number;
}

// Alias for backward compatibility
export type Type = PhotoType;


export type PhotographerPendingLevelItem = User & {
  roleName?: string;
  photographerProfile?: PhotographerProfileDetails | null;
  photoPortfolios?: PhotographerPortfolioItem[] | null;
};

export type PhotographerPendingLevelSummary = {
  withPortfolioCount: number;
  withoutPortfolioCount: number;
  totalCount: number;
  withPortfolioPercentage: number;
  withoutPortfolioPercentage: number;
  message?: string;
  recommendation?: string;
};

export type PhotographerPendingLevelResponse = {
  withPortfolio: PaginatedResponse<PhotographerPendingLevelItem>;
  withoutPortfolio: PaginatedResponse<PhotographerPendingLevelItem>;
  totalCount: number;
  summary: PhotographerPendingLevelSummary;
};

export type PhotographerPendingLevelSearchRequest = {
  page: number;
  pageSize: number;
  searchTerm?: string;
  hasPortfolio?: boolean;
  locationCity?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  createdFrom?: string;
  createdTo?: string;
};

export type PhotographerSearchSummary = {
  totalPhotographers: number;
  availableCount: number;
  verifiedCount: number;
  withPortfolioCount: number;
  averageRating: number;
  mostCommonLocation?: string;
  message?: string;
};

export type PhotographerSearchResponse = {
  data: PhotographerPendingLevelItem[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  summary?: PhotographerSearchSummary;
};

export type PhotographerSearchRequest = {
  searchTerm?: string;
  locationCity?: string;
  levelPhotographer?: string;
  isAvailable?: boolean;
  isVerify?: boolean;
  isActive?: boolean;
  minRating?: number;
  maxRating?: number;
  yearsOfExperience?: string;
  hasPortfolio?: boolean;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
};


import type { UploadFile } from 'antd/es/upload/interface';
// Định nghĩa kiểu dữ liệu cho toàn bộ các bước
export interface SignUpFormData {
  // Step 0
  role: 'client' | 'photographer';

  // Step 1: Account (Từ Figma 1 & API)
  name: string;
  dob: string; // Từ figma, không có trong API
  gender: 'Nam' | 'Nữ'; // Từ figma, không có trong API
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Step 2: OTP
  otp: string;

  // Step 3: Profile (Từ Figma 2 & API)
  locationCity: string; // From Step 1 - nơi ở
  locationAddress?: string; // Optional địa chỉ cụ thể - from Step 1
  workLocation: string; // From Step 3 - khu vực làm việc
  experienceLevel: string; // Từ figma (radio), không có trong API
  yearsOfExperience: string; // Map từ "X năm"

  // Step 4: Portfolio & Photo Types (Từ Figma 3 & API)
  description: string; // Mô tả chuyên môn
  photographerPhotoTypes: Array<{
    photoTypeId: number;
    photoPrice: number;
    time?: number;
  }>; // Photo types with prices
  equipment: string[]; // Mảng các thiết bị
  portfolio: UploadFile[]; // Dùng cho AntD Upload

  // Step 5: Portfolio Photos & Styles
  styleIds: number[]; // Mảng ID của các style được chọn
}

export interface StatusStatistic {
  statusId: number;
  statusName: string;
  count: number;
  percentage: number;
}

export interface BookingStatistics {
  totalBookings: number;
  statusStatistics: StatusStatistic[];
  generatedAt: string;
}
