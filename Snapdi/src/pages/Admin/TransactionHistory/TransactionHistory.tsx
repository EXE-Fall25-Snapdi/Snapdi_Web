import { useMemo, useState, type ReactNode } from 'react';
import { Card, Input, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DollarSign, Filter, Search, Users } from 'lucide-react';
import {
  transactionHistoryRecords,
  transactionStatusAccent,
  type TransactionRecord,
} from '../../../utils/mock-data';

type StatusFilter = 'all' | TransactionRecord['status'];

type SummaryMetric = {
  label: string;
  value: string;
  icon: ReactNode;
  helper: string;
  accent: string;
};

const transactionData: TransactionRecord[] = transactionHistoryRecords;

const TransactionHistory = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [keyword, setKeyword] = useState('');

  const summaryMetrics: SummaryMetric[] = useMemo(() => {
    const totalRevenue = transactionData
      .filter((item) => item.status === 'Completed')
      .reduce((sum, item) => sum + item.amount, 0);
    const totalTransactions = transactionData.length;
    const pending = transactionData.filter((item) => item.status === 'Pending').length;
    const refunded = transactionData.filter((item) => item.status === 'Refunded').length;

    return [
      {
        label: 'Completed Revenue',
        value: `$${totalRevenue.toLocaleString()}`,
        helper: 'Only includes completed transactions',
        icon: <DollarSign className="h-6 w-6" />,
        accent: 'bg-emerald-50 text-emerald-600',
      },
      {
        label: 'Total Transactions',
        value: totalTransactions.toString(),
        helper: 'All bookings processed this month',
        icon: <Users className="h-6 w-6" />,
        accent: 'bg-blue-50 text-blue-600',
      },
      {
        label: 'Pending Approvals',
        value: pending.toString(),
        helper: 'Awaiting confirmation or payment',
        icon: <Filter className="h-6 w-6" />,
        accent: 'bg-amber-50 text-amber-600',
      },
      {
        label: 'Refunds Issued',
        value: refunded.toString(),
        helper: 'Refunded transactions in this period',
        icon: <Search className="h-6 w-6" />,
        accent: 'bg-rose-50 text-rose-600',
      },
    ];
  }, []);

  const filteredData = useMemo(() => {
    const cleanKeyword = keyword.trim().toLowerCase();
    return transactionData.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      if (!cleanKeyword) {
        return matchesStatus;
      }
      const haystack = [item.id, item.customer, item.photographer, item.service, item.paymentMethod].join(' ').toLowerCase();
      return matchesStatus && haystack.includes(cleanKeyword);
    });
  }, [keyword, statusFilter]);

  const columns: ColumnsType<TransactionRecord> = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (value: string) => <span className="font-semibold text-slate-700">{value}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Photographer',
      dataIndex: 'photographer',
      key: 'photographer',
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      responsive: ['md'],
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      responsive: ['lg'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span className="font-semibold text-slate-900">${amount.toLocaleString()}</span>,
      sorter: (a, b) => a.amount - b.amount,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Refunded', value: 'Refunded' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: TransactionRecord['status']) => (
        <Tag className={`rounded-full px-3 py-1 text-xs font-medium ${transactionStatusAccent[status]}`}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className=" text-slate-500 align-text-top">Monitor marketplace payments, statuses, and booking revenue.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            prefix={<Search className="h-4 w-4 text-slate-400" />}
            placeholder="Search by customer, service, or photographer"
            className="w-full sm:w-80"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            allowClear
          />
          <Select
            className="w-full sm:w-48"
            value={statusFilter}
            onChange={(value: StatusFilter) => setStatusFilter(value)}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Completed', value: 'Completed' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Refunded', value: 'Refunded' },
            ]}
          />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((metric) => (
          <Card key={metric.label} className="border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                <span className="text-xs text-slate-400">{metric.helper}</span>
              </div>
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.accent}`}>{metric.icon}</span>
            </div>
          </Card>
        ))}
      </section>

      <Card className="border border-slate-100 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Latest transactions</h2>
            <p className="text-sm text-slate-500">A rolling log of the most recent 24 bookings</p>
          </div>
          <Tag className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Auto-refresh every 15 min</Tag>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 960 }}
          pagination={{ pageSize: 8, showSizeChanger: false }}
        />
      </Card>
    </div>
  );
};

export default TransactionHistory;
