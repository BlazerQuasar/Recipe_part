import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, InputNumber } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const RecipeForm = ({ initialValues, onSubmit, buttonText = '保存' }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || '');
  const [loading, setLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // 准备提交的数据
      const recipeData = {
        ...values,
        image: imageFile,
      };
      
      // 如果没有新上传的图片，但有原始图片URL，保留原始图片
      if (!imageFile && initialValues?.imageUrl) {
        recipeData.imageUrl = initialValues.imageUrl;
      }
      
      await onSubmit(recipeData);
      message.success('菜谱保存成功！');
      navigate('/');
    } catch (error) {
      message.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理图片上传前的预览
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式的图片!');
      return false;
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
      return false;
    }
    
    // 保存文件对象以便后续提交
    setImageFile(file);
    
    // 创建本地预览URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    
    // 阻止自动上传
    return false;
  };

  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || {}}
      onFinish={handleSubmit}
      className="recipe-form"
    >
      <Form.Item
        name="name"
        label="菜谱名称"
        rules={[{ required: true, message: '请输入菜谱名称' }]}
      >
        <Input placeholder="请输入菜谱名称" />
      </Form.Item>

      <Form.Item
        name="description"
        label="菜谱描述"
        rules={[{ required: true, message: '请输入菜谱描述' }]}
      >
        <TextArea rows={4} placeholder="请输入菜谱描述" />
      </Form.Item>

      <Form.Item
        name="ingredients"
        label="食材"
        rules={[{ required: true, message: '请输入食材列表' }]}
      >
        <TextArea rows={4} placeholder="请输入食材列表，每行一个食材" />
      </Form.Item>

      <Form.Item
        name="steps"
        label="烹饪步骤"
        rules={[{ required: true, message: '请输入烹饪步骤' }]}
      >
        <TextArea rows={6} placeholder="请输入烹饪步骤，每行一个步骤" />
      </Form.Item>

      <Form.Item
        name="cookingTime"
        label="烹饪时间（分钟）"
        rules={[{ required: true, message: '请输入烹饪时间' }]}
      >
        <InputNumber min={1} placeholder="分钟" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="servings"
        label="份量（人数）"
        rules={[{ required: true, message: '请输入份量' }]}
      >
        <InputNumber min={1} placeholder="人数" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="菜谱图片">
        <div className="upload-container">
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="菜谱图片" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div style={{ textAlign: 'center' }}>
          {imageUrl && (
            <Button 
              onClick={() => {
                setImageUrl('');
                setImageFile(null);
              }}
              style={{ marginTop: 8 }}
            >
              移除图片
            </Button>
          )}
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RecipeForm; 