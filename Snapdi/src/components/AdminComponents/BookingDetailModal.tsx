import React from "react";
import { Modal, Card, Descriptions, Divider, Button, Space, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Booking } from "../../services/bookingService";
import { formatPrice } from "../../utils/formatPrice";

interface BookingDetailModalProps {
  open: boolean;
  onClose: () => void;
  booking: Booking;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  open,
  onClose,
  booking,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Đã sao chép");
  };

  return (
    <Modal
      title={`Chi Tiết Booking #${booking.bookingId}`}
      open={open}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <div className="space-y-4">
        {/* Customer Info */}
        <Card title="Thông Tin Khách Hàng" size="small">
          <Descriptions column={2} size="small">
            <Descriptions.Item label="Tên Khách" span={1}>
              <Space>
                <span>{booking.customerName}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.customerName)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={1}>
              <Space>
                <span>{booking.customerEmail}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.customerEmail)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Điện Thoại" span={1}>
              <Space>
                <span>{booking.customerPhone}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.customerPhone)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider />

        {/* Photographer Info */}
        <Card title="Thông Tin Nhiếp Ảnh Gia" size="small">
          <Descriptions column={2} size="small">
            <Descriptions.Item label="Tên Nhiếp Ảnh Gia" span={1}>
              <Space>
                <span>{booking.photographerName}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.photographerName)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={1}>
              <Space>
                <span>{booking.photographerEmail}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.photographerEmail)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Điện Thoại" span={1}>
              <Space>
                <span>{booking.photographerPhone}</span>
                <CopyOutlined
                  onClick={() => copyToClipboard(booking.photographerPhone)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                />
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider />

        {/* Booking Details */}
        <Card title="Chi Tiết Booking" size="small">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Ngày Chụp">
              {dayjs(booking.scheduleAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Địa Điểm">
              {booking.locationAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Giá">
              {formatPrice(booking.price)}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                {booking.statusName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Ghi Chú">
              {booking.note || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Modal>
  );
};

export default BookingDetailModal;
