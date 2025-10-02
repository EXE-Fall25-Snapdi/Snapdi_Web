import React from "react";
import { Pagination } from "antd";
import BlogFeaturedCard from "../../../components/BlogFeaturedCard/BlogFeaturedCard";
import BlogItemCard from "../../../components/BlogItemCard/BlogItemCard";
import Images from "../../../components/images";
import { getActiveBlogWithPaging } from "../../../services/blogService";
import type { Blog } from "../../../lib/types";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = React.useState<Blog[]>([]);
  const [pages, setPages] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [featuredBlogs, setFeaturedBlogs] = React.useState<Blog[]>([]);
  const [featuredLoading, setFeaturedLoading] = React.useState(true);

  console.log('BlogPage render - States:', {
    postsLength: posts.length,
    featuredBlogsLength: featuredBlogs.length,
    loading,
    featuredLoading,
    pages,
    totalPosts
  });

  // Fetch featured blogs (2 latest blogs) - only once
  const fetchFeaturedBlogs = React.useCallback(async () => {
    try {
      setFeaturedLoading(true);
      console.log('Fetching featured blogs (2 latest)');

      // Fetch first page with pageSize 2 to get 2 latest blogs
      const response = await getActiveBlogWithPaging(1, 2);

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data && response.data.data) {
        paginatedData = response.data;
        console.log("Featured blogs - Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Featured blogs - Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        setFeaturedBlogs(paginatedData.data);
        console.log('Featured blogs loaded:', paginatedData.data);
      } else {
        console.error("Failed to fetch featured blogs:", response);
        setFeaturedBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
      setFeaturedBlogs([]);
    } finally {
      setFeaturedLoading(false);
    }
  }, []);

  // Fetch featured blogs only once on component mount
  React.useEffect(() => {
    fetchFeaturedBlogs();
  }, [fetchFeaturedBlogs]);

  // Fetch blogs function (excluding the 2 featured blogs)
  const fetchBlogs = React.useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching blogs - Page:', pages, 'PageSize:', pageSize);

      // Calculate skip count: skip 2 featured blogs + previous pages
      const skipCount = 2 + ((pages - 1) * pageSize);

      // We need to fetch more items and then slice to skip featured blogs
      const response = await getActiveBlogWithPaging(1, skipCount + pageSize);

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data && response.data.data) {
        paginatedData = response.data;
        console.log("Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        // Skip the first 2 featured blogs + previous page items
        const allBlogs = paginatedData.data;
        const startIndex = skipCount;
        const endIndex = startIndex + pageSize;
        const currentPageBlogs = allBlogs.slice(startIndex, endIndex);

        setPosts(currentPageBlogs);
        // Adjust total count to exclude featured blogs
        const adjustedTotal = Math.max(0, (paginatedData.totalRecords || 0) - 2);
        setTotalPosts(adjustedTotal);

        console.log('Blogs pagination:', {
          totalBlogs: paginatedData.totalRecords,
          adjustedTotal,
          skipCount,
          currentPageBlogs: currentPageBlogs.length,
          startIndex,
          endIndex
        });
      } else {
        console.error("Failed to fetch blogs:", response);
        setPosts([]);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setPosts([]);
      setTotalPosts(0);
    } finally {
      setLoading(false);
    }
  }, [pages, pageSize]);

  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle pagination change
  const handlePageChange = (page: number, size?: number) => {
    console.log('Pagination changed:', { page, size });
    setPages(page);
    if (size && size !== pageSize) {
      setPageSize(size);
      setPages(1); // Reset to first page when page size changes
    }

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state - only show when both featured and posts are loading initially
  if (loading && featuredLoading && pages === 1) {
    return (
      <div className="px-4 md:px-6 py-10 lg:w-10/12 w-full mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading blogs...</div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && posts.length === 0) {
    return (
      <div className="px-4 md:px-6 py-10 lg:w-10/12 w-full mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">No blogs found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-10 lg:w-10/12 w-full mx-auto">
      {/* Featured section */}
      <h1 className="text-4xl font-bold mb-10 text-center block md:hidden">Latest Blogs</h1>
      <div className="mb-10">
        {/* Featured Large */}
        {featuredLoading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="animate-pulse">
              <div className="bg-gray-300 h-64 md:h-96 rounded-xl mb-4"></div>
              <div className="bg-gray-300 h-6 w-3/4 mx-auto rounded"></div>
            </div>
          </div>
        ) : featuredBlogs[0] ? (
          <BlogFeaturedCard
            blogId={featuredBlogs[0].blogId}
            thumbnailUrl={featuredBlogs[0].thumbnailUrl}
            title={featuredBlogs[0].title}
            description={featuredBlogs[0].title}
            date={featuredBlogs[0].createAt ? new Date(featuredBlogs[0].createAt).toDateString() : 'Unknown date'}
            size="large"
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No featured blog available</p>
          </div>
        )}
      </div>

      {/* Mascot + Featured Small - Compact Layout */}
      <div className="relative mb-6">
        {/* Featured blog (small) - mobile: show above mascot */}
        <div className="md:hidden mb-4">
          {featuredLoading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                <div className="bg-gray-300 h-4 w-2/3 mx-auto rounded"></div>
              </div>
            </div>
          ) : featuredBlogs[1] ? (
            <BlogFeaturedCard
              blogId={featuredBlogs[1].blogId}
              thumbnailUrl={featuredBlogs[1].thumbnailUrl}
              title={featuredBlogs[1].title}
              description={featuredBlogs[1].title}
              date={featuredBlogs[1].createAt ? new Date(featuredBlogs[1].createAt).toDateString() : 'Unknown date'}
              size="small"
            />
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Only one featured blog available</p>
            </div>
          )}
        </div>

        {/* Desktop layout - Mascot and Featured side by side */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 items-center">
          {/* Mascot */}
          <div className="flex justify-start">
            <img
              src={Images.pose1}
              alt="Mascot"
              className="w-48 lg:w-96 h-auto "
            />
          </div>

          {/* Featured blog (small) - desktop */}
          <div>
            {featuredLoading ? (
              <div className="text-center py-8 text-gray-500">
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                  <div className="bg-gray-300 h-4 w-2/3 mx-auto rounded"></div>
                </div>
              </div>
            ) : featuredBlogs[1] ? (
              <BlogFeaturedCard
                blogId={featuredBlogs[1].blogId}
                thumbnailUrl={featuredBlogs[1].thumbnailUrl}
                title={featuredBlogs[1].title}
                description={featuredBlogs[1].title}
                date={featuredBlogs[1].createAt ? new Date(featuredBlogs[1].createAt).toDateString() : 'Unknown date'}
                size="small"
              />
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>Only one featured blog available</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile mascot - positioned after featured blog */}
        <div className="md:hidden flex justify-center">
          <img
            src={Images.pose1}
            alt="Mascot"
            className="w-32 h-auto absolute left-0"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 ml-20 md:ml-0 md:text-center">Blogs List</h1>

      {/* Blog List */}
      <div className="flex flex-col gap-4 pt-10">
        {loading ? (
          // Loading skeleton for blog list
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse flex items-center gap-4 w-full">
                <div className="hidden md:flex items-center min-w-[60px]">
                  <div className="bg-gray-300 h-20 w-12 rounded"></div>
                </div>
                <div className="flex-1 flex items-center bg-gray-100 rounded-lg p-4">
                  <div className="bg-gray-300 w-32 h-32 lg:w-52 lg:h-52 rounded-lg mr-4"></div>
                  <div className="flex-1">
                    <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          posts.map((b) => (
            <BlogItemCard
              key={b.blogId}
              blogId={b.blogId}
              thumbnailUrl={b.thumbnailUrl}
              title={b.title}
              teaser={b.authorName}
              date={b.createAt ? new Date(b.createAt).toDateString() : 'Unknown date'}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No active blogs found for this page.
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Pagination
            current={pages}
            pageSize={pageSize}
            total={totalPosts}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} active blogs`
            }
            pageSizeOptions={['5', '10', '15', '20']}
            onChange={handlePageChange}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;