
import React, { useState, useMemo } from 'react';
import { Form, Input, Button, Select, Upload, message, Tag, Divider, Radio } from 'antd';
import { UploadOutlined, PlusOutlined, SaveOutlined, SendOutlined, LinkOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createBlog } from '../../../services/blogService';
import { getAllKeywords } from '../../../services/keywordService';
import type { Keyword } from '../../../lib/types';
import { useLoadingStore } from '../../../config/zustand';
import { toast } from 'react-toastify';


interface CreateBlogProps {
  onCreated?: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onCreated }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [thumbnailMethod, setThumbnailMethod] = useState<'upload' | 'url'>('upload');
  const [keywordMethod, setKeywordMethod] = useState<'names' | 'ids'>('names');
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const { loading } = useLoadingStore();

  React.useEffect(() => {
    // Fetch existing keywords from API
    const fetchKeywords = async () => {
      try {
        const response = await getAllKeywords();
        console.log('Fetched keywords:', response);
        if (response && Array.isArray(response)) {
          setKeywords(response);
          console.log('Keywords set:', response);
        } else {
          console.error('Failed to fetch keywords or invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };
    fetchKeywords();
  }, []);
  // Quill editor modules and formats
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
    console.log('Form submitted with values:', values);
    console.log('Content:', content);
    console.log('Tags:', tags);
    console.log('Keyword method:', keywordMethod);
    console.log('Selected keyword IDs:', selectedKeywordIds);

    // Validate content
    if (!content || content.trim() === '' || content === '<p><br></p>') {
      message.error('Please write your blog content!');
      return;
    }

    try {
      const blogData = {
        title: values.title,
        thumbnailUrl: thumbnailMethod === 'url' ? values.thumbnailUrl : '', // TODO: Handle uploaded file URL
        content: content,
        authorId: 2, // TODO: Get actual authorId from user context/auth
        keywordNames: keywordMethod === 'names' ? tags : [],
        keywordIds: keywordMethod === 'ids' ? selectedKeywordIds : [],
      };

      console.log('Sending blog data to API:', blogData);
      const response = await createBlog(blogData);
      console.log('API Response:', response);

      // Check if blog was created successfully
      if (response && response.data && (response.data as any).blogId) {
        toast.success('Blog created successfully!');
        form.resetFields();
        setContent('');
        setTags([]);
        setThumbnailMethod('upload');
        setKeywordMethod('names');
        setSelectedKeywordIds([]);

        console.log('Form reset complete, calling onCreated callback...');
        // Call onCreated callback if provided
        if (onCreated) {
          onCreated();
        }
      }
    } catch (error) {
      toast.error('Failed to create blog: ' + (error || 'Unknown error'));
      // Axios interceptor will handle error toast automatically
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
        isActive: false,
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

      {/* Keywords / Tags */}
      <Form.Item label="Keywords / Tags">
        <div className="space-y-4">
          {/* Keyword Method Selection */}
          <Radio.Group
            value={keywordMethod}
            onChange={(e) => setKeywordMethod(e.target.value)}
          >
            <Radio.Button value="names">
              <PlusOutlined /> Add New Keywords
            </Radio.Button>
            <Radio.Button value="ids">
              Select Existing Keywords
            </Radio.Button>
          </Radio.Group>

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
            </div>
          )}

          {/* Existing Keywords Method */}
          {keywordMethod === 'ids' && (
            <Select
              mode="multiple"
              placeholder="Select existing keywords"
              value={selectedKeywordIds}
              onChange={setSelectedKeywordIds}
              style={{ width: '100%' }}
              size="large"
            >
              {keywords.map((keyword) => (
                <Select.Option key={keyword.keywordId} value={keyword.keywordId}>
                  {keyword.keyword}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
      </Form.Item>

      {/* Thumbnail Image */}
      <Form.Item label="Thumbnail Image">
        <div className="space-y-4">
          {/* Method Selection */}
          <Radio.Group
            value={thumbnailMethod}
            onChange={(e) => setThumbnailMethod(e.target.value)}
          >
            <Radio.Button value="upload">
              <UploadOutlined /> Upload Image
            </Radio.Button>
            <Radio.Button value="url">
              <LinkOutlined /> Image URL
            </Radio.Button>
          </Radio.Group>

          {/* Upload Method */}
          {thumbnailMethod === 'upload' && (
            <Upload {...handleImageUpload} listType="picture-card" maxCount={1}>
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          )}

          {/* URL Method */}
          {thumbnailMethod === 'url' && (
            <Form.Item
              name="thumbnailUrl"
              rules={[
                {
                  type: 'url',
                  message: 'Please enter a valid URL!'
                },
                {
                  pattern: /\.(jpg|jpeg|png|gif|webp)$/i,
                  message: 'URL must point to an image file (jpg, jpeg, png, gif, webp)'
                }
              ]}
            >
              <Input
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                prefix={<LinkOutlined />}
                size="large"
              />
            </Form.Item>
          )}
        </div>
      </Form.Item>

      <Divider />

      {/* Content Editor */}
      <Form.Item
        label="Content"
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
          <Button size="large" onClick={() => {
            form.resetFields();
            setContent('');
            setTags([]);
            setThumbnailMethod('upload');
            setKeywordMethod('names');
            setSelectedKeywordIds([]);
          }}>
            Reset
          </Button>
          <Button
            type="default"
            size="large"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={() => {
              form.setFieldsValue({ status: 'draft' });
              form.submit();
            }}
          >
            Save as Draft
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            loading={loading}
            onClick={() => {
              form.setFieldsValue({ status: 'published' });
              form.submit();
            }}
          >
            Publish
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;