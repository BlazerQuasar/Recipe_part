import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Spin, Alert } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import RecipeForm from '../components/RecipeForm';
import { getRecipeById, updateRecipe } from '../utils/api';

const { Title } = Typography;

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取菜谱详情
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (error) {
        console.error('获取菜谱详情失败:', error);
        setError('获取菜谱详情失败，请返回重试');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  // 处理表单提交
  const handleSubmit = async (recipeData) => {
    return await updateRecipe(id, recipeData);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  if (!recipe) {
    return <Alert message="菜谱不存在" type="warning" />;
  }

  return (
    <div>
      <Link to={`/recipe/${id}`}>
        <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginLeft: -16 }}>
          返回菜谱详情
        </Button>
      </Link>
      
      <Title level={2}>编辑菜谱</Title>
      
      <RecipeForm 
        initialValues={recipe}
        onSubmit={handleSubmit}
        buttonText="保存修改"
      />
    </div>
  );
};

export default EditRecipe; 