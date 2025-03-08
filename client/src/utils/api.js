import axios from 'axios';

const API_URL = '/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取所有菜谱
export const getAllRecipes = async () => {
  try {
    const response = await api.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('获取菜谱列表失败:', error);
    throw error;
  }
};

// 获取单个菜谱详情
export const getRecipeById = async (id) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`获取菜谱ID:${id}失败:`, error);
    throw error;
  }
};

// 创建新菜谱
export const createRecipe = async (recipeData) => {
  try {
    const formData = new FormData();
    
    // 添加文本字段
    Object.keys(recipeData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, recipeData[key]);
      }
    });
    
    // 添加图片文件（如果有）
    if (recipeData.image) {
      formData.append('image', recipeData.image);
    }
    
    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('创建菜谱失败:', error);
    throw error;
  }
};

// 更新菜谱
export const updateRecipe = async (id, recipeData) => {
  try {
    const formData = new FormData();
    
    // 添加文本字段
    Object.keys(recipeData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, recipeData[key]);
      }
    });
    
    // 添加图片文件（如果有）
    if (recipeData.image && recipeData.image instanceof File) {
      formData.append('image', recipeData.image);
    }
    
    const response = await axios.put(`${API_URL}/recipes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`更新菜谱ID:${id}失败:`, error);
    throw error;
  }
};

// 删除菜谱
export const deleteRecipe = async (id) => {
  try {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`删除菜谱ID:${id}失败:`, error);
    throw error;
  }
}; 