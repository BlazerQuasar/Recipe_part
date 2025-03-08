/**
 * Todo数据模型文件
 * 
 * 定义了Todo项的数据结构并创建MongoDB集合
 * 每个Todo项包含：
 * - 内容 (value)
 * - 完成状态 (isCompleted)
 * - 创建时间 (createdAt)
 */

const mongoose = require('mongoose');

// 定义Schema（模式）
const TodoSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Todo内容不能为空'],
    trim: true, // 去除前后空格
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// 创建并导出模型
// 这将创建一个名为'list'的集合
module.exports = mongoose.model('list', TodoSchema); 