import React from "react";
import { Input, Select, DatePicker, Button, Space, Card, Collapse } from "antd";
import "./BlogSearchFilterFull.css";
import { SearchOutlined, FilterOutlined, ClearOutlined } from "@ant-design/icons";
import type { BlogSearchParams } from "../../services/blogService";
import type { Keyword } from "../../lib/types";
import type { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface BlogSearchFilterProps {
  onSearch: (params: BlogSearchParams) => void;
  onClear: () => void;
  loading?: boolean;
  keywords?: Keyword[];
}

const BlogSearchFilterFull: React.FC<BlogSearchFilterProps> = ({
  onSearch,
  onClear,
  loading = false,
  keywords = []
}) => {
  // Debug logging for keywords prop
  React.useEffect(() => {
    console.log('BlogSearchFilterFull - Keywords prop received:', {
      keywordsCount: keywords.length,
      keywords,
      keywordsType: typeof keywords
    });
  }, [keywords]);

  const [searchForm, setSearchForm] = React.useState<BlogSearchParams>({
    searchTerm: "",
    keywordIds: [],
    isActive: undefined,
    pageNumber: 1,
    pageSize: 10
  });

  const handleInputChange = <K extends keyof BlogSearchParams>(field: K, value: BlogSearchParams[K]) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setSearchForm(prev => ({
        ...prev,
        dateFrom: (dates[0] as Dayjs).toISOString(),
        dateTo: (dates[1] as Dayjs).toISOString()
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
    console.log('BlogSearchFilterFull - handleSearch called');
    console.log('BlogSearchFilterFull - Raw search form:', searchForm);

    const cleanParams = { ...searchForm };
    // Remove empty values
    Object.keys(cleanParams).forEach(key => {
      const value = cleanParams[key as keyof BlogSearchParams];
      if (value === "" || value === null || value === undefined ||
        (Array.isArray(value) && value.length === 0)) {
        delete cleanParams[key as keyof BlogSearchParams];
      }
    });

    console.log('BlogSearchFilterFull - Clean params:', cleanParams);
    console.log('BlogSearchFilterFull - Calling onSearch...');
    onSearch(cleanParams);
  };

  const handleClear = () => {
    setSearchForm({
      searchTerm: "",
      keywordIds: [],
      isActive: undefined,
      pageNumber: 1,
      pageSize: 10
    });
    onClear();
  };

  const hasActiveFilters = () => {
    return searchForm.searchTerm !== "" ||
      (searchForm.keywordIds && searchForm.keywordIds.length > 0) ||
      searchForm.dateFrom ||
      searchForm.dateTo ||
      searchForm.isActive !== undefined;
  };

  return (
    <Card className="mb-6 shadow-sm blog-search-filter">
      <div className="space-y-4">
        {/* Quick Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 search-input-container">
            <Input
              placeholder="Search blogs by title, content..."
              value={searchForm.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined className="text-gray-400" />}
              size="large"
            />
          </div>
          <Space>
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              loading={loading}
              className="search-button"
            >
              Search
            </Button>
            <Button
              size="large"
              icon={<ClearOutlined />}
              onClick={handleClear}
              className="clear-button"
            >
              Clear
            </Button>
          </Space>
        </div>

        {/* Advanced Filters */}
        <Collapse
          ghost
          className="advanced-filters"
          items={[
            {
              key: '1',
              label: (
                <div className="flex items-center gap-2">
                  <FilterOutlined />
                  <span>Advanced Filters</span>
                  {hasActiveFilters() && (
                    <span className="filter-badge ml-2">
                      Active
                    </span>
                  )}
                </div>
              ),
              children: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                  {/* Keywords Filter */}
                  <div>
                    <label className="filter-label">
                      Keywords
                    </label>
                    <Select
                      mode="multiple"
                      placeholder="Select keywords"
                      value={searchForm.keywordIds}
                      onChange={(value) => handleInputChange('keywordIds', value)}
                      className="w-full"
                      maxTagCount={2}
                    >
                      {keywords.map((keyword) => (
                        <Option key={keyword.keywordId} value={keyword.keywordId}>
                          {keyword.keyword}
                          <span className="text-gray-400 ml-1">({keyword.blogCount || 0})</span>
                        </Option>
                      ))}
                    </Select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="filter-label">
                      Date Range
                    </label>
                    <RangePicker
                      className="w-full"
                      onChange={handleDateRangeChange}
                      placeholder={['From Date', 'To Date']}
                    />
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="filter-label">
                      Status
                    </label>
                    <Select
                      value={searchForm.isActive === undefined ? "all" : searchForm.isActive.toString()}
                      onChange={(value) => {
                        let isActiveValue: boolean | undefined;
                        if (value === "all") {
                          isActiveValue = undefined;
                        } else {
                          isActiveValue = value === "true";
                        }
                        handleInputChange('isActive', isActiveValue);
                      }}
                      className="w-full"
                      placeholder="Select status"
                    >
                      <Option value="all">All Blogs</Option>
                      <Option value="true">Active Blogs</Option>
                      <Option value="false">Inactive Blogs</Option>
                    </Select>
                  </div>
                </div>
              )
            }
          ]}
        />
      </div>
    </Card>
  );
};

export default BlogSearchFilterFull;