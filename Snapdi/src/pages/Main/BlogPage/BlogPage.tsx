import React from "react";
import {Pagination } from "antd";
import { posts } from "../../../lib/mock-data";
import BlogFeaturedCard from "../../../components/BlogFeaturedCard/BlogFeaturedCard";
import BlogItemCard from "../../../components/BlogItemCard/BlogItemCard";
import Images from "../../../components/images";

const BlogPage: React.FC = () => {
  const featuredBlogs = posts.slice(0, 2);
  const blogList = posts;

  return (
    <div className="md:px-6 py-10 md:w-10/12 w-full mx-auto">
      {/* Featured section */}
      <div className="mb-10">
        {/* Featured Large */}
        <BlogFeaturedCard
          thumbnailUrl={featuredBlogs[0].thumbnailUrl}
          title={featuredBlogs[0].title}
          description={featuredBlogs[0].title}
          date={featuredBlogs[0].date}
          size="large"
        />
      </div>

      {/* Mascot + Featured Small */}
      <div className="grid md:grid-cols-2 gap-6 items-start mb-10">
        <div className="flex">
          <img src={Images.pose1} alt="Mascot" className="w-48 md:w-3xl lg:w-3xl absolute z-50 top-7/12 lg:top-6/12 md:left-1/12 lg:left-2/12"  />
        </div>
        <div className="hidden md:block">
          <BlogFeaturedCard
            thumbnailUrl={featuredBlogs[1].thumbnailUrl}
            title={featuredBlogs[1].title}
            description={featuredBlogs[1].title}
            date={featuredBlogs[1].date}
            size="small"
          />
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
        {blogList.map((b) => (
          <BlogItemCard
            key={b.id}
            thumbnailUrl={b.thumbnailUrl}
            title={b.title}
            teaser={b.author}
            date={b.date}
          />
        ))}
      {/* Paging */}
      <div className="flex justify-end mt-6">
        <Pagination defaultCurrent={1} total={50} pageSize={10} />
      </div>
      </div>
    </div>
  );
};

export default BlogPage;