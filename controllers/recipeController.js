/**
 * 菜谱控制器
 * 
 * 处理所有与菜谱相关的业务逻辑：
 * - 获取所有菜谱
 * - 获取单个菜谱详情
 * - 创建新菜谱
 * - 更新菜谱
 * - 删除菜谱
 */

const Recipe = require('../models/Recipe');
const fs = require('fs');
const path = require('path');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * 获取所有菜谱
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.getAllRecipes = async (req, res, next) => {
  try {
    // 从数据库获取所有菜谱，按创建时间降序排列
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    
    // 返回成功响应
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error); // 传递错误到错误处理中间件
  }
};

/**
 * 获取单个菜谱详情
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 查找指定的菜谱
    const recipe = await Recipe.findById(id);
    
    // 如果没有找到菜谱
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `未找到ID为${id}的菜谱`
      });
    }
    
    // 返回菜谱详情
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    // 处理无效ID的错误
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '无效的菜谱ID格式'
      });
    }
    next(error); // 传递其他错误到错误处理中间件
  }
};

/**
 * 创建新菜谱
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.createRecipe = async (req, res, next) => {
  try {
    // 从请求体获取数据
    const { name, description, ingredients, steps, cookingTime, servings } = req.body;
    
    // 验证必要字段
    if (!name || !description || !ingredients || !steps || !cookingTime || !servings) {
      return res.status(400).json({
        success: false,
        message: '请提供所有必要的菜谱信息'
      });
    }
    
    // 准备菜谱数据
    const recipeData = {
      name,
      description,
      ingredients,
      steps,
      cookingTime,
      servings
    };
    
    // 处理图片上传
    if (req.file) {
      // 生成图片URL
      recipeData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // 创建新菜谱
    const recipe = await Recipe.create(recipeData);
    
    // 返回成功响应
    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error); // 传递错误到错误处理中间件
  }
};

/**
 * 更新菜谱
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 查找要更新的菜谱
    const recipe = await Recipe.findById(id);
    
    // 如果没有找到菜谱
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `未找到ID为${id}的菜谱`
      });
    }
    
    // 准备更新数据
    const updateData = { ...req.body };
    
    // 处理图片上传
    if (req.file) {
      // 如果有旧图片，删除它
      if (recipe.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', recipe.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // 更新为新图片URL
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // 更新菜谱
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    // 返回更新后的菜谱
    res.status(200).json({
      success: true,
      data: updatedRecipe
    });
  } catch (error) {
    // 处理无效ID的错误
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '无效的菜谱ID格式'
      });
    }
    next(error); // 传递其他错误到错误处理中间件
  }
};

/**
 * 删除菜谱
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 查找要删除的菜谱
    const recipe = await Recipe.findById(id);
    
    // 如果没有找到菜谱
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `未找到ID为${id}的菜谱`
      });
    }
    
    // 如果有图片，删除它
    if (recipe.imageUrl) {
      const imagePath = path.join(__dirname, '..', recipe.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // 删除菜谱
    await Recipe.findByIdAndDelete(id);
    
    // 返回成功响应
    res.status(200).json({
      success: true,
      message: '菜谱已成功删除',
      data: recipe
    });
  } catch (error) {
    // 处理无效ID的错误
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '无效的菜谱ID格式'
      });
    }
    next(error); // 传递其他错误到错误处理中间件
  }
}; 