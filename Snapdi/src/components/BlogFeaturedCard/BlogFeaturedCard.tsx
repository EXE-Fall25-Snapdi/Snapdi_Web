import React from "react";

interface BlogFeaturedCardProps {
  thumbnailUrl: string;
  title: string;
  description: string;
  date: string;
  size?: "large" | "small";
}

const BlogFeaturedCard: React.FC<BlogFeaturedCardProps> = ({
  thumbnailUrl,
  title,
  description,
  date,
  size = "large",
}) => {
  const shortDesc =
    description.split(" ").length > 20
      ? description.split(" ").slice(0, 20).join(" ") + "..."
      : description;

  const heightClass = size === "large" ? "md:h-[500px] h-[50vh]" : "md:h-[500px] h-[50vh]";

  // Debug log
  console.log('BlogFeaturedCard:', { title, thumbnailUrl });

  return (
    <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden shadow-lg`}>
      {/* Simple background image approach */}
      <div
        className="w-full h-full bg-gray-400 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4 text-white">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <span className="text-sm bg-black/50 px-2 py-1 rounded">{date}</span>
          </div>
          <p className="text-sm md:text-base">{shortDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogFeaturedCard;
