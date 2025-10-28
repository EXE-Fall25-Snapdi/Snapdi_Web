import { useState } from 'react';
import { Form, Button, ConfigProvider, message, Result } from 'antd';
import type { SignUpFormData } from '../../../lib/types';
import type { UploadFile } from 'antd/es/upload/interface';
import SignUpLayout from './Layout';
import {
  sendVerificationCode,
  registerClient,
  registerPhotographer,
  verifyEmailCode,
  loginUser,
} from '../../../services/authService';
import { cloudinaryService, photoPortfolioService } from '../../../services/uploadService';
import { photographerStyleService } from '../../../services/photographerStyleService';
import { useLoadingStore, useUserStore } from '../../../config/zustand';

// Import các bước
import Step1_Account from '../../../components/SignupStep/Step1_Account';
import Step2_VerifyOTP from '../../../components/SignupStep/Step2_VerifyOTP';
import Step3_Profile from '../../../components/SignupStep/Step3_Profile';
import Step4_Portfolio from '../../../components/SignupStep/Step4_Portfolio';
import Icons from '../../../components/icon';
import { toast } from 'react-toastify';
import Step5_PortfolioPhoto from '../../../components/SignupStep/Step5_PortfolioPhoto';

// Cấu hình theme AntD màu xanh
const themeConfig = {
  token: {
    colorPrimary: '#22c55e', // green-500
    colorInfo: '#22c55e',
    borderRadius: 8,
  },
};

