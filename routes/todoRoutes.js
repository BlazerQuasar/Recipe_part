/**
 * Todo API路由文件
 *
 * 定义所有与Todo相关的API端点:
 * - GET /api/get-todo - 获取所有Todo
 * - POST /api/add-todo - 添加新Todo
 * - POST /api/update-todo/:id - 更新Todo状态
 * - POST /api/del-todo/:id - 删除Todo
 */

const express = require('express');
const router = express.Router();

// 导入控制器方法
const {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// 定义API路由
router.get('/get-todo', getAllTodos);
router.post('/add-todo', addTodo);
router.post('/update-todo/:id', updateTodo);
router.post('/del-todo/:id', deleteTodo);

module.exports = router; 