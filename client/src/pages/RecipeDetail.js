import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Divider, Button, Row, Col, Spin, Alert, List, Tag } from 'antd';
import { ArrowLeftOutlined, EditOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { getRecipeById } from '../utils/api';

const { Title, Paragraph } = Typography;

const RecipeDetail = () => {
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

  // 处理食材和步骤的格式化显示
  const formatListItems = (text) => {
    if (!text) return [];
    return text.split('\n').filter(item => item.trim() !== '');
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

  // 默认图片
  const defaultImage = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

  return (
    <div className="recipe-detail">
      <Link to="/">
        <Button type="link" icon={<ArrowLeftOutlined />} style={{ marginLeft: -16 }}>
          返回菜谱列表
        </Button>
      </Link>

      <Title level={2}>{recipe.name}</Title>

      <Row gutter={[0, 16]}>
        <Col span={24}>
          <img
            src={recipe.imageUrl || defaultImage}
            alt={recipe.name}
            className="recipe-detail-image"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Tag icon={<ClockCircleOutlined />} color="blue">
            烹饪时间: {recipe.cookingTime} 分钟
          </Tag>
        </Col>
        <Col>
          <Tag icon={<TeamOutlined />} color="green">
            份量: {recipe.servings} 人份
          </Tag>
        </Col>
      </Row>

      <Paragraph>{recipe.description}</Paragraph>

      <Divider orientation="left">食材</Divider>
      <List
        bordered
        dataSource={formatListItems(recipe.ingredients)}
        renderItem={(item, index) => (
          <List.Item>
            {index + 1}. {item}
          </List.Item>
        )}
      />

      <Divider orientation="left">烹饪步骤</Divider>
      <List
        bordered
        dataSource={formatListItems(recipe.steps)}
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Text mark>[步骤 {index + 1}]</Typography.Text> {item}
          </List.Item>
        )}
      />

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link to={`/edit-recipe/${recipe._id}`}>
          <Button type="primary" icon={<EditOutlined />}>
            编辑菜谱
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail; 