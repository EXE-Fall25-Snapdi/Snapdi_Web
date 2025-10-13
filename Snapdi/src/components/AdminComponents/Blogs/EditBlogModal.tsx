import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Button, Space, Radio, Upload, message, Tag } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { Blog, Keyword } from '../../../lib/types';
import { updateBlog } from '../../../services/blogService';
import { getAllKeywords } from '../../../services/keywordService';
import { useLoadingStore } from '../../../config/zustand';

const { Option } = Select;

interface EditBlogFormValues {
  title: string;
  thumbnailUrl?: string;
  status?: 'published' | 'draft';
  keywordIds?: number[];
  isActive: boolean;
}

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
  const [keywordMethod, setKeywordMethod] = useState<'names' | 'ids'>('ids');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const { loading } = useLoadingStore();

  // Fetch keywords when modal opens
  useEffect(() => {
    if (visible) {
      console.log('Modal opened, fetching keywords...');
      fetchKeywords();
    }
  }, [visible]);

  // Populate form when blog changes AND keywords are loaded
  useEffect(() => {
    if (blog && visible && keywords.length > 0) {
      console.log('Populating form with blog:', blog);
      console.log('Available keywords:', keywords);
      console.log('Blog keywords:', blog.keywords);

      const selectedKeywordIds = blog.keywords?.map(k => k.keywordId) || [];
      console.log('Selected keyword IDs:', selectedKeywordIds);

      form.setFieldsValue({
        title: blog.title,
        thumbnailUrl: blog.thumbnailUrl,
        keywordIds: selectedKeywordIds,
        isActive: blog.isActive,
      });
      setContent(blog.content);
      setThumbnailMethod('url'); // Default to URL method
      setKeywordMethod('ids'); // Default to existing keywords

      // Set tags from existing keywords for display
      if (blog.keywords && blog.keywords.length > 0) {
        setTags(blog.keywords.map(k => k.keyword));
      } else {
        setTags([]);
      }
    }
  }, [blog, visible, form, keywords]);

  // Separate useEffect for cases when blog is available but keywords not loaded yet
  useEffect(() => {
    if (blog && visible && keywords.length === 0) {
      console.log('Blog available but keywords not loaded yet, showing blog info...');
      // Still populate basic fields even without keywords
      form.setFieldsValue({
        title: blog.title,
        thumbnailUrl: blog.thumbnailUrl,
        isActive: blog.isActive,
      });
      setContent(blog.content);
      setThumbnailMethod('url');
      setKeywordMethod('ids');

      // Set tags from blog keywords for display
      if (blog.keywords && blog.keywords.length > 0) {
        setTags(blog.keywords.map(k => k.keyword));
      } else {
        setTags([]);
      }
    }
  }, [blog, visible, form, keywords.length]);

  const fetchKeywords = async () => {
    try {
      console.log('Fetching all keywords...');
      const response = await getAllKeywords();
      console.log('Raw response:', response);

      // Handle different response structures
      let keywordsData: Keyword[] = [];

      // Case 1: ResponseModel<Keyword[]> - response.data contains keywords array
      if (response.data && Array.isArray(response.data)) {
        keywordsData = response.data;
        console.log('Using response.data structure');
      }
      // Case 2: Direct Keyword[] - response is directly the keywords array  
      else if (Array.isArray(response)) {
        keywordsData = response;
        console.log('Using direct array structure');
      }
      // Case 3: Other wrapper structure
      else if (response && typeof response === 'object') {
        console.log('Response keys:', Object.keys(response));
        console.log('Checking for keywords in response object...');
        keywordsData = response.data || response || [];
      }

      console.log('Final keywords data:', keywordsData);
      console.log('Keywords count:', keywordsData.length);

      if (keywordsData.length > 0) {
        setKeywords(keywordsData);
        console.log('Keywords set successfully');
      } else {
        console.log('No keywords found in response');
        setKeywords([]);
      }
    } catch (error) {
      console.error('Error fetching keywords:', error);
      message.error('Failed to load keywords');
      setKeywords([]);
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (values: EditBlogFormValues) => {
    if (!blog) return;

    try {
      const blogData = {
        title: values.title,
        content: content,
        thumbnailUrl: values.thumbnailUrl,
        keywordNames: keywordMethod === 'names' ? tags : [],
        keywordIds: keywordMethod === 'ids' ? (values.keywordIds || []) : [],
        isActive: values.isActive,
      };

      console.log('Updating blog:', blogData);
      console.log('Keyword method:', keywordMethod);
      console.log('Tags (for names):', tags);
      console.log('Selected keyword IDs:', values.keywordIds);

      await updateBlog(blog.blogId, blogData);

      message.success('Blog updated successfully!');
      form.resetFields();
      setContent('');
      setTags([]);
      setInputTag('');
      setKeywordMethod('ids');
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
    setTags([]);
    setInputTag('');
    setKeywordMethod('ids');
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

        {/* Keywords / Tags */}
        <Form.Item label="Keywords / Tags">
          <div className="space-y-4">
            {/* Keyword Method Selection */}
            <Radio.Group
              value={keywordMethod}
              onChange={(e) => setKeywordMethod(e.target.value)}
            >
              <Radio.Button value="ids">
                Select Existing Keywords
              </Radio.Button>
              <Radio.Button value="names">
                <PlusOutlined /> Add New Keywords
              </Radio.Button>
            </Radio.Group>

            {/* Existing Keywords Method */}
            {keywordMethod === 'ids' && (
              <Form.Item
                name="keywordIds"
                rules={[{ required: keywordMethod === 'ids', message: 'Please select at least one keyword' }]}
              >
                <Select
                  mode="multiple"
                  placeholder={keywords.length === 0 ? "Loading keywords..." : "Select existing keywords"}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      ?.toLowerCase()
                      ?.includes(input.toLowerCase())
                  }
                  loading={keywords.length === 0}
                  notFoundContent={keywords.length === 0 ? "Loading..." : "No keywords found"}
                  size="large"
                >
                  {keywords.map((keyword) => (
                    <Option key={keyword.keywordId} value={keyword.keywordId}>
                      {keyword.keyword}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {/* New Keywords Method */}
            {keywordMethod === 'names' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keywords/tags..."
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onPressEnter={handleAddTag}
                    style={{ flex: 1 }}
                  />
                  <Button type="dashed" onClick={handleAddTag} icon={<PlusOutlined />}>
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Tag
                      key={index}
                      closable
                      onClose={() => handleRemoveTag(tag)}
                      color="blue"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
                {tags.length === 0 && keywordMethod === 'names' && (
                  <div className="text-gray-500 text-sm">
                    Add at least one keyword/tag for your blog
                  </div>
                )}
              </div>
            )}
          </div>
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