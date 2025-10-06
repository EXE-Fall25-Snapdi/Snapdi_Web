import React from 'react'
import { Modal, Badge, Card, Avatar, Tag, Descriptions, Button } from 'antd';
import { User, Mail, Calendar, Shield, UserCheck, AlertCircle, Edit, Ban } from 'lucide-react';
import type { User as ApiUser } from '../../lib/types';

interface UserDetailModalProps {
  user: ApiUser | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (user: ApiUser) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, open, onClose, onEdit }) => {

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
      open={open && !!user}
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
                onClick={() => onEdit?.(user)}
              >
                Edit User
              </Button>
              <Button
                danger
                icon={<Ban className="w-4 h-4" />}
                className="flex items-center"
              >
                {user.isActive ? 'Ban User' : 'Activate User'}
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
                  status={user.isActive ? 'success' : 'error'}
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
                    status={user.isActive ? 'success' : 'error'}
                    text={
                      <span className={`font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
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
              <Descriptions.Item label="Display Name" span={1}>
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email Address" span={1}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {user.email}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={1}>
                {user.phone || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Account Role" span={1}>
                <Tag color={getRoleColor(user.roleName)} className="text-sm">
                  <Shield className="w-3 h-3 inline mr-1" />
                  {user.roleName}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Account Status" span={1}>
                <Badge
                  status={user.isActive ? 'success' : 'error'}
                  text={
                    <span className={`font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Email Verified" span={1}>
                <Badge
                  status={user.isVerify ? 'success' : 'warning'}
                  text={
                    <span className={`font-medium ${user.isVerify ? 'text-green-600' : 'text-yellow-600'}`}>
                      {user.isVerify ? 'Verified' : 'Not Verified'}
                    </span>
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={1}>
                {user.locationCity ? `${user.locationAddress || ''}, ${user.locationCity}` : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Join Date" span={1}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Card>
          {/* Additional Information Section (if needed in future) */}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>No user data available.</p>
        </div>
      )}
    </Modal>
  )
}

export default UserDetailModal