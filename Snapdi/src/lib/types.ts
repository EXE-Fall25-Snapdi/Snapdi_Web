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
  description?: string | null;
  levelPhotographer?: string | null;
};

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
