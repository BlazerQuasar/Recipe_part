/**
 * Todo List 应用程序主入口文件
 * 
 * 此文件设置Express服务器、中间件和API路由
 * 使用MongoDB作为数据库进行Todo项目的存储
 */

// 导入所需的模块
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量配置
dotenv.config();

// 创建Express应用程序
const app = express();
const PORT = process.env.PORT || 3000;

// 配置中间件
app.use(cors()); // 启用CORS
app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: false })); // 解析URL编码的请求体
app.use(morgan('dev')); // 添加日志记录

// 连接到MongoDB数据库
const MONGO_URI = 'mongodb://root:zlpgffht@test-db-mongodb.ns-i0yk8yg1.svc:27017';
mongoose.connect(MONGO_URI, {
  dbName: 'tododb', // 指定数据库名称
})
.then(() => console.log('成功连接到MongoDB数据库'))
.catch((err) => console.error('数据库连接失败:', err));

// 导入路由
const todoRoutes = require('./routes/todoRoutes');

// 使用路由
app.use('/api', todoRoutes);

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('错误:', err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行，端口: ${PORT}`);
});

module.exports = app; 