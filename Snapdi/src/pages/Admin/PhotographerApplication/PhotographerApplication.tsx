import { useCallback, useEffect, useMemo, useState } from 'react';
import { Avatar, Button, Card, DatePicker, Input, Pagination, Select, Tag } from 'antd';
import { Camera, Eye, Mail, MapPin, Phone, Star } from 'lucide-react';
import { photographerLevelOptions, type PhotographerApplicationItem, type PhotographerLevel, type PhotographerLevelOption } from '../../../utils/mock-data';
import { photographerService } from '../../../services/photographerService';
import type {
  PhotographerPendingLevelItem,
  PhotographerSearchRequest,
  PhotographerSearchSummary,
} from '../../../lib/types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import PhotographerPortfolioModal from '../../../components/PhotographerPortfolioModal/PhotographerPortfolioModal';

const PhotographerApplication = () => {
  const [searchValue, setSearchValue] = useState('');
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'with' | 'without'>('all');
  const [filters, setFilters] = useState<PhotographerSearchRequest>({
    pageNumber: 1,
    pageSize: 6,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  });
  const [photographers, setPhotographers] = useState<PhotographerApplicationItem[]>([]);
  const [summary, setSummary] = useState<PhotographerSearchSummary | null>(null);
  const [pagination, setPagination] = useState({ current: filters.pageNumber ?? 1, pageSize: filters.pageSize ?? 6, total: 0 });
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState<PhotographerApplicationItem | null>(null);

  const levelOptions = useMemo<PhotographerLevelOption[]>(() => photographerLevelOptions, []);
  const levelSelectOptions = useMemo(() => levelOptions.map(({ label, value }) => ({ label, value })), [levelOptions]);
  const levelDisplayMap = useMemo<Record<string, PhotographerLevel>>(() => {
    const map: Record<string, PhotographerLevel> = {};
    levelOptions.forEach((option) => {
      map[option.apiValue] = option.value;
      map[option.value] = option.value;
    });
    map.Unassigned = map.Unassigned ?? 'Người mới';
    return map;
  }, [levelOptions]);
  const levelApiMap = useMemo<Record<PhotographerLevel, string>>(() => {
    return levelOptions.reduce((acc, option) => {
      acc[option.value] = option.apiValue;
      return acc;
    }, {} as Record<PhotographerLevel, string>);
  }, [levelOptions]);
  const yearsOfExperienceOptions = useMemo(
    () => [
      { label: 'Under 1 year', value: 'Under 1 year' },
      { label: '1-3 years', value: '1-3 years' },
      { label: '3-5 years', value: '3-5 years' },
      { label: '5+ years', value: '5+ years' },
    ],
    [],
  );
  const portfolioOptions = useMemo(
    () => [
      { label: 'All portfolios', value: 'all' },
      { label: 'With portfolio only', value: 'with' },
      { label: 'Without portfolio only', value: 'without' },
    ],
    [],
  );
  const createdFromValue = useMemo(() => (filters.createdFrom ? dayjs(filters.createdFrom) : null), [filters.createdFrom]);
  const createdToValue = useMemo(() => (filters.createdTo ? dayjs(filters.createdTo) : null), [filters.createdTo]);

  const normaliseYears = (value: PhotographerPendingLevelItem['photographerProfile'] | null | undefined): number => {
    const years = value?.yearsOfExperience;
    if (years === null || years === undefined) {
      return 0;
    }
    if (typeof years === 'number') {
      return years;
    }
    const parsed = parseFloat(years);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const toPhotographerLevel = useCallback(
    (level: string | null | undefined): PhotographerLevel => {
      if (!level || !level.trim()) {
        return 'Chưa có cấp độ';
      }
      const cleanedLevel = level.trim();
      return levelDisplayMap[cleanedLevel] ?? (cleanedLevel as PhotographerLevel) ?? '';
    },
    [levelDisplayMap],
  );

  const mapItemsToApplications = (items: PhotographerPendingLevelItem[] | undefined | null): PhotographerApplicationItem[] => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.map((item) => ({
      userId: item.userId,
      roleId: item.roleId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      isActive: item.isActive,
      isVerify: item.isVerify,
      createdAt: item.createdAt,
      locationAddress: item.locationAddress,
      locationCity: item.locationCity,
      avatarUrl: item.avatarUrl,
      equipmentDescription: item.photographerProfile?.equipmentDescription ?? 'Not provided yet.',
      yearsOfExperience: normaliseYears(item.photographerProfile),
      avgRating: item.photographerProfile?.avgRating ?? 0,
      isAvailable: item.photographerProfile?.isAvailable ?? false,
      description: item.photographerProfile?.description ?? 'No introduction has been added.',
      photographerLevel: toPhotographerLevel(item.photographerProfile?.levelPhotographer),
      photoPortfolio: (item.photoPortfolios ?? [])
        .map((portfolio) => portfolio.photoUrl)
        .filter((url): url is string => Boolean(url)),
    }));
  };

  useEffect(() => {
    let ignore = false;

    const payload: PhotographerSearchRequest = {
      ...filters,
      pageNumber: filters.pageNumber ?? 1,
      pageSize: filters.pageSize ?? 6,
      hasPortfolio:
        portfolioFilter === 'all'
          ? undefined
          : portfolioFilter === 'with',
    };

    const fetchPhotographers = async () => {
      try {
        const response = await photographerService.searchPhotographers(payload);

        if (!ignore && response.success && response.data) {
          const data = response.data;
          const mapped = mapItemsToApplications(data.data);

          setPhotographers(mapped);
          setSummary(data.summary ?? null);
          setPagination({
            current: data.pageNumber ?? payload.pageNumber ?? 1,
            pageSize: data.pageSize ?? payload.pageSize ?? 6,
            total: data.totalRecords ?? mapped.length,
          });
        }
      } catch (error) {
        if (!ignore) {
          setPhotographers([]);
          setSummary(null);
          setPagination({
            current: payload.pageNumber ?? 1,
            pageSize: payload.pageSize ?? 6,
            total: 0,
          });
        }
      }
    };

    void fetchPhotographers();

    return () => {
      ignore = true;
    };
  }, [filters, portfolioFilter]);

  const handleLevelChange = async (userId: number, level: PhotographerLevel) => {
    const previousLevel = photographers.find((item) => item.userId === userId)?.photographerLevel ?? '';
    setPhotographers((prev: PhotographerApplicationItem[]) =>
      prev.map((item: PhotographerApplicationItem) =>
        item.userId === userId
          ? {
              ...item,
              photographerLevel: level as PhotographerLevel,
            }
          : item,
      ),
    );

    const payloadLevel = levelApiMap[level] ?? level;

    const response = await photographerService.updatePhotographerLevel(userId, payloadLevel);
    console.log('Update level response:', response);
    if (response.success !== true) {
      toast.error('Failed to update photographer level');
      setPhotographers((prev: PhotographerApplicationItem[]) =>
        prev.map((item: PhotographerApplicationItem) =>
          item.userId === userId
            ? {
                ...item,
                photographerLevel: previousLevel as PhotographerLevel,
              }
            : item,
        ),
      );
    }
  };


  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFilters((prev) => ({
      ...prev,
      pageNumber: 1,
      searchTerm: value.trim() ? value.trim() : undefined,
    }));
  };

  const handlePortfolioFilter = (value: 'all' | 'with' | 'without') => {
    setPortfolioFilter(value);
    setFilters((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  };

  const handleYearsOfExperienceChange = (value?: string | null) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: 1,
      yearsOfExperience: value ?? undefined,
    }));
  };

  const handleCreatedFromChange = (date: Dayjs | null) => {
    setFilters((prev) => {
      const nextCreatedFrom = date ? date.startOf('day') : null;
      const formattedCreatedFrom = nextCreatedFrom ? nextCreatedFrom.toISOString() : undefined;
      const shouldClearCreatedTo = Boolean(
        formattedCreatedFrom && prev.createdTo && dayjs(prev.createdTo).isBefore(formattedCreatedFrom),
      );

      return {
        ...prev,
        pageNumber: 1,
        createdFrom: formattedCreatedFrom,
        createdTo: shouldClearCreatedTo ? undefined : prev.createdTo,
      };
    });
  };

  const handleCreatedToChange = (date: Dayjs | null) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: 1,
      createdTo: date ? date.endOf('day').toISOString() : undefined,
    }));
  };

  const handleSortDirectionChange = (value: 'asc' | 'desc') => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: 1,
      sortDirection: value,
    }));
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: pageSize && pageSize !== prev.pageSize ? 1 : page,
      pageSize: pageSize ?? prev.pageSize,
    }));
  };

  const handleOpenPortfolioModal = (photographer: PhotographerApplicationItem) => {
    setSelectedPhotographer(photographer);
    setPortfolioModalOpen(true);
  };

  const handleClosePortfolioModal = () => {
    setPortfolioModalOpen(false);
    setSelectedPhotographer(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <p className=" text-slate-500">
            Review, promote, and approve availability for new photographers on Snapdi.
          </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input.Search
            placeholder="Search by name, email, city, or keywords"
            className="w-full sm:w-72"
            allowClear
            value={searchValue}
            onChange={(evt) => {
              const { value } = evt.target;
              setSearchValue(value);
              if (!value) {
                handleSearch('');
              }
            }}
            onSearch={handleSearch}
          />
          <Select
            className="w-full sm:w-48"
            value={portfolioFilter}
            onChange={(value) => handlePortfolioFilter(value as 'all' | 'with' | 'without')}
            options={portfolioOptions}
          />
          <Select
            className="w-full sm:w-48"
            value={filters.sortDirection}
            onChange={(value) => handleSortDirectionChange(value as 'asc' | 'desc')}
            options={[
              { label: 'Newest applications', value: 'desc' },
              { label: 'Oldest applications', value: 'asc' },
            ]}
          />
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          allowClear
          placeholder="Years of experience"
          className="w-full"
          value={filters.yearsOfExperience}
          options={yearsOfExperienceOptions}
          onChange={(value) => handleYearsOfExperienceChange(typeof value === 'string' ? value : undefined)}
          onClear={() => handleYearsOfExperienceChange(undefined)}
        />
        <DatePicker
          className="w-full"
          allowClear
          placeholder="Created from"
          value={createdFromValue}
          onChange={(date) => handleCreatedFromChange(date)}
        />
        <DatePicker
          className="w-full"
          allowClear
          placeholder="Created to"
          value={createdToValue}
          onChange={(date) => handleCreatedToChange(date)}
          disabledDate={(current) => {
            return Boolean(createdFromValue && current && current.isBefore(createdFromValue, 'day'));
          }}
        />
      </section>

      {summary && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total Photographers</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.totalPhotographers}</p>
          </Card>
          <Card className="border border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Currently Available</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.availableCount}</p>
            <p className="text-xs text-slate-500">
              {summary.totalPhotographers && summary.totalPhotographers > 0
                ? `${Math.round((summary.availableCount / summary.totalPhotographers) * 100)}% of total`
                : 'No availability data yet'}
            </p>
          </Card>
          <Card className="border border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Verified Photographers</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.verifiedCount}</p>
            <p className="text-xs text-slate-500">
              {summary.totalPhotographers && summary.totalPhotographers > 0
                ? `${Math.round((summary.verifiedCount / summary.totalPhotographers) * 100)}% verified`
                : 'No verification data yet'}
            </p>
          </Card>
          <Card className="border border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Portfolio Coverage</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.withPortfolioCount}</p>
            <p className="text-xs text-slate-500">
              Avg rating {summary.averageRating?.toFixed(2) ?? '0.00'} | {summary.mostCommonLocation ?? 'No top location'}
            </p>
          </Card>
        </section>
      )}

      <section className="grid gap-5 xl:grid-cols-2">
        {photographers.map((photographer: PhotographerApplicationItem) => (
          <Card key={photographer.userId} className="border border-slate-100 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex flex-col items-center gap-3 text-center lg:w-40">
                <Avatar size={96} src={photographer.avatarUrl} alt={photographer.name} className="shadow-sm" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{photographer.name}</h2>
                  <div className="flex items-center justify-center gap-1 text-sm text-amber-500">
                    <Star className="h-4 w-4" />
                    <span>{photographer.avgRating.toFixed(2)}</span>
                  </div>
                </div>
                <Tag color={photographer.isVerify ? 'green' : 'orange'} className="rounded-full px-4 text-xs font-medium">
                  {photographer.isVerify ? 'Verified ID' : 'Pending Verification'}
                </Tag>
                <Tag color={photographer.photoPortfolio.length > 0 ? 'blue' : 'default'} className="rounded-full px-4 text-xs font-medium">
                  {photographer.photoPortfolio.length > 0 ? 'Portfolio submitted' : 'No portfolio yet'}
                </Tag>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      <Camera className="h-4 w-4" /> Equipment
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{photographer.equipmentDescription}</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="text-sm text-slate-500">Experience</p>
                    <p className="text-lg font-semibold text-slate-900">{photographer.yearsOfExperience} years</p>
                    <p className="text-xs text-slate-500">Joined {new Date(photographer.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-100 bg-white p-3">
                  <p className="text-sm text-slate-600">About</p>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{photographer.description}</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" /> {photographer.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" /> {photographer.phone}
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                      <span>
                        {photographer.locationAddress}
                        <br />
                        {photographer.locationCity}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-500">Photographer Level</label>
                    {photographer.photoPortfolio.length > 0 ? (
                      <Select
                        value={photographer.photographerLevel || undefined}
                        onChange={(value: PhotographerLevel) => {
                          void handleLevelChange(photographer.userId, value);
                        }}
                        options={levelSelectOptions}
                      />
                    ) : (
                      <Select
                        value={photographer.photographerLevel || undefined}
                        placeholder="Chọn cấp độ"
                        onChange={(value: PhotographerLevel) => {
                          void handleLevelChange(photographer.userId, value);
                        }}
                        options={levelSelectOptions}
                        disabled
                      />
                    )}
                  </div>


                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Portfolio Preview</p>
                  {photographer.photoPortfolio.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        {photographer.photoPortfolio.slice(0, 3).map((photoUrl: string, index: number) => (
                          <div key={`${photographer.userId}-${photoUrl}`} className="group relative overflow-hidden rounded-lg border border-slate-200">
                            <img
                              src={photoUrl}
                              alt={`${photographer.name} portfolio ${index + 1}`}
                              className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                      {photographer.photoPortfolio.length > 3 && (
                        <Button
                          type="link"
                          icon={<Eye className="h-4 w-4" />}
                          onClick={() => handleOpenPortfolioModal(photographer)}
                          className="w-full text-sm"
                        >
                          Xem tất cả {photographer.photoPortfolio.length} ảnh
                        </Button>
                      )}
                      {photographer.photoPortfolio.length <= 3 && photographer.photoPortfolio.length > 0 && (
                        <Button
                          type="link"
                          icon={<Eye className="h-4 w-4" />}
                          onClick={() => handleOpenPortfolioModal(photographer)}
                          className="w-full text-sm"
                        >
                          Xem chi tiết portfolio
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 rounded-lg border border-dashed border-slate-200 bg-white p-4 text-center text-sm text-slate-500">
                      No portfolio uploaded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {photographers.length === 0 && (
          <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-center">
            <p className="text-lg font-semibold text-slate-700">No photographer matches your filters yet</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting the search terms or portfolio filter.</p>
          </div>
        )}

        {photographers.length > 0 && (
          <div className="col-span-full flex justify-end">
            <Pagination
              showSizeChanger
              pageSizeOptions={['6', '12', '24']}
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} photographers`}
            />
          </div>
        )}
      </section>

      <PhotographerPortfolioModal
        open={portfolioModalOpen}
        photographer={selectedPhotographer}
        levelOptions={levelOptions}
        onClose={handleClosePortfolioModal}
        onLevelChange={handleLevelChange}
        onPhotographerUpdate={(updatedPhotographer) => setSelectedPhotographer(updatedPhotographer)}
      />
    </div>
  );
};

export default PhotographerApplication;