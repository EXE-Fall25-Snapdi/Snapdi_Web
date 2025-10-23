import type { ComponentType } from 'react';
import {
  BarChart3,
  CreditCard,
  DollarSign,
  LineChart,
  MessageSquare,
  Users,
} from 'lucide-react';
import type { Style } from '../lib/types';

export type DashboardSummaryCard = {
  label: string;
  value: string;
  change: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  transactions: number;
};

export type DashboardTransaction = {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  createdAt: string;
};

export type ReviewHighlight = {
  name: string;
  role: string;
  rating: number;
  feedback: string;
};

export const dashboardSummaryCards: DashboardSummaryCard[] = [
  {
    label: 'Total Users',
    value: '12,480',
    change: '6,240 photographers; 6,240 customers',
    icon: Users,
    accent: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Revenue',
    value: '$82,150/day',
    change: '50,000 in last 30 days',
    icon: DollarSign,
    accent: 'bg-emerald-100 text-emerald-600',
  },
  {
    label: 'Total Reviews',
    value: '1,238',
    change: 'Avg ★ 4.7 from 10+ reviews',
    icon: MessageSquare,
    accent: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Transactions',
    value: '2,482',
    change: '20+ new transactions today',
    icon: CreditCard,
    accent: 'bg-orange-100 text-orange-600',
  },
];

export const dashboardRevenueTrend: RevenuePoint[] = [
  { month: 'Apr', revenue: 52000, transactions: 1880 },
  { month: 'May', revenue: 61000, transactions: 1965 },
  { month: 'Jun', revenue: 68500, transactions: 2042 },
  { month: 'Jul', revenue: 70200, transactions: 2108 },
  { month: 'Aug', revenue: 75600, transactions: 2240 },
  { month: 'Sep', revenue: 82150, transactions: 2482 },
];

export const dashboardTransactionActivity: DashboardTransaction[] = [
  { id: '#TX-2451', customer: 'Nguyen Van A', amount: 320, status: 'completed', createdAt: '10m ago' },
  { id: '#TX-2450', customer: 'Tran Thi B', amount: 580, status: 'completed', createdAt: '25m ago' },
  { id: '#TX-2449', customer: 'Le Minh C', amount: 120, status: 'pending', createdAt: '43m ago' },
  { id: '#TX-2448', customer: 'Sarah Lee', amount: 980, status: 'completed', createdAt: '1h ago' },
  { id: '#TX-2447', customer: 'David Kim', amount: 250, status: 'completed', createdAt: '2h ago' },
  { id: '#TX-2446', customer: 'Pham Van D', amount: 415, status: 'completed', createdAt: '3h ago' },
  { id: '#TX-2445', customer: 'Maria Garcia', amount: 870, status: 'completed', createdAt: '4h ago' },
  { id: '#TX-2444', customer: 'Pham Hai', amount: 150, status: 'pending', createdAt: '5h ago' },
];

export const dashboardReviewHighlights: ReviewHighlight[] = [
  {
    name: 'Linh Nguyen',
    role: 'Wedding Client',
    rating: 5,
    feedback:
      'Amazing experience! The photographer captured every special moment. Highly recommended for anyone looking for professional service.',
  },
  {
    name: 'Quang Tran',
    role: 'Professional Photographer',
    rating: 4.5,
    feedback:
      'Great platform to connect with clients. Dashboard improvements are noticeable and booking workflows are smoother.',
  },
];

export const dashboardMeta = {
  lastUpdatedBadge: {
    icon: LineChart,
    text: 'Updated 5 minutes ago',
  },
  activityBadgeIcon: BarChart3,
};

export type PhotographerLevel =
  "Chưa có cấp độ"
  | 'Người mới'
  | 'Nghiệp Dư'
  | 'Bán Chuyên'
  | 'Chuyên Nghiệp'
  | 'Chuyên Gia';

export type PhotographerLevelOption = {
  label: string;
  value: PhotographerLevel;
  apiValue: string;
};

export type PhotographerApplicationItem = {
  userId: number;
  roleId: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  isVerify: boolean;
  createdAt: string;
  locationAddress: string;
  locationCity: string;
  avatarUrl: string;
  equipmentDescription: string;
  yearsOfExperience: string | number; // Format: "số năm | mô tả" (ví dụ: "3 | Intermediate") hoặc số
  photoType: string;
  photoPrice: string;
  workLocation?: string;
  avgRating: number;
  isAvailable: boolean;
  description: string;
  photographerStyles: Style[];
  photographerLevel: PhotographerLevel;
  photoPortfolio: string[];
};



export const photographerLevelOptions: PhotographerLevelOption[] = [
  { label: 'Chưa có cấp độ', value: 'Chưa có cấp độ', apiValue: '' },
  { label: 'Người mới', value: 'Người mới', apiValue: 'Người mới' },
  { label: 'Nghiệp Dư', value: 'Nghiệp Dư', apiValue: 'Nghiệp Dư' },
  { label: 'Bán Chuyên', value: 'Bán Chuyên', apiValue: 'Bán Chuyên' },
  { label: 'Chuyên Nghiệp', value: 'Chuyên Nghiệp', apiValue: 'Chuyên Nghiệp' },
  { label: 'Chuyên Gia', value: 'Chuyên Gia', apiValue: 'Chuyên Gia' },
];

export type TransactionRecord = {
  key: string;
  id: string;
  customer: string;
  photographer: string;
  service: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Refunded';
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'VNPay' | 'Momo';
  createdAt: string;
};

