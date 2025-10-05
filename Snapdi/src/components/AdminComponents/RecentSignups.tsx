import React, { useState, useEffect } from 'react';
import { Card, Button, Avatar } from 'antd';
import { UserPlus, Eye } from 'lucide-react';
import { UserModal } from './UserModal';
import { ConfirmationModal } from './ConfirmationModal';
import { userService } from '../../services/userService';
import type { User as ApiUser, UserFilterRequest, CreateUserRequest, UpdateUserRequest } from '../../lib/types';
import { toast } from 'react-toastify';

interface RecentSignupsProps {
  limit?: number;
}

export const RecentSignups: React.FC<RecentSignupsProps> = ({ limit = 5 }) => {
  const [users, setUsers] = useState<ApiUser[]>([]);

  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ApiUser | null>(null);

  const fetchRecentUsers = async () => {
    try {
      const filters: UserFilterRequest = {
        page: 1,
        pageSize: limit,
        sortBy: 'createdAt',
        sortDirection: 'desc'
      };

      const response = await userService.getUsers(filters);

      if (response.success && response.data) {
        setUsers(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching recent users:', error);
    }
  };

  useEffect(() => {
    fetchRecentUsers();
  }, [limit]);

  const handleCreateUser = async (data: CreateUserRequest) => {
    try {
      const response = await userService.createUser(data);
      if (response.success) {
        toast.success('User created successfully');
        fetchRecentUsers();
      } else {
        toast.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (data: UpdateUserRequest) => {
    if (!selectedUser) return;
    try {
      const response = await userService.updateUser(selectedUser.userId, data);
      if (response.success) {
        toast.success('User updated successfully');
        fetchRecentUsers();
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
      fetchRecentUsers();
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

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Photographer':
        return 'bg-blue-100 text-blue-800';
      case 'Customer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Sign-ups</h3>
            <Button
              type="primary"
              size="small"
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
        className="h-full"
      >
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  size={40}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.roleName)}`}>
                      {user.roleName}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <div className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-1">
                  <Button
                    type="text"
                    size="small"
                    icon={<Eye className="w-3 h-3" />}
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  />
                  <Button
                    type="text"
                    size="small"
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>No recent sign-ups</p>
            </div>
          )}
        </div>
      </Card>

      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={async (data: CreateUserRequest | UpdateUserRequest) => {
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
    </>
  );
};