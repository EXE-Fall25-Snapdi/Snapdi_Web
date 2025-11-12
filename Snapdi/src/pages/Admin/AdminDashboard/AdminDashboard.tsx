import { Card, DatePicker, Select, Space, message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Users, DollarSign, MessageSquare, CreditCard } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { dashboardService, type DashboardRevenueResponse, type DashboardStatistics } from '../../../services/dashboardService';
import dayjs, { type Dayjs } from 'dayjs';
import { formatPrice } from '../../../utils/formatPrice';

const { RangePicker } = DatePicker;
const { Option } = Select;

type DateRangePreset = 'last7days' | 'last30days' | 'custom';

const AdminDashboard = () => {
  // State for statistics data
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [statisticsLoading, setStatisticsLoading] = useState(false);

  // State for revenue data
  const [revenueData, setRevenueData] = useState<DashboardRevenueResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateRangePreset, setDateRangePreset] = useState<DateRangePreset>('last30days');
  const [customDateRange, setCustomDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  // Fetch revenue data based on date range
  const fetchRevenueData = async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);
      let data: DashboardRevenueResponse;

      if (startDate && endDate) {
        data = await dashboardService.getRevenueByDay(startDate, endDate);
      } else if (dateRangePreset === 'last7days') {
        data = await dashboardService.getLast7DaysRevenue();
      } else {
        data = await dashboardService.getLast30DaysRevenue();
      }

      setRevenueData(data);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      message.error('Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard statistics
  const fetchStatistics = async () => {
    try {
      setStatisticsLoading(true);
      const data = await dashboardService.getDashboardStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      message.error('Failed to load dashboard statistics');
    } finally {
      setStatisticsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchStatistics();
    fetchRevenueData();
  }, [dateRangePreset]);

  // Handle preset change
  const handlePresetChange = (value: DateRangePreset) => {
    setDateRangePreset(value);
    if (value !== 'custom') {
      setCustomDateRange(null);
    }
  };

  // Handle custom date range change
  const handleCustomDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      const validDates: [Dayjs, Dayjs] = [dates[0], dates[1]];
      setCustomDateRange(validDates);
      fetchRevenueData(dates[0].toDate(), dates[1].toDate());
    } else {
      setCustomDateRange(null);
    }
  };

  // Format data for chart
  const chartData = revenueData?.dailyRevenue.map(item => ({
    date: dayjs(item.date).format('MM/DD'),
    revenue: item.totalRevenue,
    transactions: item.transactionCount,
  })) || [];

  // Create dashboard cards from statistics
  const dashboardCards = statistics ? [
    {
      label: 'Total Users',
      value: statistics.userStatistics.totalUsers.toLocaleString(),
      change: `${statistics.userStatistics.totalPhotographers.toLocaleString()} photographers; ${statistics.userStatistics.totalCustomers.toLocaleString()} customers; ${statistics.userStatistics.totalAdmins.toLocaleString()} admins`,
      icon: Users,
      accent: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Revenue',
      value: `${formatPrice(statistics.revenueStatistics.todayRevenue)}/day`,
      change: `${formatPrice(statistics.revenueStatistics.totalRevenue)} total`,
      icon: DollarSign,
      accent: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Total Reviews',
      value: `${statistics.reviewStatistics.totalReviews}`,
      change: `Avg ${statistics.reviewStatistics.averageRating}★ from ${statistics.reviewStatistics.totalReviews} reviews`,
      icon: MessageSquare,
      accent: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Transactions',
      value: statistics.transactionStatistics.todayTransactions.toLocaleString() + ' today',
      change: `${statistics.transactionStatistics.totalTransactions.toLocaleString()} total transactions`,
      icon: CreditCard,
      accent: 'bg-orange-100 text-orange-600',
    },
  ] : [];

  return (
    <div className="space-y-6 max-h-screen overflow-y-auto">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statisticsLoading ? (
          <div className="col-span-4 flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          dashboardCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
                    <span className="text-xs text-slate-500">{item.change}</span>
                  </div>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.accent}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
              </Card>
            );
          })
        )}
      </section>

      <section className="gap-6">
        <Card className="col-span-1 2xl:col-span-2 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Revenue by Day</h3>
              <p className="text-sm text-slate-500">
                {revenueData
                  ? `Total: ${formatPrice(revenueData.totalRevenue)} | Avg: ${formatPrice(revenueData.averageDailyRevenue)}/day | ${revenueData.totalTransactions} transactions`
                  : 'Daily revenue performance'
                }
              </p>
            </div>

            <Space direction="vertical" size="small" className="w-full md:w-auto">
              <Select
                value={dateRangePreset}
                onChange={handlePresetChange}
                className="w-full md:w-48"
              >
                <Option value="last7days">Last 7 Days</Option>
                <Option value="last30days">Last 30 Days</Option>
                <Option value="custom">Custom Range</Option>
              </Select>

              {dateRangePreset === 'custom' && (
                <RangePicker
                  value={customDateRange}
                  onChange={handleCustomDateRangeChange}
                  className="w-full"
                  format="YYYY-MM-DD"
                />
              )}
            </Space>
          </div>

          <div className="mt-6 h-96 w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Spin size="large" />
              </div>
            ) : chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">No revenue data available for selected period</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickFormatter={(value) => `${value >= 1000000 ? formatPrice(Math.round(value / 1000).toString()) + '' : formatPrice(value.toString())}`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      borderColor: '#E2E8F0',
                      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'revenue') return [`${formatPrice(value.toString())}`, 'Revenue'];
                      return [`${value.toLocaleString()} transactions`, 'Transactions'];
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                    yAxisId="left"
                  />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    stroke="#3B82F6"
                    fill="url(#colorTransactions)"
                    strokeWidth={3}
                    yAxisId="right"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
