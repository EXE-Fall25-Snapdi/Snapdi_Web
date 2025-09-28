import React from "react";

interface BlogItemCardProps {
  thumbnailUrl: string;
  title: string;
  teaser: string;
  date: string;
}

const BlogItemCard: React.FC<BlogItemCardProps> = ({
  thumbnailUrl,
  title,
  teaser,
  date,
}) => {
  const [day, ...rest] = date.split(" ");
  const month = rest[0] || "";

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Publish Date - ẩn trên mobile */}
      <div className="hidden md:flex items-center min-w-[60px] whitespace-nowrap">
        <span className="text-9xl font-bold">27/</span>
        <span className="text-[64px] mt-8">9</span>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center bg-gray-100 rounded-lg shadow p-4 lg:h-[220px] w-[830px]!">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-32 h-32 lg:w-52 lg:h-52 rounded-lg object-cover mr-4"
        />
        <div>
          <p className="font-black lg:text-[40px]!">{title}</p>
          <p className="lg:text-3xl font-thin text-gray-500">{teaser}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItemCard;
