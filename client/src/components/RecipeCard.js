import React from 'react';
import { Card, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../utils/api';

const { Meta } = Card;

const RecipeCard = ({ recipe, onDelete }) => {
  const navigate = useNavigate();
  
  // 默认图片
  const defaultImage = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';
  
  // 处理删除菜谱
  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe._id);
      message.success('菜谱删除成功');
      if (onDelete) {
        onDelete(recipe._id);
      }
    } catch (error) {
      message.error('删除菜谱失败');
    }
  };

  return (
    <Card
      className="recipe-card"
      cover={
        <img
          alt={recipe.name}
          src={recipe.imageUrl || defaultImage}
          className="recipe-image"
        />
      }
      actions={[
        <Link to={`/recipe/${recipe._id}`}>
          <EyeOutlined key="view" /> 查看
        </Link>,
        <Link to={`/edit-recipe/${recipe._id}`}>
          <EditOutlined key="edit" /> 编辑
        </Link>,
        <Popconfirm
          title="确定要删除这个菜谱吗？"
          onConfirm={handleDelete}
          okText="确定"
          cancelText="取消"
        >
          <DeleteOutlined key="delete" /> 删除
        </Popconfirm>,
      ]}
    >
      <Meta
        title={recipe.name}
        description={
          <div>
            <p>{recipe.description.length > 50 
              ? `${recipe.description.substring(0, 50)}...` 
              : recipe.description}
            </p>
            <p>烹饪时间: {recipe.cookingTime} 分钟</p>
          </div>
        }
      />
    </Card>
  );
};

export default RecipeCard; 