export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  imageHint: string;
  role: 'Customer' | 'Photographer' | 'Admin';
  status: 'Active' | 'Pending' | 'Banned';
  joined: string;
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
  data: T[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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
