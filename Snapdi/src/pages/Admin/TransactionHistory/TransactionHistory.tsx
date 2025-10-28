import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Card, Input, Select, Table, Tag, Spin, message, InputNumber, DatePicker, Button, FloatButton, Drawer } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DollarSign, Filter, Search, Users } from 'lucide-react';
import { paymentService, type PaymentRecord, type PaymentSummary } from '../../../services/paymentService';
import { formatPriceDisplay } from '../../../utils/formatPrice';

type StatusFilter = 'all' | string;

type SummaryMetric = {
  label: string;
  value: string;
  icon: ReactNode;
  helper: string;
  accent: string;
};

const paymentStatusAccent: Record<string, string> = {
  'Paid': 'bg-emerald-100 text-emerald-800',
  'Pending': 'bg-amber-100 text-amber-800',
  'Confirmed': 'bg-blue-100 text-blue-800',
  'Refunded': 'bg-slate-100 text-slate-800',
};

const TransactionHistory = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<PaymentRecord[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [total, setTotal] = useState(0);

  // Sort and filter states
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
  const [paymentDateFrom, setPaymentDateFrom] = useState<string | undefined>(undefined);
  const [paymentDateTo, setPaymentDateTo] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'amount' | 'paymentDate' | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Fetch data function
  const fetchData = async () => {
    setLoading(true);
    try {
      // Build search request - only include fields with actual values
      const searchRequest: any = {
        pageNumber: currentPage,
        pageSize: pageSize,
      };

      // Only add optional fields if they have values
      if (keyword) searchRequest.searchTerm = keyword;
      if (statusFilter !== 'all') searchRequest.paymentStatus = statusFilter;
      if (minAmount !== undefined && minAmount > 0) searchRequest.minAmount = minAmount;
      if (maxAmount !== undefined && maxAmount > 0) searchRequest.maxAmount = maxAmount;
      if (paymentDateFrom) searchRequest.paymentDateFrom = paymentDateFrom;
      if (paymentDateTo) searchRequest.paymentDateTo = paymentDateTo;
      if (sortBy) {
        searchRequest.sortBy = sortBy;
        searchRequest.sortDirection = sortDirection;
      }

      // Fetch transactions and summary in parallel
      const [transactionResult, summaryResult] = await Promise.all([
        paymentService.searchPayments(searchRequest),
        paymentService.getPaymentSummary(searchRequest),
      ]);

      setTransactions(transactionResult.data);
      setTotal(transactionResult.totalRecords);
      setSummary(summaryResult);
    } catch (error) {
      console.error('Failed to fetch transaction data:', error);
      message.error('Failed to load transaction data');
    } finally {
      setLoading(false);
    }
  };

  // Load data on initial mount
  useEffect(() => {
    fetchData();
    setIsInitialLoad(false);
  }, []);

  // Fetch data when search is triggered or pagination changes
  useEffect(() => {
    if (!isInitialLoad) {
      fetchData();
    }
  }, [keyword, statusFilter, currentPage, pageSize, triggerSearch]);

  const summaryMetrics: SummaryMetric[] = useMemo(() => {
    if (!summary) {
      return [
        {
          label: 'Total Revenue',
          value: '$0',
          helper: 'Total payment amount',
          icon: <DollarSign className="h-6 w-6" />,
          accent: 'bg-emerald-50 text-emerald-600',
        },
        {
          label: 'Total Transactions',
          value: '0',
          helper: 'All transactions processed',
          icon: <Users className="h-6 w-6" />,
          accent: 'bg-blue-50 text-blue-600',
        },
        {
          label: 'Pending Payments',
          value: '0',
          helper: 'Awaiting confirmation or payment',
          icon: <Filter className="h-6 w-6" />,
          accent: 'bg-amber-50 text-amber-600',
        },
        {
          label: 'Average Amount',
          value: '$0',
          helper: 'Average transaction amount',
          icon: <Search className="h-6 w-6" />,
          accent: 'bg-rose-50 text-rose-600',
        },
      ];
    }

    return [
      {
        label: 'Total Revenue (VND)',
        value: `${formatPriceDisplay(summary.totalAmount)}`,
        helper: 'Total payment amount',
        icon: <DollarSign className="h-6 w-6" />,
        accent: 'bg-emerald-50 text-emerald-600',
      },
      {
        label: 'Total Transactions',
        value: summary.totalPayments.toString(),
        helper: 'All transactions processed',
        icon: <Users className="h-6 w-6" />,
        accent: 'bg-blue-50 text-blue-600',
      },
      {
        label: 'Pending Payments',
        value: summary.pendingCount.toString(),
        helper: 'Awaiting confirmation or payment',
        icon: <Filter className="h-6 w-6" />,
        accent: 'bg-amber-50 text-amber-600',
      },
      {
        label: 'Average Amount (VND)',
        value: `${formatPriceDisplay(summary.averageAmount)}`,
        helper: 'Average transaction amount',
        icon: <Search className="h-6 w-6" />,
        accent: 'bg-rose-50 text-rose-600',
      },
    ];
  }, [summary]);

  const columns: ColumnsType<PaymentRecord> = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      render: (value: number) => <span className="font-semibold text-slate-700">#{value}</span>,
    },
    {
      title: 'Customer',
      dataIndex: ['booking', 'customer', 'name'],
      key: 'customer',
      render: (value: string) => value || 'N/A',
    },
    {
      title: 'Photographer',
      dataIndex: ['booking', 'photographer', 'name'],
      key: 'photographer',
      render: (value: string) => value || 'N/A',
    },
    {
      title: 'Location',
      dataIndex: ['booking', 'location'],
      key: 'location',
      responsive: ['md'],
      render: (value: string) => value || 'N/A',
    },
    {
      title: 'Method',
      dataIndex: 'transactionMethod',
      key: 'transactionMethod',
      responsive: ['lg'],
    },
    {
      title: 'Amount (VND)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span className="font-semibold text-slate-900">{formatPriceDisplay(amount)}</span>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => (
        <Tag className={`rounded-full px-3 py-1 text-xs font-medium ${paymentStatusAccent[status] || 'bg-slate-100 text-slate-800'}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="text-slate-500 align-text-top">Monitor marketplace payments, statuses, and booking revenue.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            prefix={<Search className="h-4 w-4 text-slate-400" />}
            placeholder="Search by transaction ID or reference"
            className="w-full sm:w-80"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setCurrentPage(1);
            }}
            allowClear
          />
          <Select
            className="w-full sm:w-48"
            value={statusFilter}
            onChange={(value: StatusFilter) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Paid', value: 'Paid' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Confirmed', value: 'Confirmed' },
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
            <h2 className="text-lg font-semibold text-slate-900">All transactions</h2>
            <p className="text-sm text-slate-500">Total: {total} transactions</p>
          </div>
        </div>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={transactions.map((t, i) => ({ ...t, key: i }))}
            scroll={{ x: 960 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Spin>
      </Card>

      {/* Float Button for Filter */}
      <FloatButton
        icon={<Filter  />}
        type="primary"
        onClick={() => setFilterDrawerOpen(true)}
        tooltip="Advanced Filters"
      />

      {/* Filter Drawer */}
      <Drawer
        title="Advanced Filters"
        placement="right"
        width={400}
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        extra={
          <Button
            type="primary"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              setCurrentPage(1);
              setTriggerSearch(!triggerSearch);
              setFilterDrawerOpen(false);
            }}
          >
            Apply Filters
          </Button>
        }
      >
        <div className="space-y-4">
          {/* Min Amount */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Min Amount (VND)</label>
            <InputNumber
              min={0}
              placeholder="0"
              className="w-full"
              addonAfter="VND"
              value={minAmount}
              onChange={(value) => {
                setMinAmount(value ?? undefined);
              }}
              formatter={(value) => {
                if (!value) return '';
                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
              }}
              parser={(value: any) => {
                return value?.replace(/\./g, '');
              }}
            />
          </div>

          {/* Max Amount */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Max Amount (VND)</label>
            <InputNumber
              min={0}
              placeholder="0"
              className="w-full"
              addonAfter="VND"
              value={maxAmount}
              onChange={(value) => {
                setMaxAmount(value ?? undefined);
              }}
              formatter={(value) => {
                if (!value) return '';
                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
              }}
              parser={(value: any) => {
                return value?.replace(/\./g, '');
              }}
            />
          </div>

          {/* Payment Date From */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">From Date</label>
            <DatePicker
              className="w-full"
              placeholder="Select from date"
              onChange={(date) => {
                const isoDate = date ? date.toISOString() : undefined;
                setPaymentDateFrom(isoDate);
              }}
            />
          </div>

          {/* Payment Date To */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">To Date</label>
            <DatePicker
              className="w-full"
              placeholder="Select to date"
              onChange={(date) => {
                const isoDate = date ? date.toISOString() : undefined;
                setPaymentDateTo(isoDate);
              }}
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Sort By</label>
            <Select
              className="w-full"
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
              }}
              options={[
                { label: 'None', value: '' },
                { label: 'Amount', value: 'amount' },
                { label: 'Payment Date', value: 'paymentDate' },
              ]}
            />
          </div>

          {/* Sort Direction */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Direction</label>
            <Select
              className="w-full"
              value={sortDirection}
              onChange={(value) => {
                setSortDirection(value);
              }}
              options={[
                { label: 'Ascending', value: 'asc' },
                { label: 'Descending', value: 'desc' },
              ]}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default TransactionHistory;
