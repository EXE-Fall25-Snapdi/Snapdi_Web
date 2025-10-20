import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Form, Typography, Upload } from 'antd';
const { Title } = Typography;


const Step5_PortfolioPhoto = () => {
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
      <Title level={4} className="mt-6 mb-2">Một số tác phẩm</Title>
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