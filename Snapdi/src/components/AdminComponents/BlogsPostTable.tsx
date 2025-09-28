"use client";

import type { Post } from "../../lib/types";
import { Table, Tag, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

type BlogPostsTableProps = {
  posts: Post[];
};

export default function BlogPostsTable({ posts }: BlogPostsTableProps) {

  const postColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnailUrl',
      key: 'thumbnail',
      render: (url: string) => (
        <img src={url} alt="Thumbnail" className="w-16 h-16 object-cover" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Post) => (
        <a href={`/posts/${record.id}/${text}`} className="font-medium text-blue-600 hover:underline cursor-pointer">
          {text}
        </a>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'Published') color = 'green';
        if (status === 'Draft') color = 'orange';
        if (status === 'Scheduled') color = 'blue';

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      render: (count: number) => (
        <span className="text-gray-600">{count} comments</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={postColumns}
      dataSource={posts}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} posts`,
      }}
    />
  );
}
