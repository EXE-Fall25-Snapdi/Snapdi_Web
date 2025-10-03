import React from "react";
import { Pagination } from "antd";
import BlogFeaturedCard from "../../../components/BlogFeaturedCard/BlogFeaturedCard";
import BlogItemCard from "../../../components/BlogItemCard/BlogItemCard";
import BlogSearchFilterSimple from "../../../components/BlogSearchFilter/BlogSearchFilterSimple";
import Images from "../../../components/images";
import { getActiveBlogWithPaging, searchBlogsWithBody, type BlogSearchParams } from "../../../services/blogService";
import type { Blog } from "../../../lib/types";
import "./BlogPage.css";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = React.useState<Blog[]>([]);
  const [pages, setPages] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [featuredBlogs, setFeaturedBlogs] = React.useState<Blog[]>([]);

  // Search and filter states
  const [currentSearchParams, setCurrentSearchParams] = React.useState<BlogSearchParams | null>(null);
  const [isSearchMode, setIsSearchMode] = React.useState(false);

  console.log('BlogPage render - States:', {
    postsLength: posts.length,
    featuredBlogsLength: featuredBlogs.length,
    pages,
    totalPosts
  });

  // Fetch featured blogs (2 latest blogs) - only once
  const fetchFeaturedBlogs = React.useCallback(async () => {
    try {
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
    }
  }, []);

  // Fetch featured blogs only once on component mount
  React.useEffect(() => {
    fetchFeaturedBlogs();
  }, [fetchFeaturedBlogs]);

  // Fetch blogs function (excluding the 2 featured blogs)
  const fetchBlogs = React.useCallback(async () => {
    try {
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
    }
  }, [pages, pageSize]);

  // Search blogs function
  const searchBlogs = React.useCallback(async (searchParams: BlogSearchParams) => {
    try {
      console.log('Searching blogs with params:', searchParams);

      const response = await searchBlogsWithBody({
        ...searchParams,
        pageNumber: pages,
        pageSize: pageSize
      });

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data && response.data.data) {
        paginatedData = response.data;
        console.log("Search - Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Search - Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        setPosts(paginatedData.data);
        setTotalPosts(paginatedData.totalRecords || 0);
        console.log('Search results:', {
          totalResults: paginatedData.totalRecords,
          currentPageResults: paginatedData.data.length
        });
      } else {
        console.error("Failed to search blogs:", response);
        setPosts([]);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      setPosts([]);
      setTotalPosts(0);
    }
  }, [pages, pageSize]);

  React.useEffect(() => {
    if (isSearchMode && currentSearchParams) {
      searchBlogs(currentSearchParams);
    } else {
      fetchBlogs();
    }
  }, [fetchBlogs, searchBlogs, isSearchMode, currentSearchParams]);

  // Handle search
  const handleSearch = (searchParams: BlogSearchParams) => {
    console.log('Search initiated with params:', searchParams);
    setCurrentSearchParams(searchParams);
    setIsSearchMode(true);
    setPages(1); // Reset to first page for new search
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clear search
  const handleClearSearch = () => {
    console.log('Clearing search');
    setCurrentSearchParams(null);
    setIsSearchMode(false);
    setPages(1); // Reset to first page
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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


  // Empty state - but we still show the page layout
  const isEmpty = posts.length === 0;
  return (
    <div className="px-4 md:px-6 py-10 lg:w-10/12 w-full mx-auto">
      {/* Featured section */}
      <h1 className="text-4xl font-bold mb-10 text-center block md:hidden">Latest Blogs</h1>
      <div className="mb-10">
        {/* Featured Large */}
        {featuredBlogs[0] ? (
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
          {featuredBlogs[1] ? (
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
            {featuredBlogs[1] ? (
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

      {/* Search and Filter Section */}
      <BlogSearchFilterSimple
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      {/* Blogs List Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ml-20 md:ml-0 md:text-left">
          {isSearchMode ? 'Search Results' : 'Blogs List'}
        </h1>
        {isSearchMode && (
          <div className="text-sm text-gray-600">
            {totalPosts} {totalPosts === 1 ? 'result' : 'results'} found
          </div>
        )}
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-4 pt-10">
        {posts.length > 0 ? (
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
        ) : isEmpty ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl text-gray-600 mb-2">
              {isSearchMode ? 'No results found' : 'No blogs available'}
            </div>
            <div className="text-gray-500">
              {isSearchMode
                ? 'Try adjusting your search filters or keywords'
                : 'Check back later for new blog posts'
              }
            </div>
            {isSearchMode && (
              <button
                onClick={handleClearSearch}
                className="mt-4 empty-state-clear-button"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : null}

        {/* Pagination */}
        {totalPosts > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination
              current={pages}
              pageSize={pageSize}
              total={totalPosts}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} ${isSearchMode ? 'results' : 'active blogs'}`
              }
              pageSizeOptions={['5', '10', '15', '20']}
              onChange={handlePageChange}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;