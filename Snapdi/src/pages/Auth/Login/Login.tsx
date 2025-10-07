import React, { useState } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, type LoginRequest } from '../../../services/authService';
import { useUserStore } from '../../../config/zustand';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const setLoginData = useUserStore((state) => state.setLoginData);

  const handleLogin = async (values: LoginRequest) => {
    try {
      setError('');

      const response = await loginUser(values);

      // Save user data to Zustand store
      setLoginData(response);

      toast.success('Login successful!');

      // Navigate to admin dashboard
      navigate('/admin');

    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      toast.error(err.message || 'Login failed. Please try again.');
    }
  };

  const onFormSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-800">
        <div className="absolute inset-0 bg-[#34D399] bg-opacity-10 backdrop-blur-sm"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(52, 211, 153, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(4, 120, 87, 0.2) 0%, transparent 50%)
            `
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto animate-fade-in">
        <div className="bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-20 p-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full text-white text-3xl font-bold shadow-lg shadow-emerald-400/40">
                <span>S</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              Welcome to Snapdi
            </h1>
            <p className="text-gray-600 text-base">Sign in to your admin account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
              className="mb-5 rounded-lg"
            />
          )}

          {/* Form */}
          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            onSubmitCapture={onFormSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="emailOrPhone"
              label={<span className="text-gray-700 font-semibold text-sm">Email or Phone Number</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input your email or phone number!',
                },
                {
                  pattern: /^([^\s@]+@[^\s@]+\.[^\s@]+)|(\+?[\d\s\-\(\)]+)$/,
                  message: 'Please enter a valid email or phone number!',
                },
              ]}
              className="mb-5"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 text-base" />}
                placeholder="Enter your email or phone number"
                size="large"
                className="rounded-xl border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20 transition-all duration-300 text-base py-3 px-4"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-gray-700 font-semibold text-sm">Password</span>}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
              ]}
              className="mb-8"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 text-base" />}
                placeholder="Enter your password"
                size="large"
                className="rounded-xl border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/20 transition-all duration-300 text-base"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone className="text-emerald-500" /> : <EyeInvisibleOutlined className="text-gray-400" />
                }
              />
            </Form.Item>

            <Form.Item className="mb-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-600 hover:to-emerald-800 border-none rounded-xl text-base font-semibold shadow-lg shadow-emerald-400/40 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                block
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">© 2025 Snapdi. All rights reserved.</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Login;