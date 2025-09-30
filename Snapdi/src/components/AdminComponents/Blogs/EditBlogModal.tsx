import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Button, Space, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { Blog, Keyword } from '../../../lib/types';
import { updateBlog } from '../../../services/blogService';
import { getAllKeywords } from '../../../services/keywordService';
import { useLoadingStore } from '../../../config/zustand';

const { Option } = Select;

interface EditBlogModalProps {
  blog: Blog | null;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  blog,
  visible,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [thumbnailMethod, setThumbnailMethod] = useState<'url' | 'upload'>('url');
  const { loading } = useLoadingStore();

  // Fetch keywords when modal opens
  useEffect(() => {
    if (visible) {
      fetchKeywords();
    }
  }, [visible]);

  // Populate form when blog changes
  useEffect(() => {
    if (blog && visible) {
      form.setFieldsValue({
        title: blog.title,
        thumbnailUrl: blog.thumbnailUrl,
        keywordIds: blog.keywords?.map(k => k.keywordId),
        isActive: blog.isActive,
      });
      setContent(blog.content);
      setThumbnailMethod('url'); // Default to URL method
    }
  }, [blog, visible, form]);

  const fetchKeywords = async () => {
    try {
      const response = await getAllKeywords();
      if (response.data) {
        setKeywords(response.data);
      }
    } catch (error) {
      console.error('Error fetching keywords:', error);
      message.error('Failed to load keywords');
    }
  };

  const handleSubmit = async (values: any) => {
    if (!blog) return;

    try {
      const blogData = {
        title: values.title,
        content: content,
        thumbnailUrl: values.thumbnailUrl,
        keywordIds: values.keywordIds || [],
        isActive: values.isActive,
      };

      console.log('Updating blog:', blogData);

      await updateBlog(blog.blogId, blogData);

      message.success('Blog updated successfully!');
      form.resetFields();
      setContent('');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating blog:', error);
      message.error('Failed to update blog. Please try again.');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setContent('');
    onClose();
  };

  if (!blog) return null;

  return (
    <Modal
      title={`Edit Blog: ${blog.title}`}
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter blog title' }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item label="Thumbnail Method">
          <Radio.Group
            value={thumbnailMethod}
            onChange={(e) => setThumbnailMethod(e.target.value)}
          >
            <Radio value="url">URL</Radio>
            <Radio value="upload">Upload File</Radio>
          </Radio.Group>
        </Form.Item>

        {thumbnailMethod === 'url' ? (
          <Form.Item
            label="Thumbnail URL"
            name="thumbnailUrl"
            rules={[
              { required: true, message: 'Please enter thumbnail URL' },
              { type: 'url', message: 'Please enter a valid URL' }
            ]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
        ) : (
          <Form.Item
            label="Upload Thumbnail"
            name="thumbnailFile"
            rules={[{ required: true, message: 'Please upload a thumbnail' }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        )}

        <Form.Item label="Content" required>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: '300px', marginBottom: '50px' }}
            placeholder="Write your blog content here..."
          />
        </Form.Item>

        <Form.Item
          label="Keywords"
          name="keywordIds"
          rules={[{ required: true, message: 'Please select at least one keyword' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select keywords"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                ?.toLowerCase()
                ?.includes(input.toLowerCase())
            }
          >
            {keywords.map((keyword) => (
              <Option key={keyword.keywordId} value={keyword.keywordId}>
                {keyword.keyword}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="isActive"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Update Blog
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlogModal;