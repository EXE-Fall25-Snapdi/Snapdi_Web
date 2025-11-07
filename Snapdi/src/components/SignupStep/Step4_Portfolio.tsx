import { Form, Row, Col, Typography, InputNumber, Button, Select } from 'antd';
import { CheckCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
const { Title } = Typography;
import phone from '../../assets/images/phone.svg';
import digitalCamera from '../../assets/images/digital-camera.svg';
import filmCamera from '../../assets/images/film_camera.svg';
import { FilledInput } from '../UI/FilledInput';
import { photoTypeService } from '../../services/photoTypeService';
import type { PhotoType } from '../../lib/types';
import { Trash2 } from 'lucide-react';

const equipmentOptions = [
  { label: 'Điện thoại', value: 'Điện thoại', imageUrl: phone },
  { label: 'Máy ảnh kỹ thuật số', value: 'Máy ảnh kỹ thuật số', imageUrl: digitalCamera },
  { label: 'Máy ảnh film', value: 'Máy ảnh film', imageUrl: filmCamera },
];

// Component Equipment Card
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
      className={`w-36 h-36  bg-white rounded-xl border-2 
                flex flex-col items-center justify-center text-center p-4
                cursor-pointer transition-all hover:shadow-md
                ${checked ? 'border-green-500 shadow-lg' : 'border-gray-200'}
              `}
    >
      {checked && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
          <CheckCircleFilled className="text-white text-lg" />
        </div>
      )}
      <div className="w-24 h-24 flex items-center justify-center mb-2">
        <img src={imageUrl} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  </div>
);

