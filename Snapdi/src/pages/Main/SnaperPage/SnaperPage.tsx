import { useState } from 'react';
import { Form, Button, Steps, ConfigProvider, message, Result, Spin, Alert } from 'antd';
import type { SignUpFormData } from '../../../lib/types';
import SignUpLayout from './Layout';
// import * as api from './apiService';

// Import các bước
import Step1_Account from '../../../components/SignupStep/Step1_Account';
import Step2_VerifyOTP from '../../../components/SignupStep/Step2_VerifyOTP';
import Step3_Profile from '../../../components/SignupStep/Step3_Profile';
import Step4_Portfolio from '../../../components/SignupStep/Step4_Portfolio';
import Icons from '../../../components/icon';

// Cấu hình theme AntD màu xanh
const themeConfig = {
  token: {
    colorPrimary: '#22c55e', // green-500
    colorInfo: '#22c55e',
    borderRadius: 8,
  },
};

export default function Snaper() {
  const [form] = Form.useForm<SignUpFormData>();
  const [currentStep, setCurrentStep] = useState(4);
  const [role, setRole] = useState<'client' | 'photographer'>('photographer');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handler để chuyển đổi role từ Layout
  const handleRoleChange = (newRole: 'client' | 'photographer') => {
    if (newRole === role) return; // Không làm gì nếu role không đổi

    setRole(newRole);
    setCurrentStep(1);
    setIsSuccess(false);
    setApiError(null);
    form.resetFields();
    form.setFieldsValue({ role: newRole });
  };
  // Định nghĩa các trường cho từng bước để validate
  const stepFields = [
    [], // Step 0
    ['name', 'email', 'phone', 'password', 'confirmPassword', 'dob', 'gender'], // Step 1
    ['otp'], // Step 2
    ['locationCity', 'locationAddress', 'yearsOfExperience'], // Step 3
    ['description', 'portfolio', 'equipment'] // Step 4
  ];

  // --- LOGIC XỬ LÝ ---
  const handleSendOTP = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const email = form.getFieldValue('email');
      // await api.sendVerificationCode(email);
      message.success(`Đã gửi mã OTP đến ${email}`);
      setCurrentStep(2); // Chuyển sang bước OTP
    } catch (err: any) {
      setApiError(err.message || 'Gửi OTP thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResendingOTP(true);
    setApiError(null);
    try {
      const email = form.getFieldValue('email');
      // await api.sendVerificationCode(email);
      message.success(`Đã gửi lại mã OTP đến ${email}`);
    } catch (err: any) {
      setApiError(err.message || 'Gửi lại OTP thất bại.');
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleVerifyOTPAndRegister = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      // const { email, otp } = form.getFieldsValue(['email', 'otp']);
      // await api.verifyEmailCode(email, otp);

      // Xác thực thành công, giờ đăng ký
      // const allFormData = form.getFieldsValue();

      if (role === 'client') {
        // --- Flow đăng ký Client ---
        // await api.registerClient(allFormData);
        message.success('Đăng ký Client thành công!');
        setIsSuccess(true);
      } else {
        // --- Flow Photographer ---
        // Chỉ chuyển bước, chưa đăng ký
        message.success('Xác thực Email thành công! Vui lòng điền thêm thông tin.');
        setCurrentStep(3); // Chuyển sang bước Profile
      }
    } catch (err: any) {
      setApiError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotographerSubmit = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      // const formData = form.getFieldsValue();
      // await api.registerPhotographer(formData);
      message.success('Đăng ký Photographer thành công!');
      setIsSuccess(true);
    } catch (err: any) {
      setApiError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- LOGIC NÚT BẤM ---

  const onNext = async () => {
    try {
      await form.validateFields(stepFields[currentStep]);
      setApiError(null);

      // Logic chuyển bước
      if (currentStep === 1) {
        // Sau bước 1 là gửi OTP
        await handleSendOTP();
      } else if (currentStep === 2) {
        // Sau bước 2 là xác thực OTP và phân nhánh
        await handleVerifyOTPAndRegister();
      } else if (currentStep < 3) {
        // Bước 3 -> 4
        setCurrentStep(s => s + 1);
      } else if (currentStep === 3 && role === 'photographer') {
        setCurrentStep(s => s + 1);
      }
    } catch (err) {
      console.log('Validate Failed:', err);
      // Lỗi validation, không làm gì cả
    }
  };

  const onBack = () => {
    setApiError(null);
    // Không cho back từ OTP về form (vì đã gửi mã)
    if (currentStep === 2) return;
    setCurrentStep(s => s - 1);
  };

  // --- RENDER ---

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1_Account />;
      case 2: return <Step2_VerifyOTP onResend={handleResendOTP} isResending={isResendingOTP} />;
      case 3: return <Step3_Profile />;
      case 4: return <Step4_Portfolio />;
      default: return <div>Lỗi</div>;
    }
  };

  const getStepItems = () => {
    const steps = [
      { title: 'Tài khoản' },
      { title: 'Xác thực' },
    ];
    if (role === 'photographer') {
      steps.push({ title: 'Hồ sơ' });
      steps.push({ title: 'Tác phẩm' });
    }
    return steps;
  };

  const currentStepIndex = role === 'client' ? currentStep - 1 : currentStep - 1;
  const totalSteps = role === 'client' ? 2 : 4;

  // Giao diện thành công
  if (isSuccess) {
    return (
      <SignUpLayout currentRole={role} onRoleChange={handleRoleChange}>
        <Result
          status="success"
          title="Đăng ký thành công!"
          subTitle={`Chào mừng ${form.getFieldValue('name')} đến với Snaper. Bạn có thể đăng nhập ngay bây giờ.`}
          extra={[
            <Button type="primary" key="login">
              Đi đến Đăng nhập
            </Button>,
          ]}
        />
      </SignUpLayout>
    );
  }

  // Giao diện Form
  return (
    <div className="bg-linear-60 bg-gradient-to-tr from-[#032C24] to-[#0A9276] min-h-screen flex items-center justify-center p-4">
      <ConfigProvider theme={themeConfig} >
        <SignUpLayout currentRole={role} onRoleChange={handleRoleChange}>
          <Spin spinning={isLoading} tip="Đang xử lý...">
            {/* Chỉ hiển thị Steps sau khi đã chọn vai trò */}
            <Steps
              current={currentStepIndex}
              items={getStepItems()}
              className="mb-8"
              size="small"
            />


            <Form
              form={form}
              layout="vertical"
              onFinish={handlePhotographerSubmit} // Chỉ kích hoạt ở bước cuối
              className="flex flex-col flex-grow h-full"
            >
              {/* Vùng nội dung của step, 'flex-grow' để đẩy nút bấm xuống dưới */}
              <div className="flex-grow">
                {renderStepContent()}
              </div>

              {/* Hiển thị lỗi API */}
              {apiError && (
                <Alert message={apiError} type="error" showIcon className="mt-4" />
              )}

              {/* Nút điều hướng (ẩn ở bước 0) */}
              <div className="flex justify-end items-center mt-6">

                {/* Nút Next / Submit */}
                {currentStep < totalSteps ? (
                  <Button
                    onClick={onNext}
                    loading={isLoading}
                    className='rounded-full! w-16! h-16! bg-[#34D399]! text-white! hover:scale-105! transition-transform!'
                  >
                    <Icons.ArrowRight className='w-14 h-14' />
                  </Button>
                ) : (
                  // Nút Submit ở bước cuối
                  <Button
                    type="primary"
                    htmlType="submit" // Kích hoạt onFinish
                    loading={isLoading}
                  >
                    Hoàn tất Đăng ký
                  </Button>
                )}
              </div>
            </Form>
          </Spin>
        </SignUpLayout>
      </ConfigProvider>
    </div>
  );
}