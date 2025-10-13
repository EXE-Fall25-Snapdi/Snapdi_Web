import { Card } from 'antd';
import {
  dashboardSummaryCards,
  dashboardRevenueTrend,
  dashboardTransactionActivity,
  dashboardReviewHighlights,
  dashboardMeta,
  type DashboardTransaction,
} from '../../../utils/mock-data';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';


const getStatusBadge = (status: DashboardTransaction['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'refunded':
      return 'bg-rose-100 text-rose-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const AdminDashboard = () => {
  const UpdatedIcon = dashboardMeta.lastUpdatedBadge.icon;
  const ActivityIcon = dashboardMeta.activityBadgeIcon;
  const updatedLabel = dashboardMeta.lastUpdatedBadge.text;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardSummaryCards.map((item) => {
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
        })}
      </section>

      <section className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <Card className="col-span-1 2xl:col-span-2 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Revenue & Activity</h3>
              <p className="text-sm text-slate-500">Performance over the last 6 months</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              <UpdatedIcon className="h-4 w-4" /> {updatedLabel}
            </span>
          </div>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardRevenueTrend}>
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
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  yAxisId="left"
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, borderColor: '#E2E8F0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}
                  formatter={(value: number, name: string) => {
                    if (name === 'revenue') return [`$${value.toLocaleString()}`, 'Revenue'];
                    return [`${value.toLocaleString()} bookings`, 'Transactions'];
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
          </div>
        </Card>

        <Card className="col-span-1 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Transaction Activity</h3>
              <p className="text-sm text-slate-500">Latest 8 of {dashboardTransactionActivity.length} updates</p>
            </div>
            <span className="rounded-full bg-slate-100 p-2 text-slate-500">
              <ActivityIcon className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {dashboardTransactionActivity.map((item) => (
              <div key={item.id} className="flex items-start justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.customer}</p>
                  <p className="text-xs text-slate-500">{item.id}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-900">${item.amount.toLocaleString()}</span>
                  <span className="text-xs text-slate-400">{item.createdAt}</span>
                  <span className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <Card className="border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Review Highlights</h3>
              <p className="text-sm text-slate-500">Curated feedback from the last 30 days</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">4.7 ★ overall</span>
          </div>
          <div className="mt-4 space-y-4">
            {dashboardReviewHighlights.map((review) => (
              <div key={review.name} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                    <span className="text-xs text-slate-500">{review.role}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>{index < Math.round(review.rating) ? '★' : '☆'}</span>
                    ))}
                    <span className="ml-1 text-xs text-slate-500">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{review.feedback}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;