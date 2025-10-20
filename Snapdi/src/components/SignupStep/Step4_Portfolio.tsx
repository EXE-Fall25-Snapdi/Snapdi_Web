import { Form, Row, Col, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
const { Title } = Typography;
import phone from '../../assets/images/phone.svg';
import digitalCamera from '../../assets/images/digital-camera.svg';
import filmCamera from '../../assets/images/film_camera.svg';
import { FilledInput } from '../UI/FilledInput';

const equipmentOptions = [
  { label: 'Điện thoại', value: 'Điện thoại', imageUrl: phone },
  { label: 'Máy ảnh kỹ thuật số', value: 'Máy ảnh kỹ thuật số', imageUrl: digitalCamera },
  { label: 'Máy ảnh film', value: 'Máy ảnh film', imageUrl: filmCamera },
];

// Component Equipment Card - Click để toggle selection
const EquipmentCard = ({
  label,
  checked,
  imageUrl,
  onClick
}: {
  label: string;
  checked: boolean;
  imageUrl: string;
  onClick: () => void;
}) => (
  <div className="relative" onClick={onClick}>
    <div
      className={`w-40 h-40 bg-white rounded-xl border-2 
                flex flex-col items-center justify-center text-center p-4
                cursor-pointer transition-all hover:shadow-md
                ${checked ? 'border-green-500 shadow-lg' : 'border-gray-200'}
              `}
    >
      {/* Dấu tick xanh góc phải trên */}
      {checked && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
          <CheckCircleFilled className="text-white text-lg" />
        </div>
      )}

      {/* Hình ảnh thiết bị */}
      <div className="w-24 h-24 flex items-center justify-center mb-2">
        <img src={imageUrl} alt={label} className="w-full h-full object-contain" />
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  </div>
);

export default function Step4_Portfolio() {

  

  return (
    <div>
      <Title level={3} className="mb-6">Thông tin chuyên môn</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description" // Map tới API
            rules={[{ required: true, message: 'Vui lòng nhập chuyên môn!' }]}
          >
            <FilledInput
              label="Chi phí sàn"
              placeholder="xxx VND" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="category" // Figma có, API không
          >
            <FilledInput
              label="Thế loại"
              placeholder="Vd: Nghệ thuật, đường phố..." />
          </Form.Item>
        </Col>
      </Row>

      

      <Title level={4} className="mt-6 mb-2">Thiết bị chính</Title>
      <Form.Item
        name="equipment" // Map tới API
        rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 thiết bị!' }]}
      >
        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.equipment !== curr.equipment}>
          {({ getFieldValue, setFieldsValue }) => {
            const selectedEquipment = (getFieldValue('equipment') || []) as string[];

            const handleCardClick = (value: string) => {
              const newSelection = selectedEquipment.includes(value)
                ? selectedEquipment.filter(item => item !== value) // Remove if already selected
                : [...selectedEquipment, value]; // Add if not selected

              setFieldsValue({ equipment: newSelection });
            };

            return (
              <Row gutter={16}>
                {equipmentOptions.map(opt => (
                  <Col span={8} key={opt.value}>
                    <EquipmentCard
                      label={opt.label}
                      checked={selectedEquipment.includes(opt.value)}
                      imageUrl={opt.imageUrl}
                      onClick={() => handleCardClick(opt.value)}
                    />
                  </Col>
                ))}
              </Row>
            );
          }}
        </Form.Item>
      </Form.Item>
    </div>
  );
}