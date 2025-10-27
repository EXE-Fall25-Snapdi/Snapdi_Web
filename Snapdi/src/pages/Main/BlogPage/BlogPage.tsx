import React from "react";
import BlogHeroCard from "../../../components/BlogCard/BlogHeroCard";
import BlogTrendingCard from "../../../components/BlogCard/BlogTrendingCard";
import BlogNewestCard from "../../../components/BlogCard/BlogNewestCard";
import BlogSearchFilterSimple from "../../../components/BlogSearchFilter/BlogSearchFilterSimple";
import { getActiveBlogWithPaging, searchBlogsWithBody, type BlogSearchParams } from "../../../services/blogService";
import type { Blog } from "../../../lib/types";
import "./BlogPage.css";
import LearnMore from "../../../components/LearnMore/Learnmore";

const BlogPage: React.FC = () => {
  const [allBlogs, setAllBlogs] = React.useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = React.useState<Blog[]>([]);
  const [isSearchMode, setIsSearchMode] = React.useState(false);

  console.log('BlogPage render - States:', {
    allBlogsLength: allBlogs.length,
    filteredBlogsLength: filteredBlogs.length,
    isSearchMode,
  });

  // Helper function to convert date to ISO string
  const getDateString = (date: string | Date | undefined): string => {
    if (!date) return new Date().toISOString();
    if (typeof date === 'string') return date;
    return date.toISOString();
  };

  // Fetch all blogs - fetch a large number to get all
  const fetchAllBlogs = React.useCallback(async () => {
    try {
      console.log('Fetching all blogs');

      // Fetch with a large page size to get all blogs
      const response = await getActiveBlogWithPaging(1, 100);

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
        setFilteredBlogs(sortedBlogs);
        console.log('All blogs loaded and sorted:', sortedBlogs.length);
      } else {
        console.error("Failed to fetch blogs:", response);
        setAllBlogs([]);
        setFilteredBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setAllBlogs([]);
      setFilteredBlogs([]);
    }
  }, []);

  // Fetch all blogs on component mount
  React.useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  // Search blogs function
  const searchBlogs = React.useCallback(async (searchParams: BlogSearchParams) => {
    try {
      console.log('Searching blogs with params:', searchParams);

      const response = await searchBlogsWithBody({
        ...searchParams,
        pageNumber: 1,
        pageSize: 100 // Get all search results
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

        setFilteredBlogs(sortedResults);
        console.log('Search results:', sortedResults.length);
      } else {
        console.error("Failed to search blogs:", response);
        setFilteredBlogs([]);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      setFilteredBlogs([]);
    }
  }, []);

  // Handle search
  const handleSearch = (searchParams: BlogSearchParams) => {
    console.log('Search initiated with params:', searchParams);
    setIsSearchMode(true);
    searchBlogs(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clear search
  const handleClearSearch = () => {
    console.log('Clearing search');
    setIsSearchMode(false);
    setFilteredBlogs(allBlogs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get blogs for different sections
  const heroBlogs = filteredBlogs.slice(0, 4); // 4 blogs for hero
  const trendingBlogs = filteredBlogs.slice(4, 8); // 4 blogs for trending
  const newestBlogs = filteredBlogs.slice(8); // remaining blogs
  const newestFeatured = newestBlogs[0]; // 1 featured
  const newestList = newestBlogs.slice(1, 4); // 3 more blogs in list (total 4 in newest)


  return (
    <div className="min-h-screen bg-white pt-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">

        {/* Search Filter at Top */}
        <div className="mb-12">
          <BlogSearchFilterSimple
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-2xl text-gray-600 mb-2">
              {isSearchMode ? 'No results found' : 'No blogs available'}
            </div>
            <div className="text-gray-500 mb-6">
              {isSearchMode
                ? 'Try adjusting your search filters or keywords'
                : 'Check back later for new blog posts'
              }
            </div>
            {isSearchMode && (
              <button
                onClick={handleClearSearch}
                className="px-6 py-3 bg-[#00D9A3] text-black font-semibold rounded-lg hover:bg-[#00C090] transition-colors"
              >
                Clear Search
              </button>
            )}
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
                <h2 className="text-4xl font-bold mb-8">TRENDING</h2>
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
                  <h2 className="text-4xl font-bold mb-8">NEWEST</h2>
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
      </div>
      <LearnMore />
    </div>
  );
};

export default BlogPage;