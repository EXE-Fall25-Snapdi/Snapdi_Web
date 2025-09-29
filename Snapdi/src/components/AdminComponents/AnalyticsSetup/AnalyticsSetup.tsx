import React, { useState } from 'react';
import { Card, Alert, Button, Input, Space, Steps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AnalyticsSetup: React.FC = () => {
  const [token, setToken] = useState('');

  const setupSteps = [
    {
      title: 'Get Vercel Access Token',
      description: 'Visit https://vercel.com/account/tokens',
    },
    {
      title: 'Create Token',
      description: 'Click "Create" and select "Full Account" scope',
    },
    {
      title: 'Add to Environment',
      description: 'Add VERCEL_ACCESS_TOKEN to your .env.local file',
    },
    {
      title: 'Deploy & Enjoy',
      description: 'Deploy to Vercel and view real analytics',
    },
  ];

  return (
    <div className="space-y-6">
      <Alert
        message="🚀 Real Vercel Analytics Setup"
        description="To view real analytics data from your deployed website https://snapdi-web.vercel.app/, please follow these steps:"
        type="info"
        showIcon
      />

      <Card title="📋 Setup Instructions">
        <Steps
          direction="vertical"
          current={-1}
          items={setupSteps}
        />
      </Card>

      <Card title="🔑 Configure Access Token">
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <p><strong>Step 1:</strong> Go to <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-[#34D399]">Vercel Account Tokens</a></p>
          </div>

          <div>
            <p><strong>Step 2:</strong> Create a new token with these settings:</p>
            <ul className="ml-4 mt-2 space-y-1">
              <li>• Token Name: "Snapdi Analytics"</li>
              <li>• Scope: "Full Account" or select your team</li>
              <li>• Expiration: "No Expiration" (recommended)</li>
            </ul>
          </div>

          <div>
            <p><strong>Step 3:</strong> Copy your token and add it to environment variables:</p>
            <Input.Password
              placeholder="Paste your Vercel access token here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />

            <div className="mt-2 p-3 bg-gray-100 rounded text-sm font-mono">
              # Add this to your .env.local file<br />
              VERCEL_ACCESS_TOKEN={token || 'your_token_here'}
            </div>
          </div>

          <div>
            <p><strong>Step 4:</strong> Deploy to Vercel</p>
            <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
              <code>git add . && git commit -m "Add Vercel Analytics" && git push</code>
            </div>
          </div>

          <Alert
            message="🔒 Security Note"
            description="Never commit your access token to git. The .env.local file is automatically ignored by git."
            type="warning"
            showIcon
          />
        </Space>
      </Card>

      <Card title="📊 What You'll Get">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-[#34D399]">📈 Real-time Metrics</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Page views & unique visitors</li>
              <li>• Top performing pages</li>
              <li>• Device & browser breakdown</li>
              <li>• Geographic data</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-bold text-[#34D399]">⚡ Live Updates</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Auto-refresh every 5 minutes</li>
              <li>• Historical data (last 7 days)</li>
              <li>• Performance insights</li>
              <li>• Custom date ranges</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button
          type="primary"
          size="large"
          className="bg-[#34D399] hover:bg-[#10B981]"
          href="https://vercel.com/account/tokens"
          target="_blank"
        >
          🚀 Get Started with Vercel Tokens
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsSetup;