import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Form, Typography, Upload, Select } from 'antd';
import { useEffect, useState } from 'react';
import { styleService } from '../../services/styleService';
import type { Style } from '../../lib/types';
import { message } from 'antd';
const { Title } = Typography;



const Step5_PortfolioPhoto = () => {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loadingStyles, setLoadingStyles] = useState(false);

  // Fetch available styles
  useEffect(() => {
    const fetchStyles = async () => {
      setLoadingStyles(true);
      try {
        const data = await styleService.getAllStyles();
        setStyles(data);
      } catch (error) {
        console.error('Failed to fetch styles:', error);
        message.error('Không thể tải danh sách thể loại');
      } finally {
        setLoadingStyles(false);
      }
    };

    fetchStyles();
  }, []);

  const uploadProps: UploadProps = {
    name: 'file',
    listType: "picture-card",
    beforeUpload: () => false, // Ngăn auto-upload, ta sẽ upload thủ công
    multiple: true,
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Form.Item
        name="styleIds"
        label={<span className="text-white font-medium">Thể loại ảnh</span>}
        rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 thể loại!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Chọn thể loại (có thể chọn nhiều)"
          loading={loadingStyles}
          options={styles.map(style => ({
            label: style.styleName,
            value: style.styleId,
          }))}
          size="large"
          maxTagCount="responsive"
        />
      </Form.Item>
      <Title level={4} className="mt-6 mb-2 text-white">Một số tác phẩm</Title>
      <Form.Item
        name="portfolio"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Vui lòng tải lên ít nhất 1 ảnh!' }]}
      >
        <Upload {...uploadProps}>
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
          </div>
        </Upload>
      </Form.Item>
    </div>
  )
}

export default Step5_PortfolioPhoto