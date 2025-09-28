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

export type Post = {
  id: string;
  title: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  comments: number;
  thumbnailUrl: string;
};

export type Comment = {
  id: string;
  author: string;
  avatar: string;
  imageHint: string;
  date: string;
  content: string;
  postTitle: string;
  status: 'Approved' | 'Pending' | 'Spam';
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
