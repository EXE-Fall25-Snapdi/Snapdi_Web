import React, { useState, useCallback } from 'react';
import { Tabs, Card, Pagination, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import BlogPostsTable from '../../../components/AdminComponents/BlogsPostTable';
import CreateBlog from '../../../components/AdminComponents/Blogs/CreateBlog';
import BlogDetailModal from '../../../components/AdminComponents/Blogs/BlogDetailModal';
import EditBlogModal from '../../../components/AdminComponents/Blogs/EditBlogModal';
import type { Blog } from '../../../lib/types';
import { getBlogWithPaging, deleteBlog } from '../../../services/blogService';
import { toast } from 'react-toastify';

const BlogsManagement = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = React.useState<Blog[]>([]);
  const [pages, setPages] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPosts, setTotalPosts] = React.useState(0);

  // Modal states
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  // Function to fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      const paginatedData = await getBlogWithPaging(pages, pageSize) as any;
      console.log("Fetched blog posts - Full Response:", paginatedData);
      console.log("Type of response:", typeof paginatedData);
      console.log("Response keys:", Object.keys(paginatedData || {}));

      // paginatedData đã là object pagination trực tiếp
      setPosts(paginatedData?.data || []); // Extract the blog posts array
      setTotalPosts(paginatedData?.totalRecords || 0);

      console.log("Pagination info:", {
        totalRecords: paginatedData?.totalRecords,
        pageNumber: paginatedData?.pageNumber,
        pageSize: paginatedData?.pageSize,
        totalPages: paginatedData?.totalPages,
        hasNextPage: paginatedData?.hasNextPage,
        hasPreviousPage: paginatedData?.hasPreviousPage
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setPosts([]);
      setTotalPosts(0);
    }
  }, [pages, pageSize]);

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handle blog creation success
  const handleBlogCreated = () => {
    // Refresh posts list
    fetchPosts();
    // Switch to posts tab to see the new blog
    setActiveTab('posts');
  };

  // Modal handlers
  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setDetailModalVisible(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditModalVisible(true);
  };

  const handleDeleteBlog = (blog: Blog) => {
    console.log('handleDeleteBlog called with blog:', blog);
    setBlogToDelete(blog);
    setDeleteConfirmVisible(true);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;

    try {
      console.log('User confirmed delete. Deleting blog with ID:', blogToDelete.blogId);
      const result = await deleteBlog(blogToDelete.blogId);
      console.log('Delete API result:', result);
      console.log('Delete API result data:', result?.data);
      console.log('Delete API result message:', result?.message);
      console.log('Delete API result success:', result?.success);

      // For HTTP 204 No Content, result might be null/undefined or have undefined properties
      // If no error was thrown, consider it successful
      toast.success('Blog deleted successfully');
      console.log('Delete successful, refreshing posts...');
      fetchPosts(); // Refresh the list

    } catch (error) {
      console.error('Error deleting blog - full error:', error);

      // Check if error has response data
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as any;
        console.error('API Error response:', apiError.response?.data);
        console.error('API Error status:', apiError.response?.status);
        toast.error(`Failed to delete blog: ${apiError.response?.data?.message || apiError.message || 'Server error'}`);
      } else {
        toast.error('Failed to delete blog: Network error or server unavailable');
      }
    } finally {
      setDeleteConfirmVisible(false);
      setBlogToDelete(null);
    }
  };

  const cancelDeleteBlog = () => {
    console.log('User cancelled delete operation');
    setDeleteConfirmVisible(false);
    setBlogToDelete(null);
  };

  const handleModalClose = () => {
    setSelectedBlog(null);
    setDetailModalVisible(false);
    setEditModalVisible(false);
  };

  const handleBlogUpdated = () => {
    fetchPosts(); // Refresh the list after update
    handleModalClose();
  };

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
          <BlogPostsTable
            posts={posts}
            onView={handleViewBlog}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
          />
          <div className='flex justify-end mt-4'>
            <Pagination
              showSizeChanger
              pageSizeOptions={['5', '10', '20']}
              current={pages}
              pageSize={pageSize}
              total={totalPosts}
              onChange={(page, size) => {
                console.log('Pagination changed:', { page, size });
                setPages(page);
                if (size && size !== pageSize) {
                  setPageSize(size);
                  setPages(1); // Reset to first page when page size changes
                }
              }}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </div>
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
          <CreateBlog onCreated={handleBlogCreated} />
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

      {/* Modal Components */}
      {selectedBlog && (
        <BlogDetailModal
          visible={detailModalVisible}
          blog={selectedBlog}
          onClose={handleModalClose}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
        />
      )}

      {selectedBlog && (
        <EditBlogModal
          visible={editModalVisible}
          blog={selectedBlog}
          onClose={handleModalClose}
          onSuccess={handleBlogUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Blog"
        open={deleteConfirmVisible}
        onOk={confirmDeleteBlog}
        onCancel={cancelDeleteBlog}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <div className="flex items-start gap-3">
          <ExclamationCircleOutlined className="text-yellow-500 text-xl mt-1" />
          <div>
            <p className="text-gray-800 mb-2">
              Are you sure you want to delete this blog?
            </p>
            {blogToDelete && (
              <p className="text-gray-600 text-sm">
                <strong>Title:</strong> "{blogToDelete.title}"
              </p>
            )}
            <p className="text-red-600 text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogsManagement;