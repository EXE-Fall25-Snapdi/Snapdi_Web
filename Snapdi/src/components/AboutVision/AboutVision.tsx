import { Form, Input, Button, message } from 'antd';
import logo from '../../assets/images/logo-white.svg';

const { TextArea } = Input;

interface FormValues {
  hoTen: string;
  namSinh: string;
  email: string;
  soDienThoai: string;
  nhanXet: string;
}

const ContactForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values);
    message.success('Gửi thông tin thành công!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Vui lòng điền đầy đủ thông tin!');
  };

  return (
    <div className="w-full">
      <div className="w-8/12 mx-auto py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="bg-white sm:p-12 rounded-2xl shadow-lg bg-gradient-to-r from-[#69CF79] to-[#57A192]">
          <h2 className="text-6xl sm:text-4xl font-bold text-white text-center mb-8">
            Cùng Snapdi Tạo Nên Những Khoảnh Khắc Đáng Nhớ
          </h2>

          <Form
            form={form}
            name="contactForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="hoTen"
                label={<p className='text-white md:text-xl text-lg' >Họ và Tên</p>}
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input
                  placeholder="Họ và Tên"
                  size="large"
                  className="rounded-lg py-3!"
                />
              </Form.Item>

              <Form.Item
                name="namSinh"
                label={<p className='text-white md:text-xl text-lg' >Năm Sinh</p>}
                rules={[
                  { required: true, message: 'Vui lòng nhập năm sinh!' },
                  { pattern: /^[0-9]{4}$/, message: 'Năm sinh phải là 4 chữ số!' }
                ]}
              >
                <Input
                  placeholder="Năm Sinh"
                  size="large"
                  className="rounded-lg py-3!"
                  maxLength={4}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="email"
                label={<p className='text-white md:text-xl text-lg' >Email</p>}
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input
                  placeholder="Email"
                  size="large"
                  className="rounded-lg py-3!"
                />
              </Form.Item>

              <Form.Item
                name="soDienThoai"
                label={<p className='text-white md:text-xl text-lg' >Số Điện Thoại</p>}
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số!' }
                ]}
              >
                <Input
                  placeholder="Số Điện Thoại"
                  size="large"
                  className="rounded-lg py-3!"
                  maxLength={10}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="nhanXet"
              label={<p className='text-white md:text-xl text-lg' >Nhận Xét</p>}
              rules={[{ required: true, message: 'Vui lòng nhập nhận xét!' }]}
            >
              <TextArea
                placeholder="Nhận Xét"
                rows={5}
                className="rounded-lg"
              />
            </Form.Item>

            <div className="text-center">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="inline-flex items-center justify-center px-8! py-6! bg-gradient-to-r from-[#69CF79] to-[#57A192] text-white rounded-full! text-xl! transition-all duration-300 shadow-2xl! hover:scale-105 border-none"
                >
                  Trở thành Snapper ngay hôm nay
                  <img src={logo} className="w-8 ml-4" alt="Snapdi Logo" />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};


export default ContactForm;
