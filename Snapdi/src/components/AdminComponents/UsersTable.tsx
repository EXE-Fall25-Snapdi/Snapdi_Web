import React from 'react';
import { Dropdown, Table } from 'antd';
import { UserCogIcon, UserLock } from 'lucide-react';
import UserDetailModal from './UserDetailModal';

import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  users: User[];
}


// columns definition moved inside UsersTable component

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  console.log('Users data:', pageSize);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: User) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            setSelectedUser(record);
            setModalVisible(true);
          }}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joined',
      key: 'joinDate',
      // render: (date: string) => formatDate(date),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'view',
                  label: (
                    <a
                      href={`/admin/users/${record.id}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <UserCogIcon className="inline-block" />
                      View Details
                    </a>
                  ),
                },
                {
                  key: 'ban',
                  label: (
                    <a href={`/admin/users/${record.id}/ban`} className="text-red-600 hover:underline">
                      <UserLock className="inline-block" />
                      Ban
                    </a>
                  ),
                },
              ],
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <button className="border-none bg-transparent cursor-pointer p-2 text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="4" cy="10" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="16" cy="10" r="2" />
              </svg>
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        className='overflow-x-scroll'
        rowKey="id"
        columns={columns}
        dataSource={users}
        pagination={{
          onChange(_unused: number, pageSize: number) {
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100']
        }}
      />
      <UserDetailModal
        visible={modalVisible}
        userId={selectedUser?.id ?? ''}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default UsersTable;
