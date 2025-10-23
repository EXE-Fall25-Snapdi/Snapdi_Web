import { useState } from 'react';
import { Avatar, Button, Modal, Select, Tag } from 'antd';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import type { PhotographerApplicationItem, PhotographerLevel, PhotographerLevelOption } from '../../utils/mock-data';
import CloudinaryImage from '../CloudinaryImage';

interface PhotographerPortfolioModalProps {
  open: boolean;
  photographer: PhotographerApplicationItem | null;
  levelOptions: PhotographerLevelOption[];
  onClose: () => void;
  onLevelChange: (userId: number, level: PhotographerLevel) => void;
  onPhotographerUpdate: (photographer: PhotographerApplicationItem) => void;
  initialImageIndex?: number;
}

const PhotographerPortfolioModal = ({
  open,
  photographer,
  levelOptions,
  onClose,
  onLevelChange,
  onPhotographerUpdate,
  initialImageIndex = 0,
}: PhotographerPortfolioModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  if (!photographer) {
    return null;
  }

  const levelSelectOptions = levelOptions.map(({ label, value }) => ({ label, value }));

  const handleLevelChange = (value: PhotographerLevel) => {
    onLevelChange(photographer.userId, value);
    onPhotographerUpdate({ ...photographer, photographerLevel: value });
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? photographer.photoPortfolio.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === photographer.photoPortfolio.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      handleCloseImageViewer();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      closeIcon={<X className="h-5 w-5" />}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4 border-b border-slate-200 pb-4">
          <Avatar size={64} src={photographer.avatarUrl} alt={photographer.name} />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-slate-900">{photographer.name}</h2>
            <p className="text-sm text-slate-500">{photographer.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">{photographer.avgRating.toFixed(2)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-600">
                {typeof photographer.yearsOfExperience === 'string' && photographer.yearsOfExperience.includes('|')
                  ? photographer.yearsOfExperience.split('|')[0].trim() + ' năm (' + photographer.yearsOfExperience.split('|')[1].trim() + ')'
                  : photographer.yearsOfExperience + ' năm'}
              </span>
              <span className="text-slate-300">•</span>
              <Tag color={photographer.photographerLevel ? 'blue' : 'default'}>
                {photographer.photographerLevel || 'Chưa phân cấp'}
              </Tag>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Portfolio Photos ({photographer.photoPortfolio.length})
          </h3>
          {photographer.photoPortfolio.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {photographer.photoPortfolio.map((publicId: string, index: number) => (
                <button
                  key={`${photographer.userId}-modal-${publicId}-${index}`}
                  type="button"
                  onClick={() => handleImageClick(index)}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <CloudinaryImage
                    publicId={publicId}
                    alt={`${photographer.name} portfolio ${index + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    transformation="c_fill,q_auto,f_auto,w_400,h_400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-2 left-2 text-xs font-medium text-white">
                      {index + 1} / {photographer.photoPortfolio.length}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-500">
              No portfolio photos available
            </div>
          )}
        </div>

        {/* Full Screen Image Viewer */}
        {isImageViewerOpen && photographer.photoPortfolio.length > 0 && (
          <div
            className="fixed inset-0 z-[9999] h-full bg-black/95 flex items-center justify-center"
            onClick={handleCloseImageViewer}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <button
              onClick={handleCloseImageViewer}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <CloudinaryImage
                publicId={photographer.photoPortfolio[currentImageIndex]}
                alt={`${photographer.name} portfolio ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                transformation="c_fit,q_auto,f_auto,w_1920,h_1080"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium">
              {currentImageIndex + 1} / {photographer.photoPortfolio.length}
            </div>
          </div>
        )}

        <div className="grid gap-4 border-t border-slate-200 pt-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Equipment</h4>
            <p className="text-sm text-slate-700">{photographer.equipmentDescription}</p>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">About</h4>
            <p className="text-sm text-slate-700">{photographer.description}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <Button onClick={onClose}>Đóng</Button>
          <Select
            value={photographer.photographerLevel || undefined}
            placeholder="Chọn cấp độ"
            onChange={handleLevelChange}
            options={levelSelectOptions}
            className="w-48"
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhotographerPortfolioModal;
