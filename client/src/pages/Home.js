import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Empty, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../utils/api';

const { Title } = Typography;

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取所有菜谱
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await getAllRecipes();
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error('获取菜谱失败:', error);
        setError('获取菜谱列表失败，请刷新页面重试');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // 处理搜索
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  // 处理删除菜谱后的列表更新
  const handleDeleteRecipe = (deletedId) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== deletedId));
  };

  return (
    <div>
      <Title level={2}>我的菜谱</Title>
      
      <Input
        placeholder="搜索菜谱..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 24 }}
        allowClear
      />
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert message={error} type="error" />
      ) : filteredRecipes.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredRecipes.map(recipe => (
            <Col xs={24} sm={12} md={8} lg={6} key={recipe._id}>
              <RecipeCard recipe={recipe} onDelete={handleDeleteRecipe} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description={searchTerm ? "没有找到匹配的菜谱" : "暂无菜谱，请添加新菜谱"} 
          style={{ margin: '40px 0' }}
        />
      )}
    </div>
  );
};

export default Home; 