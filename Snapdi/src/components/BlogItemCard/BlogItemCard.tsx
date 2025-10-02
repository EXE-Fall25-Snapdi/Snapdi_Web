import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogItemCardProps {
  blogId: string;
  thumbnailUrl: string;
  title: string;
  teaser: string;
  date: string;
}

const BlogItemCard: React.FC<BlogItemCardProps> = ({
  blogId,
  thumbnailUrl,
  title,
  teaser,
  date,
}) => {
  const navigate = useNavigate();

  // Parse and format date
  const postDate = new Date(date);
  const day = postDate.getDate().toString().padStart(2, '0');
  const month = postDate.getMonth() + 1;
  const year = postDate.getFullYear();

  // Month names in Vietnamese
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const monthName = monthNames[month - 1];
  const fullDate = `${day} ${monthName} ${year}`;

  const handleCardClick = () => {
    console.log('BlogItemCard clicked - navigating to:', `/blog/${blogId}`);
    navigate(`/blog/${blogId}`);
  };

  return (
    <div
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg flex flex-col sm:flex-row w-full mx-auto hover:scale-[1.02] duration-300"
      onClick={handleCardClick}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-48 object-cover sm:w-48 md:w-64 md:h-48 sm:h-auto"
      />
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm md:text-lg mb-4 line-clamp-3">{teaser}</p>
          <span className="text-xs md:text-xl text-blue-800">{fullDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogItemCard;
