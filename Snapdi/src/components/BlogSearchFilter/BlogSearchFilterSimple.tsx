import React from "react";
import { Input, DatePicker, Button, Space, Card } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import type { BlogSearchParams } from "../../services/blogService";
import "./BlogSearchFilterSimple.css";

const { RangePicker } = DatePicker;

interface BlogSearchFilterSimpleProps {
  onSearch: (params: BlogSearchParams) => void;
  onClear: () => void;
}

const BlogSearchFilterSimple: React.FC<BlogSearchFilterSimpleProps> = ({
  onSearch,
  onClear,
}) => {
  const [searchForm, setSearchForm] = React.useState<BlogSearchParams>({
    searchTerm: "",
    isActive: true, // Only active blogs for public
    pageNumber: 1,
    pageSize: 10
  });

  const handleInputChange = (field: keyof BlogSearchParams, value: any) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setSearchForm(prev => ({
        ...prev,
        dateFrom: dates[0].toISOString(),
        dateTo: dates[1].toISOString()
      }));
    } else {
      setSearchForm(prev => ({
        ...prev,
        dateFrom: undefined,
        dateTo: undefined
      }));
    }
  };

  const handleSearch = () => {
    const cleanParams = { ...searchForm };
    // Remove empty values
    Object.keys(cleanParams).forEach(key => {
      const value = cleanParams[key as keyof BlogSearchParams];
      if (value === "" || value === null || value === undefined) {
        delete cleanParams[key as keyof BlogSearchParams];
      }
    });
    onSearch(cleanParams);
  };

  const handleClear = () => {
    setSearchForm({
      searchTerm: "",
      isActive: true,
      pageNumber: 1,
      pageSize: 10
    });
    onClear();
  };

  const hasActiveFilters = () => {
    return searchForm.searchTerm !== "" ||
      searchForm.dateFrom ||
      searchForm.dateTo;
  };

  return (
    <Card className="mb-6 shadow-sm blog-search-filter-simple">
      <div className="space-y-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Blogs
            </label>
            <Input
              placeholder="Search by title, content..."
              value={searchForm.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined className="text-gray-400" />}
              size="large"
              className="search-input"
            />
          </div>

          {/* Date Range */}
          <div className="w-full md:w-80">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <RangePicker
              className="w-full"
              size="large"
              onChange={handleDateRangeChange}
              placeholder={['From Date', 'To Date']}
            />
          </div>

          {/* Action Buttons */}
          <Space className="flex-shrink-0">
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              className="search-button"
            >
              Search
            </Button>
            <Button
              size="large"
              icon={<ClearOutlined />}
              onClick={handleClear}
              className="clear-button"
              disabled={!hasActiveFilters()}
            >
              Clear
            </Button>
          </Space>
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters() && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <span>🔍</span>
            <span>Filters applied</span>
            <button
              onClick={handleClear}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BlogSearchFilterSimple;