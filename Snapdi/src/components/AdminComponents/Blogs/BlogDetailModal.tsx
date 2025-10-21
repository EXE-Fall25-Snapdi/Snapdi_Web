import React from 'react';
import { Modal, Descriptions, Tag, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Blog } from '../../../lib/types';
import { formatDate } from '../../../utils/formatDate';
import CloudinaryImage from '../../CloudinaryImage';

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
            {blog.thumbnailUrl ? (
              <CloudinaryImage
                publicId={blog.thumbnailUrl}
                alt="Blog thumbnail"
                className="w-64 h-auto object-cover rounded-lg"
                transformation="c_fill,q_auto,f_auto,w_600,h_400"
              />
            ) : (
              <span className="text-gray-400">No thumbnail</span>
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