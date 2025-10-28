import { Form, Input, Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

type Props = {
  onResend: () => void;
  isResending: boolean;
  email: string; // Nhận email từ parent
};

export default function Step2_VerifyOTP({ onResend, isResending, email }: Props) {

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto h-full">
      <Title level={2} className="mb-4">Xác thực Email</Title>
      <Paragraph type="secondary" className="mb-6">
        Chúng tôi đã gửi một mã 6 chữ số đến <strong className="text-gray-800">{email}</strong>.
        Vui lòng nhập mã để tiếp tục.
      </Paragraph>

      <Form.Item
        name="otp"
        rules={[
          { required: true, message: 'Vui lòng nhập mã OTP!' },
          { len: 6, message: 'Mã OTP phải có 6 chữ số!' }
        ]}
      >
        <Input
          placeholder="123456"
          maxLength={6}
          size="large"
          className="text-center tracking-[0.5em]"
        />
      </Form.Item>

      <div className="mt-4 text-sm">
        <Paragraph type="secondary">
          Không nhận được mã?{' '}
          <Button
            type="link"
            onClick={onResend}
            loading={isResending}
            disabled={isResending}
          >
            {isResending ? 'Đang gửi lại...' : 'Gửi lại mã'}
          </Button>
        </Paragraph>
      </div>
    </div>
  );
}