export const transactionHistoryRecords: TransactionRecord[] = [
  { key: '1', id: '#TX-2401', customer: 'Nguyen Van A', photographer: 'Linh Nguyen', service: 'Wedding Full-day', amount: 950, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-28T09:25:00Z' },
  { key: '2', id: '#TX-2402', customer: 'Tran Thi B', photographer: 'Gia Han', service: 'Portrait Session', amount: 180, status: 'Pending', paymentMethod: 'Momo', createdAt: '2024-09-28T11:15:00Z' },
  { key: '3', id: '#TX-2403', customer: 'David Kim', photographer: 'Minh Khoa', service: 'Fashion Editorial', amount: 720, status: 'Completed', paymentMethod: 'VNPay', createdAt: '2024-09-27T18:42:00Z' },
  { key: '4', id: '#TX-2404', customer: 'Sarah Lee', photographer: 'Thu Trang', service: 'Travel Documentary', amount: 540, status: 'Completed', paymentMethod: 'Bank Transfer', createdAt: '2024-09-27T14:20:00Z' },
  { key: '5', id: '#TX-2405', customer: 'Pham Van C', photographer: 'Linh Nguyen', service: 'Engagement Shoot', amount: 420, status: 'Refunded', paymentMethod: 'Credit Card', createdAt: '2024-09-26T08:10:00Z' },
  { key: '6', id: '#TX-2406', customer: 'Maria Garcia', photographer: 'Gia Han', service: 'Product Catalog', amount: 360, status: 'Completed', paymentMethod: 'Bank Transfer', createdAt: '2024-09-26T09:40:00Z' },
  { key: '7', id: '#TX-2407', customer: 'Pham Hai', photographer: 'Minh Khoa', service: 'Corporate Headshots', amount: 260, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-25T16:10:00Z' },
  { key: '8', id: '#TX-2408', customer: 'Le Hong', photographer: 'Thu Trang', service: 'Landscape Commission', amount: 1200, status: 'Completed', paymentMethod: 'Momo', createdAt: '2024-09-24T12:45:00Z' },
  { key: '9', id: '#TX-2409', customer: 'Alicia Fernandez', photographer: 'Linh Nguyen', service: 'Family Portrait', amount: 285, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-24T09:12:00Z' },
  { key: '10', id: '#TX-2410', customer: 'Nguyen Thi D', photographer: 'Gia Han', service: 'Graduation Session', amount: 190, status: 'Pending', paymentMethod: 'VNPay', createdAt: '2024-09-24T08:05:00Z' },
  { key: '11', id: '#TX-2411', customer: 'John Smith', photographer: 'Minh Khoa', service: 'Commercial Campaign', amount: 1540, status: 'Completed', paymentMethod: 'Bank Transfer', createdAt: '2024-09-23T20:35:00Z' },
  { key: '12', id: '#TX-2412', customer: 'Tran Hai', photographer: 'Thu Trang', service: 'Adventure Expedition', amount: 980, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-23T10:50:00Z' },
  { key: '13', id: '#TX-2413', customer: 'Pham Minh', photographer: 'Linh Nguyen', service: 'Proposal Surprise', amount: 410, status: 'Refunded', paymentMethod: 'Momo', createdAt: '2024-09-22T15:30:00Z' },
  { key: '14', id: '#TX-2414', customer: 'Lisa Wong', photographer: 'Gia Han', service: 'Brand Storytelling', amount: 620, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-22T13:25:00Z' },
  { key: '15', id: '#TX-2415', customer: 'Ethan Clark', photographer: 'Minh Khoa', service: 'Music Video BTS', amount: 880, status: 'Completed', paymentMethod: 'Bank Transfer', createdAt: '2024-09-21T19:12:00Z' },
  { key: '16', id: '#TX-2416', customer: 'Pham Nhi', photographer: 'Thu Trang', service: 'Pre-wedding in Da Lat', amount: 1120, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-21T09:34:00Z' },
  { key: '17', id: '#TX-2417', customer: 'Do Minh', photographer: 'Linh Nguyen', service: 'Anniversary Shoot', amount: 310, status: 'Pending', paymentMethod: 'VNPay', createdAt: '2024-09-20T17:18:00Z' },
  { key: '18', id: '#TX-2418', customer: 'Charlotte Dupont', photographer: 'Gia Han', service: 'Editorial Feature', amount: 760, status: 'Completed', paymentMethod: 'Momo', createdAt: '2024-09-20T13:56:00Z' },
  { key: '19', id: '#TX-2419', customer: 'Nguyen Thanh', photographer: 'Minh Khoa', service: 'Art Exhibition', amount: 1040, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-19T08:22:00Z' },
  { key: '20', id: '#TX-2420', customer: 'Pham Thu', photographer: 'Thu Trang', service: 'Travel Journal', amount: 530, status: 'Completed', paymentMethod: 'Bank Transfer', createdAt: '2024-09-18T11:35:00Z' },
  { key: '21', id: '#TX-2421', customer: 'Mark Taylor', photographer: 'Linh Nguyen', service: 'Corporate Retreat', amount: 760, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-18T07:58:00Z' },
  { key: '22', id: '#TX-2422', customer: 'Tran Van', photographer: 'Gia Han', service: 'Mini Session', amount: 140, status: 'Pending', paymentMethod: 'Momo', createdAt: '2024-09-17T14:44:00Z' },
  { key: '23', id: '#TX-2423', customer: 'Pham Hoang', photographer: 'Minh Khoa', service: 'Studio Session', amount: 310, status: 'Completed', paymentMethod: 'VNPay', createdAt: '2024-09-17T09:27:00Z' },
  { key: '24', id: '#TX-2424', customer: 'Rachel Adams', photographer: 'Thu Trang', service: 'Travel Photography', amount: 670, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-16T10:05:00Z' },
];

export const transactionStatusAccent: Record<TransactionRecord['status'], string> = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Refunded: 'bg-rose-100 text-rose-700',
};
