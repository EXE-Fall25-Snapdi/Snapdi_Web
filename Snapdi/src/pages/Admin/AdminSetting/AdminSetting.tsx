import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Table, message, Popconfirm } from 'antd';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { styleService } from '../../../services/styleService';
import type { ColumnsType } from 'antd/es/table';
import type { Style } from '../../../lib/types';

const AdminSetting = () => {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState<Style | null>(null);
  const [styleName, setStyleName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch all styles
  const fetchStyles = async () => {
    setLoading(true);
    try {
      const data = await styleService.getAllStyles();
      setStyles(data);
    } catch (error) {
      console.error('Failed to fetch styles:', error);
      message.error('Failed to load styles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  // Open modal for creating new style
  const handleCreate = () => {
    setEditingStyle(null);
    setStyleName('');
    setModalOpen(true);
  };

  // Open modal for editing existing style
  const handleEdit = (style: Style) => {
    setEditingStyle(style);
    setStyleName(style.styleName);
    setModalOpen(true);
  };

  // Close modal
  const handleCancel = () => {
    setModalOpen(false);
    setEditingStyle(null);
    setStyleName('');
  };

  // Submit create or update
  const handleSubmit = async () => {
    if (!styleName.trim()) {
      message.error('Please enter a style name');
      return;
    }

    setSubmitting(true);
    try {
      if (editingStyle) {
        // Update existing style
        await styleService.updateStyle(editingStyle.styleId, { styleName: styleName.trim() });
        message.success('Style updated successfully');
      } else {
        // Create new style
        await styleService.createStyle({ styleName: styleName.trim() });
        message.success('Style created successfully');
      }
      handleCancel();
      fetchStyles();
    } catch (error) {
      console.error('Failed to save style:', error);
      message.error(`Failed to ${editingStyle ? 'update' : 'create'} style`);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete style
  const handleDelete = async (styleId: number) => {
    try {
      await styleService.deleteStyle(styleId);
      message.success('Style deleted successfully');
      fetchStyles();
    } catch (error) {
      console.error('Failed to delete style:', error);
      message.error('Failed to delete style');
    }
  };

  const columns: ColumnsType<Style> = [
    {
      title: 'Style ID',
      dataIndex: 'styleId',
      key: 'styleId',
      width: 100,
      sorter: (a, b) => a.styleId - b.styleId,
    },
    {
      title: 'Style Name',
      dataIndex: 'styleName',
      key: 'styleName',
      sorter: (a, b) => a.styleName.localeCompare(b.styleName),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="text"
            icon={<Edit className="h-4 w-4" />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-700"
          />
          <Popconfirm
            title="Delete Style"
            description="Are you sure you want to delete this style?"
            onConfirm={() => handleDelete(record.styleId)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              icon={<Trash2 className="h-4 w-4" />}
              className="text-red-600 hover:text-red-700"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <p className="text-slate-500">Manage photography styles</p>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={handleCreate}
          size="large"
        >
          Add New Style
        </Button>
      </header>

      <Card>
        <Table
          columns={columns}
          dataSource={styles}
          loading={loading}
          rowKey="styleId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} styles`,
          }}
        />
      </Card>

      <Modal
        title={editingStyle ? 'Edit Style' : 'Create New Style'}
        open={modalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={submitting}
        okText={editingStyle ? 'Update' : 'Create'}
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Style Name
          </label>
          <Input
            placeholder="Enter style name (e.g., Wedding, Portrait, Fashion)"
            value={styleName}
            onChange={(e) => setStyleName(e.target.value)}
            onPressEnter={handleSubmit}
            size="large"
            maxLength={50}
            showCount
          />
        </div>
      </Modal>
    </div>
  );
};

export default AdminSetting;