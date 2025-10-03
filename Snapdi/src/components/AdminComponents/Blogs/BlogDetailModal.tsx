import React from 'react';
import { Modal, Descriptions, Tag, Image, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Blog } from '../../../lib/types';
import { formatDate } from '../../../utils/formatDate';

interface BlogDetailModalProps {
  blog: Blog | null;
  visible: boolean;
  onClose: () => void;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  visible,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!blog) return null;

  return (
    <Modal
      title="Blog Details"
      open={visible}
      onCancel={onClose}
      width={800}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => onEdit(blog)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(blog)}
          >
            Delete
          </Button>
        </Space>
      }
    >
      <div className="space-y-4">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Title">
            <span className="font-semibold">{blog.title}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Author">
            {blog.authorName}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={blog.isActive ? 'green' : 'red'}>
              {blog.isActive ? 'Active' : 'Inactive'}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {formatDate(blog.createAt)}
          </Descriptions.Item>

          {blog.updatedAt && (
            <Descriptions.Item label="Updated At">
              {formatDate(blog.updatedAt)}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Thumbnail">
            {blog.thumbnailUrl && (
              <Image
                src={blog.thumbnailUrl}
                alt="Blog thumbnail"
                width={200}
                height={120}
                className="object-cover rounded-lg"
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
              />
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Keywords">
            <Space wrap>
              {blog.keywords?.map((keyword) => (
                <Tag key={keyword.keywordId} color="blue">
                  {keyword.keyword}
                </Tag>
              ))}
            </Space>
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Content Preview</h3>
          <div
            className="prose max-w-none border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default BlogDetailModal;