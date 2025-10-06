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
