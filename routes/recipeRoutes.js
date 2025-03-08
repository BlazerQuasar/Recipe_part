/**
 * 菜谱API路由文件
 *
 * 定义所有与菜谱相关的API端点:
 * - GET /api/recipes - 获取所有菜谱
 * - GET /api/recipes/:id - 获取单个菜谱详情
 * - POST /api/recipes - 创建新菜谱
 * - PUT /api/recipes/:id - 更新菜谱
 * - DELETE /api/recipes/:id - 删除菜谱
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'recipe-' + uniqueSuffix + ext);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 只接受图片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只能上传图片文件!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

// 导入控制器方法
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipeController');

// 定义API路由
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', upload.single('image'), createRecipe);
router.put('/:id', upload.single('image'), updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router; 