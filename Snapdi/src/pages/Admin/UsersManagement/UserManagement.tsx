import { Button, Card } from "antd"
import { UserPlus } from "lucide-react"
import UsersTable from "../../../components/AdminComponents/UsersTable"
import { users } from "../../../lib/mock-data"

const UserManagement = () => {
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
    </Card>
  )
}

export default UserManagement