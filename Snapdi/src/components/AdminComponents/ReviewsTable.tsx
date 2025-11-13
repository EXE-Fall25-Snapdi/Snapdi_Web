import React from 'react';
import { Table, Rate } from 'antd';
import type { Review } from '../../lib/types';
import CloudinaryAvatar from '../CloudinaryAvatar';

export interface ReviewsTableProps {
  reviews: Review[];
}

const ReviewsTable: React.FC<ReviewsTableProps> = ({ reviews }) => {
  const columns = [
    {
      title: 'Reviewer',
      key: 'reviewer',
      render: (record: Review) => (
        <div className="flex items-center space-x-3">
          <CloudinaryAvatar
            publicId={record.fromUserAvatar}
            fallbackText={record.fromUserName.charAt(0).toUpperCase()}
            size={50}
          />
          <div>
            <div className="font-medium text-sm">{record.fromUserName}</div>
            <div className="text-xs text-gray-500">ID: {record.fromUserId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Rate disabled value={rating} style={{ color: '#faad14' }} />
      ),
      width: 250,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment: string) => (
        <span className="text-sm text-gray-700 line-clamp-4">
          {comment || <span className="text-gray-400 italic">No comment</span>}
        </span>
      ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      render: (bookingId: number) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          #{bookingId}
        </span>
      ),
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date: string) => {
        const reviewDate = new Date(date);
        return (
          <span className="text-sm text-gray-600">
            {reviewDate.toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        );
      },
      width: 180,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={reviews || []}
        rowKey="reviewId"
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default ReviewsTable;
