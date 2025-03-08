/**
 * 菜谱数据模型文件
 * 
 * 定义了菜谱的数据结构并创建MongoDB集合
 * 每个菜谱包含：
 * - 名称 (name)
 * - 描述 (description)
 * - 食材 (ingredients)
 * - 步骤 (steps)
 * - 烹饪时间 (cookingTime)
 * - 份量 (servings)
 * - 图片URL (imageUrl)
 * - 创建时间 (createdAt)
 */

const mongoose = require('mongoose');

// 定义Schema（模式）
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '菜谱名称不能为空'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, '菜谱描述不能为空'],
    trim: true,
  },
  ingredients: {
    type: String,
    required: [true, '食材列表不能为空'],
  },
  steps: {
    type: String,
    required: [true, '烹饪步骤不能为空'],
  },
  cookingTime: {
    type: Number,
    required: [true, '烹饪时间不能为空'],
    min: [1, '烹饪时间必须大于0'],
  },
  servings: {
    type: Number,
    required: [true, '份量不能为空'],
    min: [1, '份量必须大于0'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// 创建并导出模型
// 这将创建一个名为'recipes'的集合
module.exports = mongoose.model('recipes', RecipeSchema); 