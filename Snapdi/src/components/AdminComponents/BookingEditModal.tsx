import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, DatePicker, message, Button } from "antd";
import dayjs from "dayjs";
import { bookingService } from "../../services/bookingService";
import type { Booking, UpdateBookingRequest } from "../../services/bookingService";

interface BookingEditModalProps {
  open: boolean;
  onClose: () => void;
  booking: Booking;
  onSuccess: () => void;
}

const BookingEditModal: React.FC<BookingEditModalProps> = ({
  open,
  onClose,
  booking,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const updateData: UpdateBookingRequest = {
        scheduleAt: values.scheduleAt.toISOString(),
        locationAddress: values.locationAddress,
        price: values.price,
        note: values.note || "",
      };

      await bookingService.updateBooking(booking.bookingId, updateData);
      message.success("Cập nhật booking thành công");
      onSuccess();
    } catch (error) {
      console.error("Failed to update booking:", error);
      message.error("Không thể cập nhật booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Chỉnh Sửa Booking #${booking.bookingId}`}
      open={open}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          scheduleAt: dayjs(booking.scheduleAt),
          locationAddress: booking.locationAddress,
          price: booking.price,
          note: booking.note,
        }}
      >
        <Form.Item
          label="Ngày Chụp"
          name="scheduleAt"
          rules={[{ required: true, message: "Vui lòng chọn ngày chụp" }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Địa Điểm"
          name="locationAddress"
          rules={[
            { required: true, message: "Vui lòng nhập địa điểm" },
            { min: 5, message: "Địa điểm phải tối thiểu 5 ký tự" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập địa điểm chụp" />
        </Form.Item>

        <Form.Item
          label="Giá (đ)"
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá" },
            { type: "number", min: 0, message: "Giá phải lớn hơn 0" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            placeholder="0"
          />
        </Form.Item>

        <Form.Item label="Ghi Chú" name="note">
          <Input.TextArea rows={3} placeholder="Ghi chú thêm (tùy chọn)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingEditModal;
