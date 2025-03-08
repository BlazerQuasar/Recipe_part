import React from 'react';
import { Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { createRecipe } from '../utils/api';

const { Title } = Typography;

const AddRecipe = () => {
  // 处理表单提交
  const handleSubmit = async (recipeData) => {
    return await createRecipe(recipeData);
  };

  return (
    <div>
      <Link to="/">
        <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginLeft: -16 }}>
          返回菜谱列表
        </Button>
      </Link>
      
      <Title level={2}>添加新菜谱</Title>
      
      <RecipeForm 
        onSubmit={handleSubmit}
        buttonText="添加菜谱"
      />
    </div>
  );
};

export default AddRecipe; 