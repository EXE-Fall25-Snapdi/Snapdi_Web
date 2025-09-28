
import React, { useState, useMemo } from 'react';
import { Form, Input, Button, Select, Upload, message, Tag, Divider } from 'antd';
import { UploadOutlined, PlusOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const { Option } = Select;

interface BlogFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  thumbnailUrl?: string;
}

interface CreateBlogProps {
  onCreated?: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [loading, setLoading] = useState(false);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

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

  // Handle form submission
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const blogData: BlogFormData = {
        ...values,
        content,
        tags,
      };

      console.log('Blog Data:', blogData);
      message.success('Blog created successfully!');

      // Reset form
      form.resetFields();
      setContent('');
      setTags([]);

      // Call onCreated callback if provided
      if (onCreated) {
        onCreated();
      }
    } catch (error) {
      message.error('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = {
    name: 'file',
    action: '/api/upload', // Replace with your upload endpoint
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // // Preview function
  // const handlePreview = () => {
  //   const values = form.getFieldsValue();
  //   const previewData = {
  //     ...values,
  //     content,
  //     tags,
  //   };
  //   console.log('Preview Data:', previewData);
  //   message.info('Opening preview... (Feature to be implemented)');
  // };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        status: 'draft',
        category: '',
      }}
    >
      {/* Title */}
      <Form.Item
        label="Blog Title"
        name="title"
        rules={[
          { required: true, message: 'Please enter blog title!' },
          { min: 10, message: 'Title must be at least 10 characters!' }
        ]}
      >
        <Input
          placeholder="Enter an engaging title for your blog post"
          size="large"
          showCount
          maxLength={100}
        />
      </Form.Item>


      {/* Category and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category" size="large">
            <Option value="photography">Photography</Option>
            <Option value="tutorial">Tutorial</Option>
            <Option value="review">Review</Option>
            <Option value="news">News</Option>
            <Option value="tips">Tips & Tricks</Option>
            <Option value="gear">Gear Review</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select size="large">
            <Option value="draft">Draft</Option>
            <Option value="published">Published</Option>
            <Option value="scheduled">Scheduled</Option>
          </Select>
        </Form.Item>
      </div>

      {/* Tags */}
      <Form.Item label="Tags">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add tags..."
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
        </div>
      </Form.Item>

      {/* Thumbnail Image */}
      <Form.Item label="Thumbnail Image">
        <Upload {...handleImageUpload} listType="picture-card" maxCount={1}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Divider />

      {/* Content Editor */}
      <Form.Item
        label="Content"
        rules={[{ required: true, message: 'Please write your blog content!' }]}
      >
        <div className="border border-gray-300 rounded-lg">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Start writing your amazing blog post..."
            style={{
              height: '75vh',
              marginBottom: '42px' // Space for toolbar
            }}
          />
        </div>
      </Form.Item>

      {/* Action Buttons */}
      <Form.Item>
        <div className="flex justify-end gap-4 pt-4">
          <Button size="large" onClick={() => form.resetFields()}>
            Reset
          </Button>
          <Button
            type="default"
            size="large"
            icon={<SaveOutlined />}
            onClick={() => {
              form.setFieldsValue({ status: 'draft' });
              form.submit();
            }}
            loading={loading}
          >
            Save as Draft
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            onClick={() => {
              form.setFieldsValue({ status: 'published' });
              form.submit();
            }}
            loading={loading}
          >
            Publish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;