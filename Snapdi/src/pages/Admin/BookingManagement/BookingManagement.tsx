import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Button,
  Select,
  Form,
  DatePicker,
  InputNumber,
  Space,
  Tag,
  Dropdown,
  Modal,
  message,
  Empty,
  Statistic,
  Tooltip,
  Input,
  FloatButton,
  Drawer,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { bookingService } from "../../../services/bookingService";
import {
  createSignalRConnection,
  joinAdminBookingGroup,
  leaveAdminBookingGroup,
  onBookingStatusChanged,
  onNewBookingCreated,
  onBookingUpdated,
  disconnectSignalR,
} from "../../../services/signalRService";
import { useUserStore } from "../../../config/zustand";
import BookingDetailModal from "../../../components/AdminComponents/BookingDetailModal";
import BookingEditModal from "../../../components/AdminComponents/BookingEditModal";
import type { Booking, BookingSearchRequest } from "../../../services/bookingService";
import type { BookingStatistics } from "../../../lib/types";

interface Filters {
  statusId?: number;
  customerId?: number;
  photographerId?: number;
  minPrice?: number;
  maxPrice?: number;
  dateFrom?: Dayjs | null;
  dateTo?: Dayjs | null;
  searchTerm?: string;
}

const BookingManagement: React.FC = () => {
  const { getToken } = useUserStore();
  const accessToken = getToken();
  const [form] = Form.useForm();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sortBy] = useState<string>("customerName");
  const [sortDirection] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<Filters>({});
  const [statistics, setStatistics] = useState<BookingStatistics>({ totalBookings: 0, statusStatistics: [], generatedAt: "" });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const statusChangeUnsubscribeRef = useRef<(() => void) | null>(null);
  const newBookingUnsubscribeRef = useRef<(() => void) | null>(null);
  const updateBookingUnsubscribeRef = useRef<(() => void) | null>(null);

  // Fetch bookings
  const fetchBookings = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const searchParams: BookingSearchRequest = {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
        sortBy,
        sortDirection,
        ...filters,
        scheduleFrom: filters.dateFrom ? filters.dateFrom.toISOString() : undefined,
        scheduleTo: filters.dateTo ? filters.dateTo.toISOString() : undefined,
      };

      const response = await bookingService.searchBookings(searchParams);
      setBookings(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.totalRecords,
      }));
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      message.error("Không thể tải danh sách booking");
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    if (!accessToken) return;

    try {
      const stats = await bookingService.getBookingStatistics();
      setStatistics(stats);
      console.log("Fetched statistics:", stats);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      // Set default values if statistics fetch fails
      setStatistics({
        totalBookings: 0,
        statusStatistics: [],
        generatedAt: new Date().toISOString()
      });
    }
  };

  // Setup SignalR
  const setupSignalR = async () => {
    if (!accessToken) {
      console.warn("⚠️ No access token - cannot setup SignalR");
      return;
    }

    try {
      console.log("🔄 Creating SignalR connection...");
      await createSignalRConnection(accessToken);

      console.log("🔄 Joining admin booking group...");
      await joinAdminBookingGroup();

      console.log("✅ SignalR setup complete");

      // Listen for status changes
      statusChangeUnsubscribeRef.current = onBookingStatusChanged((data) => {
        console.log("📢 Booking status changed:", data);
        message.info(`Booking #${data.bookingId}: ${data.statusName}`);

        // Refetch both bookings and statistics to ensure consistency
        // This prevents bookings from disappearing when status changes
        // and ensures filters are properly applied
        fetchBookings();
        fetchStatistics();
      });

      // Listen for new bookings
      newBookingUnsubscribeRef.current = onNewBookingCreated((data) => {
        console.log("📢 New booking created:", data);
        message.success("Có booking mới!");
        fetchBookings();
        fetchStatistics();
      });

      // Listen for booking updates
      updateBookingUnsubscribeRef.current = onBookingUpdated((data) => {
        console.log("📢 Booking updated:", data);
        // Refetch to ensure consistency with filters
        fetchBookings();
      });
    } catch (error) {
      console.error("⚠️ SignalR setup failed:", error);
      message.warning("Không thể kết nối thời gian thực. Trang sẽ tự động cập nhật.");
    }
  };

  // Cleanup SignalR
  const cleanupSignalR = async () => {
    if (statusChangeUnsubscribeRef.current) {
      statusChangeUnsubscribeRef.current();
    }
    if (newBookingUnsubscribeRef.current) {
      newBookingUnsubscribeRef.current();
    }
    if (updateBookingUnsubscribeRef.current) {
      updateBookingUnsubscribeRef.current();
    }

    try {
      await leaveAdminBookingGroup();
      await disconnectSignalR();
    } catch (error) {
      console.error("Error cleaning up SignalR:", error);
    }
  };

  // Initial setup
  useEffect(() => {
    fetchStatistics();
    fetchBookings();
    setupSignalR();

    return () => {
      cleanupSignalR();
    };
  }, []);

  // Fetch when pagination/sorting changes
  useEffect(() => {
    fetchBookings();
  }, [pagination.current, pagination.pageSize]);

  // Fetch when filters change
  useEffect(() => {
    if (Object.keys(filters).length > 0 || pagination.current > 1) {
      fetchBookings();
    }
  }, [filters]);

  // Handle filter
  const handleFilter = () => {
    const values = form.getFieldsValue();
    const newFilters: Filters = {
      searchTerm: values.searchTerm || undefined,
      statusId: values.statusId || undefined,
      minPrice: values.priceMin || undefined,
      maxPrice: values.priceMax || undefined,
      dateFrom: values.dateRange?.[0] || null,
      dateTo: values.dateRange?.[1] || null,
    };
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, current: 1 }));
    setFilterDrawerOpen(false);
  };

  // Handle status update
  const handleStatusUpdate = async (bookingId: string | number, statusId: number) => {
    try {
      await bookingService.updateBookingStatus(Number(bookingId), statusId);
      message.success("Cập nhật status thành công");
      await fetchBookings();
    } catch (error) {
      console.error("Failed to update booking status:", error);
      message.error("Không thể cập nhật status");
    }
  };

  // Handle delete
  const handleDelete = (bookingId: string | number) => {
    Modal.confirm({
      title: "Xóa Booking",
      content: "Bạn có chắc muốn xóa booking này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await bookingService.deleteBooking(Number(bookingId));
          message.success("Xóa booking thành công");
          await fetchBookings();
          await fetchStatistics();
        } catch (error) {
          console.error("Failed to delete booking:", error);
          message.error("Không thể xóa booking");
        }
      },
    });
  };

  // Status color mapping
  const getStatusColor = (key: number): string => {
    const statusColors: Record<number, string> = {
      1: "orange",
      2: "purple",
      3: "blue",
      4: "green",
      5: "red",
      6: "gold",
    };
    return statusColors[key] || "default";
  };

  // Table columns
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      width: 100,
      sorter: (a: Booking, b: Booking) => a.bookingId - b.bookingId,
    },
    {
      title: "Khách Hàng",
      dataIndex: "customerName",
      key: "customerName",
      width: 150,
    },
    {
      title: "Nhiếp Ảnh Gia",
      dataIndex: "photographerName",
      key: "photographerName",
      width: 150,
    },
    {
      title: "Ngày Chụp",
      dataIndex: "scheduleAt",
      key: "scheduleAt",
      width: 150,
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Địa Điểm",
      dataIndex: "locationAddress",
      key: "locationAddress",
      width: 150,
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (text: number) => `${text.toLocaleString()}đ`,
    },
    {
      title: "Status",
      dataIndex: "statusName",
      key: "statusName",
      width: 120,
      render: (text: string, record: Booking) => (
        <Dropdown
          menu={{
            items: [
              { key: 1, label: "Pending" },
              { key: 2, label: "Confirmed" },
              { key: 3, label: "Paid" },
              { key: 4, label: "Going" },
              { key: 5, label: "Processing" },
              { key: 6, label: "Done" },
              { key: 7, label: "Completed" },
            ],
            onClick: ({ key }) => handleStatusUpdate(record.bookingId, Number(key)),
          }}
          trigger={["click"]}
        >
          <Tag color={getStatusColor(record.statusId)} style={{ cursor: "pointer" }}>
            {text}
          </Tag>
        </Dropdown>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      width: 150,
      render: (_: any, record: Booking) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedBooking(record);
              setDetailModalOpen(true);
            }}
          />
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedBooking(record);
              setEditModalOpen(true);
            }}
          />
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.bookingId)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="mb-2">
        {/* <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isSignalRConnected() ? "bg-green-500" : "bg-red-500"}`}></div>
          <span>{isSignalRConnected() ? "Đã kết nối thời gian thực" : "Chưa kết nối"}</span>
        </div>
        <Divider /> */}
        {statistics.totalBookings !== undefined && (
          <Col xs={24} sm={12} lg={6} key="totalBookings" className="border-1 rounded-2xl p-2 border-gray-300 ">
            <h2 className="font-sf-pro text-xl">
              Tổng số đơn hàng hiện tại:{" "}
              <span className="font-semibold">{statistics.totalBookings}</span>
            </h2>

          </Col>
        )
        }
      </div>

      {/* Statistics */}

      <Row gutter={[16, 16]} className="mb-6">
        {statistics.statusStatistics.map((status) => (
          <Col xs={24} sm={12} lg={6} key={status.statusId}>
            <Card>
              <Statistic
                title={status.statusName}
                value={status.count}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* FloatButton for Filter */}
      <FloatButton
        icon={<FilterOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={() => setFilterDrawerOpen(true)}
        tooltip="Bộ lọc"
      />

      {/* Filter Drawer */}
      <Drawer
        title="Bộ Lọc Booking"
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width={400}
        extra={
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                setFilters({});
                setPagination((prev) => ({ ...prev, current: 1 }));
              }}
            >
              Xóa Lọc
            </Button>
            <Button type="primary" onClick={handleFilter}>
              Áp Dụng
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="searchTerm" label="Tìm Kiếm">
            <Input
              placeholder="Tên khách, nhiếp ảnh gia..."
            />
          </Form.Item>

          <Form.Item name="statusId" label="Trạng Thái">
            <Select
              placeholder="Chọn trạng thái"
              allowClear
              options={[
                { label: "Pending", value: 1 },
                { label: "In Progress", value: 2 },
                { label: "Confirmed", value: 3 },
                { label: "Completed", value: 4 },
                { label: "Cancelled", value: 5 },
                { label: "Payment Pending", value: 6 },
              ]}
            />
          </Form.Item>

          <Form.Item name="dateRange" label="Ngày Chụp">
            <DatePicker.RangePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item name="priceMin" label="Giá Tối Thiểu">
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item name="priceMax" label="Giá Tối Đa">
            <InputNumber
              placeholder="999999999"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/,/g, "")}
            />
          </Form.Item>
        </Form>
      </Drawer>

      {/* Table */}
      <Card className="mt-2!">
        <Table
          columns={columns}
          dataSource={bookings}
          loading={loading}
          rowKey="bookingId"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (page, pageSize) => {
              setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize,
              }));
            },
          }}
          locale={{
            emptyText: <Empty description="Không có booking nào" />,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          booking={selectedBooking}
        />
      )}

      {/* Edit Modal */}
      {selectedBooking && (
        <BookingEditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          booking={selectedBooking}
          onSuccess={() => {
            setEditModalOpen(false);
            fetchBookings();
          }}
        />
      )}
    </div>
  );
};

export default BookingManagement;
