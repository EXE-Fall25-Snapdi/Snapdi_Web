import { get } from './apiService';

export interface DailyRevenue {
  date: string;
  totalRevenue: number;
  transactionCount: number;
}

export interface DashboardRevenueResponse {
  dailyRevenue: DailyRevenue[];
  totalRevenue: string;
  averageDailyRevenue: string;
  totalTransactions: number;
  startDate: string;
  endDate: string;
}

export interface UserStatistics {
  totalUsers: number;
  totalAdmins: number;
  totalPhotographers: number;
  totalCustomers: number;
}

export interface RevenueStatistics {
  todayRevenue: string;
  totalRevenue: string;
}

export interface TransactionStatistics {
  todayTransactions: number;
  totalTransactions: number;
}
export interface ReviewStatistics {
  averageRating: Float32Array;
  totalReviews: number;
}
export interface DashboardStatistics {
  userStatistics: UserStatistics;
  revenueStatistics: RevenueStatistics;
  transactionStatistics: TransactionStatistics;
  reviewStatistics: ReviewStatistics;
}


class DashboardService {
  /**
   * Get revenue data grouped by day for admin dashboard
   * @param startDate Optional start date (ISO string or Date)
   * @param endDate Optional end date (ISO string or Date)
   * @returns Revenue data grouped by day
   */
  async getRevenueByDay(startDate?: string | Date, endDate?: string | Date): Promise<DashboardRevenueResponse> {
    const params: Record<string, string> = {};

    if (startDate) {
      params.startDate = startDate instanceof Date ? startDate.toISOString() : startDate;
    }

    if (endDate) {
      params.endDate = endDate instanceof Date ? endDate.toISOString() : endDate;
    }

    const response = await get<DashboardRevenueResponse>('/api/dashboard/revenue-by-day', params);
    return response.data!;
  }

  /**
   * Get revenue for last 7 days
   */
  async getLast7DaysRevenue(): Promise<DashboardRevenueResponse> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    return this.getRevenueByDay(startDate, endDate);
  }

  /**
   * Get revenue for last 30 days
   */
  async getLast30DaysRevenue(): Promise<DashboardRevenueResponse> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    return this.getRevenueByDay(startDate, endDate);
  }

  /**
   * Get dashboard summary statistics
   * @returns Complete dashboard statistics including user counts, revenue, and transactions
   */
  async getDashboardStatistics(): Promise<DashboardStatistics> {
    const response = await get<DashboardStatistics>('/api/dashboard/statistics');
    return response.data!;
  }
}

export const dashboardService = new DashboardService();


