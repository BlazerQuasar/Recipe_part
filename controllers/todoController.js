/**
 * Todo项目控制器
 * 
 * 处理所有与Todo相关的业务逻辑：
 * - 获取所有Todo
 * - 添加新Todo
 * - 更新Todo状态
 * - 删除Todo
 */

const Todo = require('../models/Todo');

/**
 * 获取所有Todo项
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.getAllTodos = async (req, res, next) => {
  try {
    // 从数据库获取所有Todo项，按创建时间降序排列
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    // 返回成功响应
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    next(error); // 传递错误到错误处理中间件
  }
};

/**
 * 创建新的Todo项
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.addTodo = async (req, res, next) => {
  try {
    // 从请求体获取数据
    const { value, isCompleted = false } = req.body;
    
    // 验证输入
    if (!value) {
      return res.status(400).json({
        success: false,
        message: 'Todo内容不能为空'
      });
    }
    
    // 创建新的Todo项
    const todo = await Todo.create({
      value,
      isCompleted
    });
    
    // 返回成功响应和新创建的Todo项
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error); // 传递错误到错误处理中间件
  }
};

/**
 * 更新Todo项状态
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.updateTodo = async (req, res, next) => {
  try {
    // 获取Todo ID
    const { id } = req.params;
    
    // 查找指定的Todo项
    const todo = await Todo.findById(id);
    
    // 如果没有找到Todo
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `未找到ID为${id}的Todo项`
      });
    }
    
    // 更新完成状态（取反）
    todo.isCompleted = !todo.isCompleted;
    
    // 保存更新后的Todo
    await todo.save();
    
    // 返回更新后的Todo
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    // 处理无效ID的错误
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '无效的Todo ID格式'
      });
    }
    next(error); // 传递其他错误到错误处理中间件
  }
};

/**
 * 删除指定的Todo项
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
exports.deleteTodo = async (req, res, next) => {
  try {
    // 获取Todo ID
    const { id } = req.params;
    
    // 查找并删除指定的Todo项
    const result = await Todo.findByIdAndDelete(id);
    
    // 如果没有找到要删除的Todo
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `未找到ID为${id}的Todo项`
      });
    }
    
    // 返回成功响应
    res.status(200).json({
      success: true,
      message: 'Todo项已成功删除',
      data: result
    });
  } catch (error) {
    // 处理无效ID的错误
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: '无效的Todo ID格式'
      });
    }
    next(error); // 传递其他错误到错误处理中间件
  }
}; 