export default function Step4_Portfolio() {
  const [photoTypes, setPhotoTypes] = useState<PhotoType[]>([]);
  const [loadingPhotoTypes, setLoadingPhotoTypes] = useState(false);

  // Fetch photo types from API on component mount
  useEffect(() => {
    const fetchPhotoTypes = async () => {
      setLoadingPhotoTypes(true);
      try {
        const data = await photoTypeService.getAllPhotoTypes();
        setPhotoTypes(data);
      } catch (error) {
        console.error('Failed to fetch photo types:', error);
        setPhotoTypes([]);
      } finally {
        setLoadingPhotoTypes(false);
      }
    };

    fetchPhotoTypes();
  }, []);

  return (
    <div>
      {/* Description Section */}
      <Title level={3} className="mb-6">Thông tin chuyên môn</Title>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <FilledInput
              label="Mô tả về bạn"
              placeholder="Ví dụ: Chuyên chụp ảnh cưới và chân dung" />
          </Form.Item>
        </Col>
      </Row>

      {/* Photo Types Pricing Section */}
      <Title level={4} className="mt-8 mb-1">Bảng giá chụp</Title>
      <p className="text-sm text-slate-500 mb-4">Thêm giá chụp theo từng thể loại chụp ảnh</p>

      {loadingPhotoTypes ? (
        <div className="text-center py-8">Loading photo types...</div>
      ) : photoTypes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No photo types available</div>
      ) : (
        <Form.Item noStyle shouldUpdate={(prev, curr) =>
          JSON.stringify(prev.photographerPhotoTypes) !== JSON.stringify(curr.photographerPhotoTypes)
        }>
          {({ getFieldValue, setFieldsValue }) => {
            const selectedPhotoTypes = (getFieldValue('photographerPhotoTypes') || []) as Array<{
              photoTypeId: number;
              photoPrice: number;
              time: string;
            }>;

            const handleAddPhotoType = () => {
              const updated = [
                ...selectedPhotoTypes,
                { photoTypeId: 0, photoPrice: 0, time: 1 }
              ];
              setFieldsValue({ photographerPhotoTypes: updated });
            };

            const handleDeletePhotoType = (index: number) => {
              const updated = selectedPhotoTypes.filter((_, i) => i !== index);
              setFieldsValue({ photographerPhotoTypes: updated });
            };

            return (
              <div>
                {/* Photo Types Table */}
                <div className="space-y-3 mb-4">
                  {selectedPhotoTypes.length === 0 ? (
                    <div className="text-center py-6 text-gray-400">
                      Chưa có loại ảnh nào. Hãy nhấn nút "Thêm thể loại" để bắt đầu.
                    </div>
                  ) : (
                    selectedPhotoTypes.map((_, index) => {
                      return (
                        <div key={index} className="flex gap-2 items-end">
                          {/* Photo Type Select */}
                          <div className="w-32 flex-shrink-0">
                            <Form.Item
                              name={['photographerPhotoTypes', index, 'photoTypeId']}
                              rules={[
                                { required: true, message: 'Chọn thể loại!' },
                                {
                                  validator: (_, value) => {
                                    if (!value) return Promise.resolve();

                                    // Check if this photoTypeId already exists in other rows
                                    const duplicates = selectedPhotoTypes.filter(
                                      (item, idx) => item.photoTypeId === value && idx !== index
                                    );

                                    if (duplicates.length > 0) {
                                      return Promise.reject(new Error('Thể loại ảnh này đã được chọn!'));
                                    }

                                    return Promise.resolve();
                                  }
                                }
                              ]}
                              className="mb-0"
                            >
                              <Select
                                placeholder="Chọn thể loại"
                                options={photoTypes.map(pt => ({
                                  label: pt.photoTypeName,
                                  value: pt.photoTypeId
                                }))}
                              />
                            </Form.Item>
                          </div>

                          {/* Price Input */}
                          <div className="w-28 flex-shrink-0">
                            <Form.Item
                              name={['photographerPhotoTypes', index, 'photoPrice']}
                              rules={[
                                { required: true, message: 'Nhập giá!' },
                                {
                                  pattern: /^\d+$/,
                                  message: 'Phải là số!'
                                }
                              ]}
                              className="mb-0"
                            >
                              <InputNumber
                                placeholder="0"
                                min={0}
                                className="w-full"
                                addonAfter="VND"
                                formatter={(value) => {
                                  if (!value) return '';
                                  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                }}
                                parser={(value: any) => {
                                  return value?.replace(/\./g, '');
                                }}
                              />
                            </Form.Item>
                          </div>
                          <div className="w-24 flex-shrink-0">
                            <Form.Item
                              name={['photographerPhotoTypes', index, 'time']}
                              rules={[
                                { required: true, message: 'Nhập thời gian chụp!' },
                                {
                                  pattern: /^\d+$/,
                                  message: 'Phải là số!'
                                }
                              ]}
                              className="mb-0"
                            >
                              <InputNumber
                                placeholder="1"
                                min={1}
                                className="w-full"
                                addonAfter="Giờ"
                              />
                            </Form.Item>
                          </div>

                          {/* Delete Button */}
                          <Button
                            type="text"
                            danger
                            size="small"
                            icon={<Trash2 className="h-4 w-4" />}
                            onClick={() => handleDeletePhotoType(index)}
                            className="flex-shrink-0"
                          />
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Add Button */}
                <Button
                  type="default"
                  icon={<PlusOutlined />}
                  onClick={handleAddPhotoType}
                  className="w-full"
                >
                  Thêm thể loại
                </Button>
              </div>
            );
          }}
        </Form.Item>
      )}

      {/* Equipment Section */}
      <Title level={4} className="mt-8 mb-4">Thiết bị chính</Title>
      <Form.Item
        name="equipment"
        rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 thiết bị!' }]}
      >
        <Form.Item noStyle shouldUpdate={(prev, curr) => prev.equipment !== curr.equipment}>
          {({ getFieldValue, setFieldsValue }) => {
            const selectedEquipment = (getFieldValue('equipment') || []) as string[];

            const handleCardClick = (value: string) => {
              const newSelection = selectedEquipment.includes(value)
                ? selectedEquipment.filter(item => item !== value)
                : [...selectedEquipment, value];

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
