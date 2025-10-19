import React from 'react';
import { Button, Table, Avatar, Upload } from 'antd';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { User } from '../../lib/types';
import { getSignature, confirmUpload } from '../../services/mediaService';

export interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onView?: (user: User) => void;
}


// columns definition moved inside UsersTable component

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onDelete,
  onView
}) => {
  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (record: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record.avatarUrl}
            alt={record.name}
            size={40}
          >
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-medium text-sm">{record.name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'roleName',
      key: 'roleName',
      render: (roleName: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleName === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
          roleName === 'PHOTOGRAPHER' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
          {roleName}
        </span>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (record: User) => (
        <div className="text-sm">
          <div>{record.phone || 'N/A'}</div>
          <div className="text-gray-500">{record.locationCity || 'N/A'}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: User) => (
        <div className="flex flex-col space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {record.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.isVerify ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
            {record.isVerify ? 'Verified' : 'Unverified'}
          </span>
        </div>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <div className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
        <div className="flex space-x-2">
          {onView && (
            <Button
              type="text"
              size="small"
              icon={<Eye className="w-4 h-4" />}
              onClick={() => onView(record)}
              className="text-blue-600 hover:text-blue-800"
            />
          )}
          {onEdit && (
            <Button
              type="text"
              size="small"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => onEdit(record)}
              className="text-green-600 hover:text-green-800"
            />
          )}
          {onDelete && (
            <Button
              type="text"
              size="small"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => onDelete(record)}
              className="text-red-600 hover:text-red-800"
            />
          )}
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={async ({ file, onSuccess, onError }) => {
              try {
                const sigRes = await getSignature({ entityType: 'user', entityId: record.userId, role: 'avatar' });
                const sig = sigRes.data;
                const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;
                const publicId = `${sig.folder}/user/${record.userId}/avatar-${Date.now()}`;
                const fd = new FormData();
                fd.append('file', file as File);
                fd.append('api_key', sig.apiKey);
                fd.append('timestamp', String(sig.timestamp));
                fd.append('signature', sig.signature);
                fd.append('folder', sig.folder);
                fd.append('public_id', publicId);
                if (sig.eager) fd.append('eager', sig.eager);
                const resp = await fetch(url, { method: 'POST', body: fd });
                if (!resp.ok) throw new Error('Upload failed');
                const up = await resp.json();
                await confirmUpload({
                  entityType: 'user',
                  entityId: record.userId,
                  role: 'avatar',
                  public_id: up.public_id,
                  secure_url: up.secure_url,
                  width: up.width,
                  height: up.height,
                });
                onSuccess && onSuccess({}, new XMLHttpRequest());
              } catch (e) {
                onError && onError(e as any);
              }
            }}
          >
            <Button type="text" size="small">Update Avatar</Button>
          </Upload>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={users || []} // Ensure dataSource is always an array
        rowKey="userId"
        pagination={false} // Pagination handled by parent component
        className="w-full"
      />
    </div>
  );
};

export default UsersTable;
