import { useEffect, useState } from 'react';
import { Button, Card, Input, Modal, Table, message, Popconfirm } from 'antd';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { photoTypeService } from '../../../services/photoTypeService';
import type { ColumnsType } from 'antd/es/table';
import type { PhotoType } from '../../../lib/types';

const AdminPhotoTypeSetting = () => {
  const [photoTypes, setPhotoTypes] = useState<PhotoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPhotoType, setEditingPhotoType] = useState<PhotoType | null>(null);
  const [photoTypeName, setPhotoTypeName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch all photo types
  const fetchPhotoTypes = async () => {
    setLoading(true);
    try {
      const data = await photoTypeService.getAllPhotoTypes();
      setPhotoTypes(data);
    } catch (error) {
      console.error('Failed to fetch photo types:', error);
      message.error('Failed to load photo types');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoTypes();
  }, []);

  // Open modal for creating new photo type
  const handleCreate = () => {
    setEditingPhotoType(null);
    setPhotoTypeName('');
    setModalOpen(true);
  };

  // Open modal for editing existing photo type
  const handleEdit = (photoType: PhotoType) => {
    setEditingPhotoType(photoType);
    setPhotoTypeName(photoType.photoTypeName);
    setModalOpen(true);
  };

  // Close modal
  const handleCancel = () => {
    setModalOpen(false);
    setEditingPhotoType(null);
    setPhotoTypeName('');
  };

  // Submit create or update
  const handleSubmit = async () => {
    if (!photoTypeName.trim()) {
      message.error('Please enter a photo type name');
      return;
    }

    setSubmitting(true);
    try {
      if (editingPhotoType) {
        // Update existing photo type
        await photoTypeService.updatePhotoType(editingPhotoType.photoTypeId, {
          photoTypeName: photoTypeName.trim()
        });
        message.success('Photo type updated successfully');
      } else {
        // Create new photo type
        await photoTypeService.createPhotoType({
          photoTypeName: photoTypeName.trim()
        });
        message.success('Photo type created successfully');
      }
      handleCancel();
      fetchPhotoTypes();
    } catch (error) {
      console.error('Failed to save photo type:', error);
      message.error(`Failed to ${editingPhotoType ? 'update' : 'create'} photo type`);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete photo type
  const handleDelete = async (photoTypeId: number) => {
    try {
      await photoTypeService.deletePhotoType(photoTypeId);
      message.success('Photo type deleted successfully');
      fetchPhotoTypes();
    } catch (error) {
      console.error('Failed to delete photo type:', error);
      message.error('Failed to delete photo type');
    }
  };

  const columns: ColumnsType<PhotoType> = [
    {
      title: 'Photo Type ID',
      dataIndex: 'photoTypeId',
      key: 'photoTypeId',
      width: 120,
      sorter: (a, b) => a.photoTypeId - b.photoTypeId,
    },
    {
      title: 'Photo Type Name',
      dataIndex: 'photoTypeName',
      key: 'photoTypeName',
      sorter: (a, b) => a.photoTypeName.localeCompare(b.photoTypeName),
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
            title="Delete Photo Type"
            description="Are you sure you want to delete this photo type?"
            onConfirm={() => handleDelete(record.photoTypeId)}
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
        <p className="text-slate-500">Manage photography types</p>
        <Button
          type="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={handleCreate}
          size="large"
        >
          Add New Photo Type
        </Button>
      </header>

      <Card>
        <Table
          columns={columns}
          dataSource={photoTypes}
          loading={loading}
          rowKey="photoTypeId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} photo types`,
          }}
        />
      </Card>

      <Modal
        title={editingPhotoType ? 'Edit Photo Type' : 'Create New Photo Type'}
        open={modalOpen}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={submitting}
        okText={editingPhotoType ? 'Update' : 'Create'}
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Photo Type Name
          </label>
          <Input
            placeholder="Enter photo type name (e.g., Event, Portrait, Nature)"
            value={photoTypeName}
            onChange={(e) => setPhotoTypeName(e.target.value)}
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

export default AdminPhotoTypeSetting;
