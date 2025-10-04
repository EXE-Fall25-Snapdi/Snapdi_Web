import { Button, Card, Pagination } from "antd"
import { UserPlus } from "lucide-react"
import UsersTable from "../../../components/AdminComponents/UsersTable"
import { users } from "../../../lib/mock-data"
import React from "react"

const UserManagement = () => {
  const [pages, setPages] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const totalPosts = users.length;
  const isSearchMode = false; // Replace with actual search mode state if applicable
  return (
    <Card title={
      <div className="flex items-center justify-between p-4">
        <div className="flex items-start flex-col">
          <p className="font-bold text-2xl">User Management</p>
          <p className="text-gray-500">Manage your customers and photographers.</p>
        </div>
        <Button size="large" className="flex items-center shadow-lg my-2">
          <UserPlus className="mr-2 h-6 w-6" />
          <span className="text-lg">Add User</span>
        </Button>
      </div>
    }>
      <UsersTable users={users} />
      <Pagination
              showSizeChanger
              pageSizeOptions={['5', '10', '20']}
              current={pages}
              pageSize={pageSize}
              total={totalPosts}
              onChange={(page, size) => {
                console.log('Pagination changed:', { page, size });
                setPages(page);
                if (size && size !== pageSize) {
                  setPageSize(size);
                  setPages(1); // Reset to first page when page size changes
                }
              }}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} ${isSearchMode ? 'results' : 'items'}`
              }
            />
    </Card>
  )
}

export default UserManagement