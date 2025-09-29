import { Card, Tabs } from 'antd';
import { UserCheck, UserPlus, Users, UserX } from 'lucide-react';
// import AnalyticsCharts from '../../../components/WebtrafficChart/WebTrafficChart';
import UsersTable from '../../../components/AdminComponents/UsersTable';
import VercelAnalytics from '../../../components/AdminComponents/VercelAnalytics/VercelAnalytics';
import { users } from '../../../lib/mock-data';

const AdminDashboard = () => {
  const recentSignups = users.slice(0, 5);

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

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '📊 Analytics Overview',
            children: (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-full">
                  <VercelAnalytics />
                </div>
                <div>
                  <Card title={
                    <div>
                      <span className="font-headline">Recent Sign-ups</span>
                      <div className="text-xs text-muted-foreground">The latest users to join the platform.</div>
                    </div>
                  }>
                    <UsersTable users={recentSignups} />
                  </Card>
                </div>
              </div>
            ),
          },
          {
            key: '2',
            label: '📈 Quick Stats',
            children: (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {analyticsData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Card key={index}>
                      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="text-sm font-medium">{item.label}</div>
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">
                          {item.change} from last month
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ),
          },
        ]}
      />
    </div >
  );
}

export default AdminDashboard