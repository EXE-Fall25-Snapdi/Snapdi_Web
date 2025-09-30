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
  const featuredBlogs = posts.slice(0, 2);

  React.useEffect(() => {
    // Fetch blogs when the component mounts
    const fetchBlogs = async () => {
      const response = await getActiveBlogWithPaging(pages, pageSize);
      // Handle the response
      console.log("Fetched blogs:", response);
      if (response.data) {
        setPosts(response.data);
      } else {
        console.error("Failed to fetch blogs:", response);
      }
    };
    fetchBlogs();
  }, [pages, pageSize]);

  // Loading state
  if (posts.length === 0) {
    return (
      <div className="md:px-6 py-10 md:w-10/12 w-full mx-auto">
        <div className="flex justify-center items-center h-64">
          <div>Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:px-6 py-10 md:w-10/12 w-full mx-auto">
      {/* Featured section */}
      <div className="mb-10">
        {/* Featured Large */}
        {featuredBlogs[0] && (
          <BlogFeaturedCard
            thumbnailUrl={featuredBlogs[0].thumbnailUrl}
            title={featuredBlogs[0].title}
            description={featuredBlogs[0].title}
            date={featuredBlogs[0].createAt ? new Date(featuredBlogs[0].createAt).toDateString() : 'Unknown date'}
            size="large"
          />
        )}
      </div>

      {/* Mascot + Featured Small */}
      <div className="grid md:grid-cols-2 gap-6 items-start mb-10">
        <div className="flex">
          <img src={Images.pose1} alt="Mascot" className="w-48 md:w-3xl lg:w-3xl absolute z-50 top-7/12 lg:top-6/12 md:left-1/12 lg:left-2/12" />
        </div>
        <div className="hidden md:block">
          {featuredBlogs[1] && (
            <BlogFeaturedCard
              thumbnailUrl={featuredBlogs[1].thumbnailUrl}
              title={featuredBlogs[1].title}
              description={featuredBlogs[1].title}
              date={featuredBlogs[1].createAt ? new Date(featuredBlogs[1].createAt).toDateString() : 'Unknown date'}
              size="small"
            />
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mt-20 mb-6">
        <button className="text-2xl px-4 py-1 rounded-xl bg-gray-300 hover:scale-110">News</button>
        <button className="text-2xl px-4 py-1 rounded-xl bg-gray-300 hover:scale-110">Portrait</button>
        <button className="text-2xl px-4 py-1 rounded-xl bg-gray-300 hover:scale-110">Trends</button>
      </div>

      {/* Blog List */}
      <div className="flex flex-col gap-4">
        {posts.map((b) => (
          <BlogItemCard
            key={b.blogId}
            thumbnailUrl={b.thumbnailUrl}
            title={b.title}
            teaser={b.authorName}
            date={b.createAt ? new Date(b.createAt).toDateString() : 'Unknown date'}
          />
        ))}
        {/* Paging */}
        <div className="flex justify-end mt-6">
          <Pagination
            current={pages}
            pageSize={pageSize}
            total={50}
            onChange={(page, size) => {
              setPages(page);
              setPageSize(size);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;