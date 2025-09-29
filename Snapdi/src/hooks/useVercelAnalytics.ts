import useSWR from 'swr';

interface AnalyticsData {
  pageViews: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
  topPages: Array<{
    path: string;
    views: number;
    percentage: number;
  }>;
  deviceTypes: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  stats: {
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: string;
    avgSessionDuration: string;
  };
}

// Mock data for development
const mockData: AnalyticsData = {
  pageViews: [
    { date: '2025-09-25', views: 1200, visitors: 450 },
    { date: '2025-09-26', views: 1580, visitors: 520 },
    { date: '2025-09-27', views: 1350, visitors: 480 },
    { date: '2025-09-28', views: 1750, visitors: 620 },
    { date: '2025-09-29', views: 1420, visitors: 540 },
  ],
  topPages: [
    { path: '/', views: 2500, percentage: 35 },
    { path: '/blog', views: 1800, percentage: 25 },
    { path: '/snaper', views: 1200, percentage: 17 },
    { path: '/about', views: 900, percentage: 13 },
    { path: '/contact', views: 700, percentage: 10 },
  ],
  deviceTypes: [
    { name: 'Desktop', value: 45, color: '#34D399' },
    { name: 'Mobile', value: 40, color: '#10B981' },
    { name: 'Tablet', value: 15, color: '#6EE7B7' },
  ],
  stats: {
    totalViews: 15420,
    uniqueVisitors: 4850,
    bounceRate: '65%',
    avgSessionDuration: '2m 45s',
  }
};

// Fetcher function for real Vercel Analytics API
const fetcher = async (url: string): Promise<AnalyticsData> => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_VERCEL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }

  return response.json();
};

export const useVercelAnalytics = (useMockData = false) => {
  const { data, error, isLoading } = useSWR<AnalyticsData>(
    useMockData ? null : 'https://snapdi-web.vercel.app/api/analytics', // Fetch from your deployed API
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  if (useMockData) {
    return {
      data: mockData,
      error: null,
      isLoading: false,
    };
  }

  return {
    data,
    error,
    isLoading,
  };
};

export type { AnalyticsData };