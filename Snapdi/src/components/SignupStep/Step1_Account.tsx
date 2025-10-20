
import { Form, Row, Col } from 'antd';
import { FilledInput } from '../UI/FilledInput';
import { FilledSelect } from '../UI/FilledSelect';
import { FilledDatePicker } from '../UI/FilledDatePicker';


export default function Step1_Account() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">TẠO TÀI KHOẢN MỚI</h1>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <FilledInput
              label="Họ và tên"
              placeholder="Nhập họ và tên của bạn" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <FilledDatePicker
              label="Ngày sinh"
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="gender"
            initialValue="Nam"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <FilledSelect
              label="Giới tính"
              placeholder="Nam / Nữ"
              options={[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <FilledInput
              label="Số điện thoại"
              placeholder="01234567xx" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <FilledInput
              label="Email"
              placeholder="abc@gmail.com"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            hasFeedback
          >
            <FilledInput
              label='Mật khẩu'
              placeholder='**************'
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Hai mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <FilledInput
              label='Nhập lại mật khẩu'
              placeholder='**************'
            />
            {/* <Input.Password placeholder="**************" /> */}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}