import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination, Input } from 'antd';
import { Search } from 'lucide-react';
import ReviewsTable from '../../../components/AdminComponents/ReviewsTable';
import { reviewService } from '../../../services/reviewService';
import { toast } from 'react-toastify';
import type { Review } from '../../../lib/types';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchInput, setSearchInput] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Fetch reviews
  const fetchReviews = async (page: number = 1, pageSize: number = 10) => {
    try {
      setLoading(true);
      const response = await reviewService.getReviews(page, pageSize);

      if (response.success && response.data) {
        setReviews(response.data.items || []);
        setFilteredReviews(response.data.items || []);
        setPagination({
          current: response.data.currentPage || page,
          pageSize: response.data.pageSize || pageSize,
          total: response.data.totalItems || 0
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
      setReviews([]);
      setFilteredReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReviews(pagination.current, pagination.pageSize);
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchInput.trim()) {
      setFilteredReviews(reviews);
      return;
    }

    const filtered = reviews.filter(review => {
      const searchTerm = searchInput.toLowerCase();
      return (
        review.fromUserName.toLowerCase().includes(searchTerm) ||
        review.comment.toLowerCase().includes(searchTerm) ||
        review.reviewId.toString().includes(searchTerm) ||
        review.bookingId.toString().includes(searchTerm)
      );
    });

    setFilteredReviews(filtered);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput('');
    setFilteredReviews(reviews);
  };

  // Handle pagination change
  const handlePaginationChange = (page: number, pageSize?: number) => {
    fetchReviews(page, pageSize || pagination.pageSize);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews Management</h1>
          <p className="text-gray-600">Manage and monitor all user reviews</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-2">
            <Input
              placeholder="Search by reviewer name, comment, review ID, or booking ID..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              allowClear
              onClear={handleClearSearch}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<Search className="w-4 h-4" />}
              onClick={handleSearch}
              loading={loading}
            >
              Search
            </Button>
          </div>

          {/* Active Search Display */}
          <div className="flex justify-between items-center mt-4">
            {searchInput && (
              <div className="text-sm text-gray-600">
                Searching for: <span className="font-medium">"{searchInput}"</span> ({filteredReviews.length} results)
              </div>
            )}
            {searchInput && (
              <Button onClick={handleClearSearch} type="text">
                Clear Search
              </Button>
            )}
          </div>
        </div>

        {/* Reviews Table */}
        <div className="mb-6 overflow-x-auto">
          <ReviewsTable reviews={filteredReviews} />
        </div>

        {/* Pagination */}
        {pagination.total > 0 && (
          <div className="flex justify-end">
            <Pagination
              showSizeChanger
              pageSizeOptions={['10', '20', '50', '100']}
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} reviews`
              }
            />
          </div>
        )}

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <div className="text-xl text-gray-600 mb-2">No reviews found</div>
            <div className="text-gray-500">
              {searchInput ? 'Try adjusting your search terms' : 'No reviews available at the moment'}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{pagination.total}</div>
              <div className="text-sm text-gray-600 mt-1">Total Reviews</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {reviews.filter(r => r.rating === 5).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">5-Star Reviews</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {reviews.filter(r => r.rating === 4).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">4-Star Reviews</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {(reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Rating</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewsManagement;
