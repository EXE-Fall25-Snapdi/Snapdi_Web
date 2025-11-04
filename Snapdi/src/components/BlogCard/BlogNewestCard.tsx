import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryService } from "../../services/uploadService";
import { formatDate } from "../../utils/formatDate";

interface BlogNewestCardProps {
  blogId: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  date: string;
  size?: "large" | "small";
}

const BlogNewestCard: React.FC<BlogNewestCardProps> = ({
  blogId,
  thumbnailUrl,
  title,
  description,
  date,
  size = "small",
}) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      // If no thumbnailUrl (publicId), don't fetch
      if (!thumbnailUrl || thumbnailUrl.trim() === '') {
        setImageUrl(null);
        return;
      }

      try {
        // Call service to get transformed image URL from Cloudinary
        const response = await cloudinaryService.transformUrl(thumbnailUrl, {
          autoOptimize: true,
          crop: 'fill',
          gravity: 'auto',
          quality: 80
        });

        if (response.url) {
          setImageUrl(response.url);
        }
      } catch (err) {
        console.error('Failed to fetch Cloudinary image URL:', err);
        setImageUrl(null);
      }
    };

    fetchImageUrl();
  }, [thumbnailUrl]);

  const handleClick = () => {
    navigate(`/blog/${blogId}`);
  };

  if (size === "large") {
    return (
      <div
        onClick={handleClick}
        className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[630px] w-full max-w-[500px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group border-1 border-gray-300"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-gray-300 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Date Badge */}
        <div className="absolute top-6 right-6 text-gray-500 text-sm font-medium">
          {formatDate(date)}
        </div>

        {/* Bottom Content Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] p-6">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <span className="text-white text-sm line-clamp-2 opacity-90" dangerouslySetInnerHTML={{ __html: description.replace(/<img[^>]*>|<\/?br>/gi, '') }} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="flex gap-3 sm:gap-4 cursor-pointer group h-auto sm:h-[190px] w-full max-w-[600px]"
    >
      {/* Thumbnail */}
      <div
        className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[190px] md:h-[190px] flex-shrink-0 bg-gray-300 rounded-xl sm:rounded-2xl bg-cover border-1 border-gray-300 bg-center overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center py-1 min-w-0">
        <div>
          <h3 className="text-black font-bold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#00D9A3] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: description.replace(/<img[^>]*>|<\/?br>/gi, '') }} />
        </div>
        <div className="text-gray-500 text-sm sm:text-base md:text-lg mt-1 sm:mt-2 text-right flex justify-end items-end">{formatDate(date)}</div>
      </div>
    </div>
  );
};

export default BlogNewestCard;