export default function Snaper() {
  const loading = useLoadingStore((state) => state.loading);
  const [form] = Form.useForm<SignUpFormData>();
  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState<'client' | 'photographer'>('photographer');
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>(''); // Lưu email để dùng ở Step 2

  // Get setLoginData from Zustand store
  const setLoginData = useUserStore((state) => state.setLoginData);

  // Handler để chuyển đổi role từ Layout
  const handleRoleChange = (newRole: 'client' | 'photographer') => {
    if (newRole === role) return;

    setRole(newRole);
    setCurrentStep(1);
    setIsSuccess(false);
    setRegisteredEmail(''); // Reset email khi đổi role
    form.resetFields();
    form.setFieldsValue({ role: newRole });
  };

  // Định nghĩa các trường cho từng bước để validate
  const stepFields = [
    [], // Step 0
    ['name', 'email', 'phone', 'password', 'confirmPassword', 'dob', 'gender', 'locationCity'], // Step 1
    ['otp'], // Step 2
    ['workLocation', 'yearsOfExperience'], // Step 3
    ['description', 'photographerPhotoTypes', 'equipment'], // Step 4
    ['styleIds', 'portfolio'] // Step 5
  ];

  // --- LOGIC XỬ LÝ ---
  const handleClientRegister = async () => {
    try {
      const { name, email, phone, password } = form.getFieldsValue([
        'name', 'email', 'phone', 'password'
      ]);

      // Lưu email để dùng ở Step 2
      setRegisteredEmail(email);

      // Register client - Backend will automatically send OTP
      await registerClient({
        name,
        email,
        phone,
        password,
        roleId: 2,
      });

      // message.success(`Đăng ký thành công! Mã OTP đã được gửi đến ${email}`);
      setCurrentStep(2); // Go to OTP verification
    } catch (err: any) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  const handleResendOTP = async () => {
    setIsResendingOTP(true);
    try {
      // Dùng email đã lưu thay vì lấy từ form
      await sendVerificationCode(registeredEmail);
      message.success(`Đã gửi lại mã OTP đến ${registeredEmail}`);
    } catch (err: any) {
      toast.error(err.message || 'Gửi lại OTP thất bại.');
    } finally {
      setIsResendingOTP(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const { email, otp, password } = form.getFieldsValue(['email', 'otp', 'password']);

      // 1. Verify email with OTP
      await verifyEmailCode({ email, code: otp });
      message.success('Xác thực thành công!');

      // 2. If photographer, auto-login to get token for portfolio upload
      if (role === 'photographer') {
        try {
          // Login to get token
          const loginResponse = await loginUser({
            emailOrPhone: email,
            password: password,
          });

          // Save token to Zustand store (will auto-persist to localStorage)
          setLoginData(loginResponse);

          message.success('Đã đăng nhập tự động!');
          setCurrentStep(5); // Go to upload portfolio
        } catch (loginErr: any) {
          console.error('Auto-login failed:', loginErr);
          // If auto-login fails, still show success but ask to login manually
          message.warning('Vui lòng đăng nhập để tiếp tục upload portfolio');
          setIsSuccess(true);
        }
      } else {
        // Client is done
        setIsSuccess(true);
      }
    } catch (err: any) {
      toast.error(err.message || 'Xác thực OTP thất bại. Vui lòng thử lại.');
    }
  };
  const handlePortfolioUpload = async () => {
    try {
      const formData = form.getFieldsValue();
      const currentUser = useUserStore.getState().user;

      if (!currentUser?.id) {
        message.error('Không tìm thấy thông tin người dùng');
        return;
      }

      // 1. Add styles to photographer
      const styleIds = (formData.styleIds as number[]) || [];
      if (styleIds.length > 0) {
        try {
          await photographerStyleService.addMultipleStyles(currentUser.id, styleIds);
          message.success(`Đã thêm ${styleIds.length} thể loại thành công!`);
        } catch (styleErr) {
          console.error('Add styles failed:', styleErr);
          message.warning('Không thể thêm thể loại. Bạn có thể thêm sau.');
        }
      }

      // 2. Upload portfolio images to Cloudinary
      const portfolioFiles = (formData.portfolio as UploadFile[]) || [];
      const filesToUpload = portfolioFiles
        .map(file => file.originFileObj as File)
        .filter(file => file !== undefined);

      let portfolioPublicIds: string[] = [];

      if (filesToUpload.length > 0) {
        const uploadResult = await cloudinaryService.uploadMultiple(
          filesToUpload,
          'portfolio'
        );
        portfolioPublicIds = uploadResult.successfulUploads.map(
          upload => upload.publicId
        );

        if (uploadResult.failureCount > 0) {
          message.warning(
            `${uploadResult.successCount}/${uploadResult.totalProcessed} ảnh được tải lên thành công`
          );
        }
      }
      // 3. Create photo portfolios if we have uploaded images
      if (portfolioPublicIds.length > 0) {
        try {
          await photoPortfolioService.createMultiple(portfolioPublicIds);
          message.success('Upload portfolio thành công!');
        } catch (portfolioErr) {
          console.error('Portfolio creation failed:', portfolioErr);
          message.warning('Không thể lưu portfolio. Bạn có thể thêm sau.');
        }
      }

      // 4. Registration complete
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message || 'Upload thất bại. Vui lòng thử lại.');
    }
  };


  const handlePhotographerSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      console.log('All form data:', formData);
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      console.log('LocationCity:', formData.locationCity);
      console.log('WorkLocation:', formData.workLocation);
      console.log('PhotographerPhotoTypes:', formData.photographerPhotoTypes);

      // Lưu email để dùng ở Step 2
      setRegisteredEmail(formData.email);

      // Build equipment description from selected equipment
      const equipmentDescription = (formData.equipment as string[])?.join(', ') || '';

      // Use photographerPhotoTypes directly from form data and remove duplicates
      const photographerPhotoTypesRaw = (formData.photographerPhotoTypes as Array<{
        photoTypeId: number;
        photoPrice: number;
        time?: number;
      }> || []);

      // Remove duplicates based on photoTypeId
      const uniquePhotoTypes = photographerPhotoTypesRaw.reduce((acc, item) => {
        const exists = acc.find(x => x.photoTypeId === item.photoTypeId);
        if (!exists) {
          acc.push({
            photoTypeId: item.photoTypeId,
            photoPrice: item.photoPrice,
            time: item.time || 0
          });
        }
        return acc;
      }, [] as Array<{ photoTypeId: number; photoPrice: number; time: number }>);

      const photographerPhotoTypes = uniquePhotoTypes;

      // Build photographer data matching new API format
      const photographerData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        locationAddress: formData.locationAddress || undefined,
        locationCity: formData.locationCity, // From Step 1
        workLocation: formData.workLocation, // From Step 3
        yearsOfExperience: formData.yearsOfExperience + ' năm' || '0 năm',
        equipmentDescription: equipmentDescription,
        description: formData.description || undefined,
        isAvailable: false, // Default to false, admin will approve
        photographerPhotoTypes: photographerPhotoTypes,
        photographerStyleIds: (formData.styleIds as number[]) || [],
        avatarUrl: undefined, // Leave empty for later update
      };

      console.log('Photographer data to send:', photographerData);

      const check = await registerPhotographer(photographerData);
      if (check.success == true) {
        setCurrentStep(2);
      }
    } catch (err: any) {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  // --- LOGIC NÚT BẤM ---

  const onNext = async () => {
    try {
      // Validate fields for current step
      await form.validateFields(stepFields[currentStep]);
      // Logic chuyển bước
      if (currentStep === 1) {
        // Step 1: Account Info
        if (role === 'client') {
          // Client registers immediately with all required fields
          await handleClientRegister();
        } else {
          // Photographer skips to step 3 (Profile) to collect more data
          setCurrentStep(3);
        }
      } else if (currentStep === 2) {
        // Step 2: OTP Verification (for both client and photographer)
        await handleVerifyOTP();
      } else if (currentStep === 3 && role === 'photographer') {
        // Step 3: Profile Info (photographer only)
        setCurrentStep(4);
      } else if (currentStep === 4 && role === 'photographer') {
        // Step 4: Portfolio (photographer only)
        // This calls register API, then redirects to step 2 for OTP
        await handlePhotographerSubmit();
      } else if (currentStep === 5 && role === 'photographer') {
        // Step 5: Portfolio Photos (photographer only) - user is already logged in
        await handlePortfolioUpload();
      }
    } catch (err: any) {
      console.error('onNext error:', err);

      // If it's validation error, Ant Design will show field errors automatically
      if (err.errorFields) {
        console.log('Validation errors:', err.errorFields);
        message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
      }

      // For other errors, show in alert
      if (err.message) {
        toast.error(err.message);
      }
    }
  };

  // Back button removed from UI, kept for potential future use
  // const onBack = () => {
  //   setApiError(null);
  //   if (currentStep === 2) return;
  //   setCurrentStep(s => s - 1);
  // };

  // --- RENDER ---

  const renderStepContent = () => {
    return (
      <>
        <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
          <Step1_Account />
        </div>
        <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
          <Step2_VerifyOTP
            onResend={handleResendOTP}
            isResending={isResendingOTP}
            email={registeredEmail}
          />
        </div>
        <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
          <Step3_Profile />
        </div>
        <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
          <Step4_Portfolio />
        </div>
        <div style={{ display: currentStep === 5 ? 'block' : 'none' }}>
          <Step5_PortfolioPhoto />
        </div>
      </>
    );
  };

  // Giao diện thành công
  if (isSuccess) {
    return (
      <SignUpLayout currentRole={role} onRoleChange={handleRoleChange}>
        <Result
          status="success"
          title="Đăng ký thành công!"
          subTitle={
            role === 'photographer'
              ? `Chào mừng ${form.getFieldValue('name')} đến với Snapdi! Portfolio của bạn đã được lưu thành công.`
              : `Chào mừng ${form.getFieldValue('name')} đến với Snapdi.`
          }
          extra={[
            <Button type="primary" key="login" href='#'>
              TẢI APP NGAY HÔM NAY
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
          {/* Chỉ hiển thị Steps sau khi đã chọn vai trò */}
          <Form
            form={form}
            layout="vertical"
            className="flex flex-col flex-grow h-full"
          >

            {/* Vùng nội dung của step, 'flex-grow' để đẩy nút bấm xuống dưới */}
            <div className="flex-grow">
              {renderStepContent()}
            </div>

            {/* Nút điều hướng */}
            <div className="flex justify-end items-center mt-6">
              <Button
                disabled={loading}
                htmlType="button"
                onClick={onNext}
                className='rounded-full! w-16! h-16! bg-[#34D399]! text-white! hover:scale-105! transition-transform!'
              >
                <Icons.ArrowRight className='w-14 h-14' />
              </Button>
            </div>
          </Form>
        </SignUpLayout>
      </ConfigProvider>
    </div>
  );
}

