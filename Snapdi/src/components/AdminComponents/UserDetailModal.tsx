import React from 'react'
import { Modal, Badge, Card, Avatar, Tag, Descriptions, Button } from 'antd';
import { users } from '../../lib/mock-data';
import { User, Mail, Calendar, Shield, UserCheck, AlertCircle, Edit, Ban } from 'lucide-react';

interface UserDetailModalProps {
  userId: number;
  visible: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ userId, visible, onClose }) => {
  const user = users.find((user) => user.userId === userId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Banned': return 'error';
      default: return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'red';
      case 'Photographer': return 'blue';
      case 'Customer': return 'green';
      default: return 'default';
    }
  };

  return (
    <Modal
      centered
      open={visible && !!user}
      title={
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold">User Details</span>
        </div>
      }
      footer={
        user ? (
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<Edit className="w-4 h-4" />}
                className="flex items-center"
              >
                Edit User
              </Button>
              <Button
                danger
                icon={<Ban className="w-4 h-4" />}
                className="flex items-center"
              >
                {/* {user.isActive === 0 ? 'Unban User' : 'Ban User'} */}
              </Button>
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : null
      }
      onCancel={onClose}
      width={850}
      className="user-detail-modal"
    >
      {user ? (
        <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
          {/* User Profile Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar
                  src={user.avatarUrl}
                  size={120}
                  className="border-4 border-white shadow-lg"
                />
                <Badge
                  status={getStatusColor(user.roleName) as any}
                  className="absolute -bottom-2 -right-2 bg-white rounded-full p-1"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag color={getRoleColor(user.roleName)} className="text-sm px-3 py-1">
                    <Shield className="w-3 h-3 inline mr-1" />
                    {user.roleName}
                  </Tag>
                  <Badge
                    status={getStatusColor(user.isActive === false ? 'Active' : user.isActive === true ? 'Pending' : 'Banned') as any}
                    text={
                      <span className={`font-medium ${user.isActive === false ? 'text-green-600' :
                        user.isActive === true ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                        {user.isActive === false ? 'Active' : user.isActive === true ? 'Pending' : 'Banned'}
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* User Information */}
          <Card title={
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Account Information</span>
            </div>
          }>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="User ID" span={1}>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{user.userId}</code>
              </Descriptions.Item>
              <Descriptions.Item label="Display Name" span={1}>
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email Address" span={1}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {user.email}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Account Role" span={1}>
                <Tag color={getRoleColor(user.roleName)} className="text-sm">
                  <Shield className="w-3 h-3 inline mr-1" />
                  {user.roleName}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Account Status" span={1}>
                <Badge
                  status={getStatusColor(user.isActive === false ? 'Active' : user.isActive === true ? 'Pending' : 'Banned') as any}
                  text={
                    <span className={`font-medium ${user.isActive === false ? 'text-green-600' :
                      user.isActive === true ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                      {user.isActive === false ? 'Active' : user.isActive === true ? 'Pending' : 'Banned'}
                    </span>
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Join Date" span={1}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {user.createdAt}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Profile Image Information */}
          <Card title={
            <div className="flex items-center gap-2">
              <img className="w-5 h-5" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E" alt="Profile" />
              <span>Profile Information</span>
            </div>
          }>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={user.avatarUrl}
                    alt={`${user.name} profile`}
                    className="w-24 h-24 rounded-lg object-cover border border-gray-200 shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2">Profile Picture</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Description:</strong> {user.name}'s profile picture.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Avatar URL:</strong>
                    <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs break-all">
                      {user.avatarUrl }
                    </code>
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">User Not Found</h3>
          <p className="text-gray-500">The requested user could not be located in the system.</p>
        </div>
      )}
    </Modal>
  )
}

export default UserDetailModal