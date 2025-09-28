import { useState } from 'react';
import { Tabs, Card } from 'antd';
import type { TabsProps } from 'antd';
import { posts } from '../../../lib/mock-data';
import BlogPostsTable from '../../../components/AdminComponents/BlogsPostTable';
import CreateBlog from '../../../components/AdminComponents/Blogs/CreateBlog';

const BlogsManagement = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const tabItems: TabsProps['items'] = [
    {
      key: 'posts',
      label: 'Blog Posts',
      children: (
        <Card
          title={
            <div className="flex items-center justify-between">
              <div className='flex items-start flex-col'>
                <h2 className="text-xl font-semibold">Blog Posts</h2>
                <p className="text-gray-500 text-sm">Manage your articles and schedule new ones.</p>
              </div>
            </div>
          }
        >
          <BlogPostsTable posts={posts} />
        </Card>
      ),
    },
    {
      key: 'new-post',
      label: 'Create Post',
      children: (
        <Card
          title={
            <div className='flex items-start flex-col'>
              <h2 className="text-xl font-semibold">Create New Post</h2>
              <p className="text-gray-500 text-sm">Write and publish a new blog post.</p>
            </div>
          }
        >
          <CreateBlog onCreated={() => setActiveTab('posts')} />
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        items={tabItems}
      />
    </div>
  );
};

export default BlogsManagement;