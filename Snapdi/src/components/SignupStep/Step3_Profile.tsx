import { Form,Radio, Row, Col, Typography } from 'antd';
import { FilledSelect } from '../UI/FilledSelect';
import { FilledInput } from '../UI/FilledInput';

const { Title } = Typography;

const experienceOptions = [
  { label: 'Người mới (chưa nhận job thực tế)', value: 'Người mới' },
  { label: 'Tân binh (Yêu thích chụp ảnh, đã nhận job)', value: 'Tân binh' },
  { label: 'Kỳ cựu (Nhận nhiều job, có kinh nghiệm)', value: 'Kỳ cựu' },
  { label: 'Lão làng (Nhận các job lớn nhỏ)', value: 'Lão làng' },
];

export default function Step3_Profile() {
  return (
    <div>
      <Title level={3} className="mb-6">Phạm vi làm việc</Title>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="workScope"
            initialValue="Tự do | Studio"
          >
            <FilledSelect
              label="Chức vụ"
              options={[
                { value: 'Tự do | Studio', label: 'Tự do | Studio' },
                { value: 'Chỉ Tự do', label: 'Chỉ Tự do' },
                { value: 'Chỉ Studio', label: 'Chỉ Studio' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="locationCity" // Map tới API
            rules={[{ required: true, message: 'Vui lòng nhập Tỉnh/Thành phố!' }]}
          >
            <FilledInput
              label="Tỉnh / Thành phố"
              placeholder="---" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="locationAddress" // Map tới API (optional)
            >
            <FilledInput
              label="Địa chỉ cụ thể (nếu có)"
              placeholder="---" />
          </Form.Item>
        </Col>
      </Row>

      <Title level={3} className="mt-6 mb-4">Kinh nghiệm làm việc</Title>
      <Form.Item
        name="experienceLevel"
        initialValue="Người mới"
      >
        <Radio.Group className="flex flex-col gap-3">
          {experienceOptions.map(opt => (
            <Radio className='mt-3!' key={opt.value} value={opt.value}>{opt.label}</Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="yearsOfExperience" // Map tới API
        rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm!' }]}
        >
          <FilledInput
            label="Kinh nghiệm của bạn (Nếu có)"
            placeholder="10 năm" />
      </Form.Item>
    </div>
  );
}