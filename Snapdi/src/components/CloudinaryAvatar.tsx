import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import type { AvatarProps } from 'antd';
import axiosInstance from '../config/axiosConfig';

interface CloudinaryAvatarProps extends Omit<AvatarProps, 'src'> {
  publicId?: string | null;
  fallbackText?: string;
  transformation?: string;
}

/**
 * CloudinaryAvatar component
 * Displays avatar from Cloudinary publicId or falls back to default avatar
 * 
 * @param publicId - Cloudinary public ID
 * @param fallbackText - Text to display if no image (e.g., first letter of name)
 * @param transformation - Cloudinary transformation string (default: crop=fill,gravity=face,quality=80)
 */
const CloudinaryAvatar: React.FC<CloudinaryAvatarProps> = ({
  publicId,
  fallbackText,
  transformation = 'c_fill,g_face,q_80',
  ...avatarProps
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {
      // If no publicId, don't fetch
      if (!publicId || publicId.trim() === '') {
        setImageUrl(null);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        // Parse transformation string into individual options
        // Default: 'c_fill,g_face,q_80'
        const transformOptions: any = {
          autoOptimize: true
        };

        // Parse transformation string like "c_fill,g_face,q_80"
        if (transformation) {
          const parts = transformation.split(',');
          parts.forEach(part => {
            const [key, value] = part.trim().split('_');
            if (key === 'c') transformOptions.crop = value;
            else if (key === 'g') transformOptions.gravity = value;
            else if (key === 'q') transformOptions.quality = parseInt(value);
            else if (key === 'w') transformOptions.width = parseInt(value);
            else if (key === 'h') transformOptions.height = parseInt(value);
            else if (key === 'f') transformOptions.format = value;
          });
        }

        // Call API with publicId as query parameter and transformation in body
        const response = await axiosInstance.post<{ url: string }>(
          `/api/Cloudinary/transform-url?publicId=${encodeURIComponent(publicId)}`,
          transformOptions
        );

        if (response.data?.url) {
          setImageUrl(response.data.url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch Cloudinary image URL:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [publicId, transformation]);

  // If error or no image URL, show fallback
  if (error || !imageUrl) {
    return (
      <Avatar {...avatarProps}>
        {fallbackText}
      </Avatar>
    );
  }

  // Show avatar with image
  return (
    <Avatar
      {...avatarProps}
      src={imageUrl}
      alt={fallbackText}
    >
      {loading ? '...' : fallbackText}
    </Avatar>
  );
};

export default CloudinaryAvatar;
