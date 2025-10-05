import { Card } from 'antd';
import { UserCheck, UserPlus, Users, UserX } from 'lucide-react';
import { RecentSignups } from '../../../components/AdminComponents/RecentSignups';

const AdminDashboard = () => {
  const analyticsData = [
    { label: 'Total Users', value: 2350, icon: Users, change: '+180.1%' },
    { label: 'Active User', value: 540, icon: UserPlus, change: '+25.4%' },
    { label: 'Blog Posts', value: 1200, icon: UserCheck, change: '+12.3%' },
    { label: 'Organic Search', value: '5.2%', icon: UserX, change: '-1.2%' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card
            key={item.label}
            size="small"
            title={
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <span className="text-xl font-semibold">{item.label}</span>
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {/* sua lai icon */}
              </div>
            }
          >
            <div className='flex flex-col items-start'>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change} from last month</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentSignups limit={5} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard