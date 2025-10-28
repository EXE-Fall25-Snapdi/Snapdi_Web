import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cloudinaryService } from "../../services/uploadService";

interface BlogHeroCardProps {
  blogId: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  date: string;
  size?: "large" | "medium" | "small";
}

const BlogHeroCard: React.FC<BlogHeroCardProps> = ({
  blogId,
  thumbnailUrl,
  title,
  description,
  date,
  size = "large",
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  const handleClick = () => {
    navigate(`/blog/${blogId}`);
  };

  const sizeClasses = {
    large: "col-span-2 row-span-2 h-[605px]",
    medium: "col-span-1 row-span-1 h-[372px]",
    small: "col-span-1 row-span-1 h-[209px]"
  };

  return (
    <div
      onClick={handleClick}
      className={`relative ${sizeClasses[size]} border-1 border-gray-300 rounded-3xl overflow-hidden cursor-pointer group text-black`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl || thumbnailUrl})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className={`relative h-full flex flex-col justify-between ${size === 'medium' && 'p-[40px]'} ${size === 'large' && 'p-[50px]'} p-[30px]  text-white`}>
        <div className="space-y-2 ">
          <h2 className={`font-bold text-black text-xl ${size === 'large' && 'text-4xl!'} ${size === 'medium' && 'text-2xl!'}   line-clamp-2`}>
            {title}
            {size === 'large' || size === 'medium' ? (
              <p className="text-sm line-clamp-3 opacity-90" dangerouslySetInnerHTML={{ __html: description.replace(/<img[^>]*>|<\/?br>/gi, '') }} />
            ) : null}
          </h2>
        </div>
        {size === 'large' ? (
          <>
            <div className="flex justify-between">
              <button className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] text-xl text-black font-semibold rounded-lg hover:bg-[#00C090] transition-colors">
                MORE
              </button>
              <div className="flex justify-end items-end">
                <span className="text-sm text-black font-medium">{formatDate(date)}</span>
              </div>
            </div>
          </>
        ) :
          (
            <div className="flex justify-end items-end">
              <span className="text-sm text-black font-medium">{formatDate(date)}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default BlogHeroCard;

