import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import axiosInstance from '../config/axiosConfig';

interface CloudinaryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  publicId: string;
  transformation?: string;
  fallbackSrc?: string;
}

/**
 * CloudinaryImage component
 * Displays image from Cloudinary publicId with automatic URL transformation
 * 
 * @param publicId - Cloudinary public ID
 * @param transformation - Cloudinary transformation string (default: crop=fill,quality=auto,format=auto)
 * @param fallbackSrc - Fallback image URL if fetch fails
 */
const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  transformation = 'c_fill,q_auto,f_auto',
  fallbackSrc,
  className,
  alt,
  ...imgProps
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImageUrl = async () => {

      setLoading(true);
      setError(false);

      try {
        // Parse transformation string into individual options
        const transformOptions: any = {
          autoOptimize: true
        };

        // Parse transformation string like "c_fill,q_auto,f_auto"
        if (transformation) {
          const parts = transformation.split(',');
          parts.forEach(part => {
            const [key, value] = part.trim().split('_');
            if (key === 'c') transformOptions.crop = value;
            else if (key === 'g') transformOptions.gravity = value;
            else if (key === 'q') transformOptions.quality = value === '100' ? '100' : parseInt(value);
            else if (key === 'w') transformOptions.width = parseInt(value);
            else if (key === 'h') transformOptions.height = parseInt(value);
            else if (key === 'f') transformOptions.format = value;
          });
        }

        // Call API with publicId as query parameter and transformation in body
        const response = await axiosInstance.post<{ url: string }>(
          `/api/Cloudinary/transform-url?publicId=${publicId}`,
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

  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className || ''}`}>
        <Spin size="small" />
      </div>
    );
  }

  // Show error or fallback
  if (error || !imageUrl) {
    if (fallbackSrc) {
      return (
        <img
          {...imgProps}
          src={fallbackSrc}
          alt={alt}
          className={className}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className || ''}`}>
        <span className="text-xs">Image unavailable</span>
      </div>
    );
  }

  // Show image
  return (
    <img
      {...imgProps}
      src={imageUrl}
      alt={alt}
      className={className}
    />
  );
};

export default CloudinaryImage;
