import React from 'react';
import { Card, Spin, Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useVercelAnalytics } from '../../../hooks/useVercelAnalytics';
import AnalyticsSetup from '../AnalyticsSetup/AnalyticsSetup';

const VercelAnalytics: React.FC = () => {
  const { data, error, isLoading } = useVercelAnalytics(false); // Set to false for real API data

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <AnalyticsSetup />;
  }

  if (!data) {
    return (
      <Alert
        message="No analytics data available"
        type="info"
        showIcon
      />
    );
  }
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-[#34D399]">
            {data.stats.totalViews.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Page Views</div>
        </Card>

        <Card className="text-center">
          <div className="text-2xl font-bold text-[#34D399]">
            {data.stats.uniqueVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Unique Visitors</div>
        </Card>

        <Card className="text-center">
          <div className="text-2xl font-bold text-[#34D399]">
            {data.stats.bounceRate}
          </div>
          <div className="text-sm text-gray-600">Bounce Rate</div>
        </Card>

        <Card className="text-center">
          <div className="text-2xl font-bold text-[#34D399]">
            {data.stats.avgSessionDuration}
          </div>
          <div className="text-sm text-gray-600">Avg Session Duration</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <Card title={<span className="font-sf-pro font-bold">Page Views & Visitors (Last 5 Days)</span>}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.pageViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#34D399"
                strokeWidth={3}
                name="Page Views"
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#10B981"
                strokeWidth={3}
                name="Unique Visitors"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Device Types Pie Chart */}
        <Card title={<span className="font-sf-pro font-bold">Traffic by Device Type</span>}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.deviceTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.deviceTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Pages */}
      <Card title={<span className="font-sf-pro font-bold">Top Pages</span>}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topPages} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="path" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="views" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Pages Table */}
      <Card title={<span className="font-sf-pro font-bold">Page Performance Details</span>}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-sf-pro font-bold">Page</th>
                <th className="text-right py-2 font-sf-pro font-bold">Views</th>
                <th className="text-right py-2 font-sf-pro font-bold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.topPages.map((page, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-sf-pro">{page.path}</td>
                  <td className="text-right py-2 font-sf-pro">{page.views.toLocaleString()}</td>
                  <td className="text-right py-2 font-sf-pro">{page.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-center text-sm text-gray-500 mt-4">
        📊 Analytics data refreshes every 5 minutes |
        <span className="text-[#34D399] ml-2">Powered by Vercel Analytics</span>
      </div>
    </div>
  );
};

export default VercelAnalytics;