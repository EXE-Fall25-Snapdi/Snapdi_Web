"use client";

import type { Blog } from "../../lib/types";
import { Table, Tag, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

type BlogPostsTableProps = {
  posts: Blog[];
  onView?: (blog: Blog) => void;
  onEdit?: (blog: Blog) => void;
  onDelete?: (blog: Blog) => void;
};

export default function BlogPostsTable({ posts, onView, onEdit, onDelete }: BlogPostsTableProps) {

  const postColumns = [
    {
      title: 'ID',
      dataIndex: 'blogId',
      key: 'blogId',
      width: 80,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnail',
      render: (url: string) => (
        <img src={url} loading="lazy" alt="Thumbnail" className="w-16 h-16 object-cover" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Blog) => (
        <a href={`/blog/${record.blogId}`} className="font-medium text-blue-600 hover:underline cursor-pointer">
          {text}
        </a>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
      key: 'authorName',
    },
    {
      title: 'Date',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => {
        const status = isActive ? 'Published' : 'Draft';
        const color = isActive ? 'green' : 'orange';

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Blog) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => onView?.(record)}
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit?.(record)}
            title="Edit Blog"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => onDelete?.(record)}
            title="Delete Blog"
          />
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={postColumns}
      dataSource={posts || []} // Ensure dataSource is always an array
      rowKey="blogId"
      pagination={false}
    />
  );
}
