import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryService } from "../../services/uploadService";

interface BlogTrendingCardProps {
  blogId: string;
  thumbnailUrl: string;
  title: string;
}

const BlogTrendingCard: React.FC<BlogTrendingCardProps> = ({
  blogId,
  thumbnailUrl,
  title,
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
          width: 200,
          height: 200,
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
      className="relative h-[320px] rounded-3xl overflow-hidden cursor-pointer group"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-gray-300 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Bottom Title Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#00EA80] to-[#12C6A3] p-4">
        <h3 className="text-lg text-white line-clamp-1">{title}</h3>
      </div>
    </div>
  );
};

export default BlogTrendingCard;

