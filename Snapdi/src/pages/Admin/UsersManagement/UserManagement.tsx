import { useState, useEffect } from "react";
import { Button, Card, Input, Select } from "antd";
import { UserPlus, Search } from "lucide-react";
import { UserModal } from "../../../components/AdminComponents/UserModal";
import { ConfirmationModal } from "../../../components/AdminComponents/ConfirmationModal";
import UserDetailModal from "../../../components/AdminComponents/UserDetailModal";
import { userService } from "../../../services/userService";
import { toast } from "react-toastify";
import type { User as ApiUser, UserFilterRequest, CreateUserRequest, UpdateUserRequest } from "../../../lib/types";
import UsersTable from "../../../components/AdminComponents/UsersTable";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100']
  });

  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ApiUser | null>(null);

  // Detail modal states
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [userToView, setUserToView] = useState<ApiUser | null>(null);

  // Filter states
  const [searchInput, setSearchInput] = useState<string>(''); // Separate search input state
  const [filters, setFilters] = useState<UserFilterRequest>({
    page: 1,
    pageSize: 10,
    searchTerm: '',
    roleId: undefined,
    isActive: undefined,
    isVerified: undefined,
    locationCity: '',
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });

  const fetchUsers = async () => {
    try {
      const response = await userService.getUsers(filters);

      if (response.success && response.data) {
        setUsers(response.data.items);
        setPagination(prev => ({
          ...prev,
          current: response.data!.currentPage,
          total: response.data!.totalItems,
          pageSize: response.data!.pageSize
        }));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if ((error as any)?.response?.status === 401) {
        toast.error('Unauthorized access. Please login again.');
      } else {
        toast.error('Failed to fetch users');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleCreateUser = async (data: CreateUserRequest) => {
    try {
      const response = await userService.createUser(data);
      if (response.success) {
        toast.success('User created successfully');
        fetchUsers();
      } else {
        toast.error('Failed to create user');
      }
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (data: UpdateUserRequest) => {
    if (!selectedUser) return;
    try {
      const response = await userService.updateUser(selectedUser.userId, data);
      if (response.success) {
        toast.success('User updated successfully');
        fetchUsers();
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await userService.deleteUser(userToDelete.userId);
      toast.success('User deleted successfully');
      fetchUsers();
      setIsConfirmModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user: ApiUser) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsUserModalOpen(true);
  };

  const handleDelete = (user: ApiUser) => {
    setUserToDelete(user);
    setIsConfirmModalOpen(true);
  };

  const handleView = (user: ApiUser) => {
    setUserToView(user);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setUserToView(null);
  };

  const handleEditFromDetail = (user: ApiUser) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsUserModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      searchTerm: searchInput,
      page: 1
    }));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setFilters({
      page: 1,
      pageSize: 10,
      searchTerm: '',
      roleId: undefined,
      isActive: undefined,
      isVerified: undefined,
      locationCity: '',
      sortBy: 'createdAt',
      sortDirection: 'desc'
    });
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setFilters(prev => ({
      ...prev,
      page,
      pageSize: pageSize || prev.pageSize
    }));
  };

  const roleOptions = [
    { value: 1, label: 'Customer' },
    { value: 2, label: 'Photographer' },
    { value: 3, label: 'Admin' }
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-gray-500">Manage your customers and photographers</p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<UserPlus className="w-4 h-4" />}
              onClick={() => {
                setSelectedUser(null);
                setIsEditing(false);
                setIsUserModalOpen(true);
              }}
            >
              Add User
            </Button>
          </div>
        }
      >
        {/* Filters */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          {/* Search Row */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search by name or email..."
              prefix={<Search className="w-4 h-4 text-gray-400" />}
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
              allowClear
              onClear={() => setSearchInput('')}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<Search className="w-4 h-4" />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              placeholder="Select Role"
              value={filters.roleId}
              onChange={(value) => handleFilterChange('roleId', value)}
              allowClear
            >
              {roleOptions.map(role => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Status"
              value={filters.isActive}
              onChange={(value) => handleFilterChange('isActive', value)}
              allowClear
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>

            <Select
              placeholder="Verification"
              value={filters.isVerified}
              onChange={(value) => handleFilterChange('isVerified', value)}
              allowClear
            >
              <Option value={true}>Verified</Option>
              <Option value={false}>Unverified</Option>
            </Select>
          </div>

          {/* Active Filters & Clear Button */}
          <div className="flex justify-between items-center">
            {filters.searchTerm && (
              <div className="text-sm text-gray-600">
                Searching for: <span className="font-medium">"{filters.searchTerm}"</span>
              </div>
            )}
            <Button onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <UsersTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to {Math.min(pagination.current * pagination.pageSize, pagination.total)} of {pagination.total} users
          </div>
          <div className="flex space-x-2">
            <Button
              disabled={pagination.current <= 1}
              onClick={() => handlePaginationChange(pagination.current - 1)}
            >
              Previous
            </Button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded">
              {pagination.current}
            </span>
            <Button
              disabled={pagination.current * pagination.pageSize >= pagination.total}
              onClick={() => handlePaginationChange(pagination.current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={async (data) => {
          if (isEditing) {
            await handleUpdateUser(data as UpdateUserRequest);
          } else {
            await handleCreateUser(data as CreateUserRequest);
          }
        }}
        user={selectedUser}
        isEditing={isEditing}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {/* User Detail Modal */}
      <UserDetailModal
        user={userToView}
        open={isDetailModalOpen}
        onClose={handleDetailModalClose}
        onEdit={handleEditFromDetail}
      />
    </div>
  );
};

export default UserManagement;