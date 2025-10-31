import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryService } from "../../services/uploadService";

interface BlogAllCardProps {
  blogId: string;
  thumbnailUrl: string;
  title: string;
  description: string;
}

const BlogAllCard: React.FC<BlogAllCardProps> = ({
  blogId,
  thumbnailUrl,
  title,
  description,
}) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

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

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      style={{ width: '360px', height: '700px' }}
    >
      {/* Image Container - 360x360px */}
      <div className="relative bg-gray-300 overflow-hidden" style={{ width: '360px', height: '360px' }}>
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl || thumbnailUrl})` }}
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p
          className="text-sm text-gray-600 mb-6 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 8,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.5em',
            maxHeight: '12em' // 8 lines * 1.5em line-height
          }}
          dangerouslySetInnerHTML={{
            __html: description.replace(/<img[^>]*>/gi, '')
          }}
        />

        {/* Read More Button */}
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-[#FF5757] text-white font-semibold rounded-lg hover:bg-[#E53D3D] transition-colors self-start"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default BlogAllCard;
