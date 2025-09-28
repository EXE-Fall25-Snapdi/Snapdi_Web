import { Card } from "antd";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const websiteTrafficData = [
  { date: "Jan 23", desktop: 186, mobile: 80 },
  { date: "Feb 23", desktop: 305, mobile: 200 },
  { date: "Mar 23", desktop: 237, mobile: 120 },
  { date: "Apr 23", desktop: 73, mobile: 190 },
  { date: "May 23", desktop: 209, mobile: 130 },
  { date: "Jun 23", desktop: 214, mobile: 140 },
]
export default function AnalyticsCharts() {

  return (
    <Card
      className="h-full"
      title={<span className="font-headline">Website Traffic</span>}
      extra={<span>January - June 2023</span>}
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-96 w-full">
          {/* Line chart using Recharts */}
          {/* Install recharts: npm install recharts */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={websiteTrafficData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="desktop" stroke="#1890ff" name="Desktop" />
              <Line type="monotone" dataKey="mobile" stroke="#52c41a" name="Mobile" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card >
  )
}
