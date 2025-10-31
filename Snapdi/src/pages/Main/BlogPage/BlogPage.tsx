import React from "react";
import BlogHeroCard from "../../../components/BlogCard/BlogHeroCard";
import BlogTrendingCard from "../../../components/BlogCard/BlogTrendingCard";
import BlogNewestCard from "../../../components/BlogCard/BlogNewestCard";
// import BlogAllCard from "../../../components/BlogCard/BlogAllCard";
import BlogSearchFilterSimple from "../../../components/BlogSearchFilter/BlogSearchFilterSimple";
import { getActiveBlogWithPaging, searchBlogsWithBody, type BlogSearchParams } from "../../../services/blogService";
import type { Blog } from "../../../lib/types";
import "./BlogPage.css";
// import LearnMore from "../../../components/LearnMore/Learnmore";

const BlogPage: React.FC = () => {
  // Hero, Trending, Newest sections - fetched once on mount
  const [heroTrendingNewestBlogs, setHeroTrendingNewestBlogs] = React.useState<Blog[]>([]);

  // All Blogs section - with pagination
  const [allBlogs, setAllBlogs] = React.useState<Blog[]>([]);
  const [allBlogsPage, setAllBlogsPage] = React.useState(1);
  const [allBlogsTotalPages, setAllBlogsTotalPages] = React.useState(0);
  const allBlogsItemsPerPage = 8;

  // Search/Filter - with pagination
  const [filteredBlogsForSearch, setFilteredBlogsForSearch] = React.useState<Blog[]>([]);
  const [searchBlogsPage, setSearchBlogsPage] = React.useState(1);
  const [searchBlogsTotalCount, setSearchBlogsTotalCount] = React.useState(0);
  const [isSearchMode, setIsSearchMode] = React.useState(false);
  const searchBlogsItemsPerPage = 6;

  console.log('BlogPage render - States:', {
    heroTrendingNewestBlogsLength: heroTrendingNewestBlogs.length,
    allBlogsLength: allBlogs.length,
    isSearchMode,
  });

  // Helper function to convert date to ISO string
  const getDateString = (date: string | Date | undefined): string => {
    if (!date) return new Date().toISOString();
    if (typeof date === 'string') return date;
    return date.toISOString();
  };

  // Fetch Hero, Trending, Newest sections - only once on mount
  const fetchHeroTrendingNewest = React.useCallback(async () => {
    try {
      console.log('Fetching hero/trending/newest blogs');

      // Fetch 12 blogs for hero (4) + trending (4) + newest (4+)
      const response = await getActiveBlogWithPaging(1, 12);

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data) {
        paginatedData = response.data;
        console.log("Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        // Sort by creation date (newest first)
        const sortedBlogs = [...paginatedData.data].sort((a, b) => {
          const dateA = new Date(a.createAt || 0).getTime();
          const dateB = new Date(b.createAt || 0).getTime();
          return dateB - dateA;
        });

        setHeroTrendingNewestBlogs(sortedBlogs);
        console.log('Hero/Trending/Newest blogs loaded:', sortedBlogs.length, 'Response:', paginatedData);
      } else {
        console.error("Failed to fetch hero/trending/newest blogs:", response);
        setHeroTrendingNewestBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching hero/trending/newest blogs:", error);
      setHeroTrendingNewestBlogs([]);
    }
  }, []);

  // Fetch hero/trending/newest on component mount
  React.useEffect(() => {
    fetchHeroTrendingNewest();
  }, [fetchHeroTrendingNewest]);

  // Fetch all blogs with pagination from server
  const fetchAllBlogsPage = React.useCallback(async (page: number) => {
    try {
      console.log('Fetching all blogs - page:', page);

      const response = await getActiveBlogWithPaging(page, allBlogsItemsPerPage);

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data) {
        paginatedData = response.data;
        console.log("Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        // Sort by creation date (newest first)
        const sortedBlogs = [...paginatedData.data].sort((a, b) => {
          const dateA = new Date(a.createAt || 0).getTime();
          const dateB = new Date(b.createAt || 0).getTime();
          return dateB - dateA;
        });

        setAllBlogs(sortedBlogs);
        // Get total pages from API response (totalPages is already calculated by backend)
        const totalPages = paginatedData.totalPages || (paginatedData.totalRecords ? Math.ceil(paginatedData.totalRecords / allBlogsItemsPerPage) : 1);
        setAllBlogsTotalPages(totalPages);
        console.log('All blogs page loaded:', sortedBlogs.length, 'Total pages:', totalPages, 'Response:', paginatedData);
      } else {
        console.error("Failed to fetch blogs:", response);
        setAllBlogs([]);
        setAllBlogsTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching blogs page:", error);
      setAllBlogs([]);
      setAllBlogsTotalPages(0);
    }
  }, [allBlogsItemsPerPage]);

  // Fetch all blogs page on mount and when page changes
  React.useEffect(() => {
    fetchAllBlogsPage(allBlogsPage);
  }, [allBlogsPage, fetchAllBlogsPage]);

  // Search blogs function - with pagination
  const searchBlogs = React.useCallback(async (searchParams: BlogSearchParams, page: number = 1) => {
    try {
      console.log('Searching blogs with params:', searchParams, 'page:', page);

      const response = await searchBlogsWithBody({
        ...searchParams,
        pageNumber: page,
        pageSize: searchBlogsItemsPerPage
      });

      // Handle different response structures
      let paginatedData: any = null;

      if (response && response.data) {
        paginatedData = response.data;
        console.log("Search - Using ResponseModel structure");
      } else if (response && (response as any).data && Array.isArray((response as any).data)) {
        paginatedData = response;
        console.log("Search - Using direct PaginatedResponse structure");
      }

      if (paginatedData && paginatedData.data && Array.isArray(paginatedData.data)) {
        // Sort search results by creation date (newest first)
        const sortedResults = [...paginatedData.data].sort((a, b) => {
          const dateA = new Date(a.createAt || 0).getTime();
          const dateB = new Date(b.createAt || 0).getTime();
          return dateB - dateA;
        });

        setFilteredBlogsForSearch(sortedResults);
        // Get total pages from API response (totalPages is already calculated by backend)
        const totalPages = paginatedData.totalPages || (paginatedData.totalRecords ? Math.ceil(paginatedData.totalRecords / searchBlogsItemsPerPage) : 1);
        setSearchBlogsTotalCount(totalPages);
        console.log('Search results:', sortedResults.length, 'Total pages:', totalPages, 'Response:', paginatedData);
      } else {
        console.error("Failed to search blogs:", response);
        setFilteredBlogsForSearch([]);
        setSearchBlogsTotalCount(0);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      setFilteredBlogsForSearch([]);
      setSearchBlogsTotalCount(0);
    }
  }, [searchBlogsItemsPerPage]);

  // Store current search params to refetch when page changes
  const [currentSearchParams, setCurrentSearchParams] = React.useState<BlogSearchParams | null>(null);

  // Fetch search page when page changes
  React.useEffect(() => {
    if (isSearchMode && currentSearchParams) {
      searchBlogs(currentSearchParams, searchBlogsPage);
    }
  }, [searchBlogsPage, isSearchMode, currentSearchParams, searchBlogs]);

  // Handle search
  const handleSearch = (searchParams: BlogSearchParams) => {
    console.log('Search initiated with params:', searchParams);
    setIsSearchMode(true);
    setSearchBlogsPage(1);
    setCurrentSearchParams(searchParams);
    searchBlogs(searchParams, 1);
  };

  // Handle clear search
  const handleClearSearch = () => {
    console.log('Clearing search');
    setIsSearchMode(false);
    setFilteredBlogsForSearch([]);
    setSearchBlogsPage(1);
    setCurrentSearchParams(null);
    setAllBlogsPage(1);
  };

  // Get blogs for different sections - from heroTrendingNewestBlogs (fetched once)
  const heroBlogs = heroTrendingNewestBlogs.slice(0, 4); // 4 blogs for hero
  const trendingBlogs = heroTrendingNewestBlogs.slice(4, 8); // 4 blogs for trending
  const newestBlogs = heroTrendingNewestBlogs.slice(8); // remaining blogs
  const newestFeatured = newestBlogs[0]; // 1 featured
  const newestList = newestBlogs.slice(1, 4); // 3 more blogs in list (total 4 in newest)


  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {isSearchMode && filteredBlogsForSearch.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-2xl text-gray-600 mb-2">No results found</div>
            <div className="text-gray-500 mb-6">
              Try adjusting your search filters or keywords
            </div>
            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-[#00D9A3] text-black font-semibold rounded-lg hover:bg-[#00C090] transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : heroTrendingNewestBlogs.length === 0 && !isSearchMode ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <div className="text-2xl text-gray-600 mb-2">No blogs available</div>
            <div className="text-gray-500 mb-6">
              Check back later for new blog posts
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            {heroBlogs.length > 0 && (
              <div className="mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Large Hero Card */}
                  {heroBlogs[0] && (
                    <div className="md:row-span-2">
                      <BlogHeroCard
                        blogId={heroBlogs[0].blogId}
                        thumbnailUrl={heroBlogs[0].thumbnailUrl}
                        title={heroBlogs[0].title}
                        description={heroBlogs[0].content || heroBlogs[0].title}
                        date={getDateString(heroBlogs[0].createAt)}
                        size="large"
                      />
                    </div>
                  )}

                  {/* Medium/Small Hero Cards */}
                  <div className="space-y-6">
                    {heroBlogs[1] && (
                      <BlogHeroCard
                        blogId={heroBlogs[1].blogId}
                        thumbnailUrl={heroBlogs[1].thumbnailUrl}
                        title={heroBlogs[1].title}
                        description={heroBlogs[1].content || heroBlogs[1].title}
                        date={getDateString(heroBlogs[1].createAt)}
                        size="medium"
                      />
                    )}
                    <div className="grid grid-cols-2 gap-7">
                      {heroBlogs[2] && (
                        <BlogHeroCard
                          blogId={heroBlogs[2].blogId}
                          thumbnailUrl={heroBlogs[2].thumbnailUrl}
                          title={heroBlogs[2].title}
                          description={heroBlogs[2].content || heroBlogs[2].title}
                          date={getDateString(heroBlogs[2].createAt)}
                          size="small"
                        />
                      )}
                      {heroBlogs[3] && (
                        <BlogHeroCard
                          blogId={heroBlogs[3].blogId}
                          thumbnailUrl={heroBlogs[3].thumbnailUrl}
                          title={heroBlogs[3].title}
                          description={heroBlogs[3].content || heroBlogs[3].title}
                          date={getDateString(heroBlogs[3].createAt)}
                          size="small"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trending Section */}
            {trendingBlogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-[48px] font-bold mb-8">TRENDING</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingBlogs.slice(0, 4).map((blog) => (
                    <BlogTrendingCard
                      key={blog.blogId}
                      blogId={blog.blogId}
                      thumbnailUrl={blog.thumbnailUrl}
                      title={blog.title}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Newest Section */}
            {newestBlogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-[48px] font-bold mb-8">NEWEST</h2>
                <div className="w-full flex justify-between">
                  {/* Large Featured Newest */}
                  {newestFeatured && (
                    <div className="lg:col-span-1">
                      <BlogNewestCard
                        blogId={newestFeatured.blogId}
                        thumbnailUrl={newestFeatured.thumbnailUrl}
                        title={newestFeatured.title}
                        description={newestFeatured.content || newestFeatured.title}
                        date={getDateString(newestFeatured.createAt)}
                        size="large"
                      />
                    </div>
                  )}

                  {/* List of Newest */}
                  {newestList.length > 0 && (
                    <div className="lg:col-span-2 space-y-8">
                      {newestList.map((blog) => (
                        <BlogNewestCard
                          key={blog.blogId}
                          blogId={blog.blogId}
                          thumbnailUrl={blog.thumbnailUrl}
                          title={blog.title}
                          description={blog.content || blog.title}
                          date={getDateString(blog.createAt)}
                          size="small"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <div className="mb-16 w-full h-auto flex flex-col justify-center items-center">
          <h2 className="text-[48px] font-bold">ALL BLOGS</h2>
          {/* Search Filter */}
          <div className="">
            <BlogSearchFilterSimple
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>

          {isSearchMode ? (
            // Search Mode - Show search results with pagination
            <>
              {filteredBlogsForSearch.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <div className="text-2xl text-gray-600 mb-2">No results found</div>
                  <div className="text-gray-500 mb-6">
                    Try adjusting your search filters or keywords
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="px-6 py-3 bg-[#00D9A3] text-black font-semibold rounded-lg hover:bg-[#00C090] transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <>
                  {/* Search Results Grid */}
                  <div className="flex justify-center mb-12">
                    <div className="gap-6 max-w-7xl" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', width: '100%' }}>
                      {filteredBlogsForSearch.map((blog) => (
                        <BlogTrendingCard
                          key={blog.blogId}
                          blogId={blog.blogId}
                          thumbnailUrl={blog.thumbnailUrl}
                          title={blog.title}
                        // description={blog.content || blog.title}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Search Pagination */}
                  {searchBlogsTotalCount > 1 && (
                    <div className="flex justify-center items-center gap-2 mb-8">
                      <button
                        onClick={() => setSearchBlogsPage(prev => Math.max(prev - 1, 1))}
                        disabled={searchBlogsPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Previous
                      </button>

                      {Array.from({ length: searchBlogsTotalCount }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setSearchBlogsPage(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${searchBlogsPage === page
                            ? 'bg-[#00D9A3] text-black font-semibold'
                            : 'border border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setSearchBlogsPage(prev => Math.min(prev + 1, searchBlogsTotalCount))}
                        disabled={searchBlogsPage === searchBlogsTotalCount}
                        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Back to All Blogs Button */}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={handleClearSearch}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Back to All Blogs
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            // Normal Mode - Show paginated All Blogs
            <>
              {/* Blogs Grid - Fixed width cards (286px) */}
              <div className="flex justify-center">
                <div className="gap-6 mb-12 max-w-7xl" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', width: '100%' }}>
                  {allBlogs.length > 0 && (allBlogs.map((blog) => (
                    <BlogTrendingCard
                      key={blog.blogId}
                      blogId={blog.blogId}
                      thumbnailUrl={blog.thumbnailUrl}
                      title={blog.title}
                    // description={blog.content || blog.title}
                    />
                  )))}
                </div>
              </div>

              {/* Pagination */}
              {allBlogsTotalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setAllBlogsPage(prev => Math.max(prev - 1, 1))}
                    disabled={allBlogsPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: allBlogsTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setAllBlogsPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${allBlogsPage === page
                        ? 'bg-[#00D9A3] text-black font-semibold'
                        : 'border border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setAllBlogsPage(prev => Math.min(prev + 1, allBlogsTotalPages))}
                    disabled={allBlogsPage === allBlogsTotalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* <LearnMore /> */}
    </div>
  );
};

export default BlogPage;