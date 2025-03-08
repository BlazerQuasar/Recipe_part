# 菜谱管理系统 - 前端

这是一个基于React的菜谱管理系统前端应用，用于增删改查菜谱信息，支持上传菜谱图片。

## 功能特点

- 查看所有菜谱列表
- 搜索菜谱
- 查看菜谱详情
- 添加新菜谱
- 编辑现有菜谱
- 删除菜谱
- 上传菜谱图片

## 技术栈

- React 18
- React Router v6
- Ant Design UI库
- Axios用于API请求

## 安装与运行

1. 安装依赖:
   ```
   npm install
   ```

2. 启动开发服务器:
   ```
   npm start
   ```

3. 构建生产版本:
   ```
   npm run build
   ```

## 项目结构

```
client/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 图片等资源
│   ├── components/     # 可复用组件
│   ├── hooks/          # 自定义钩子
│   ├── pages/          # 页面组件
│   ├── utils/          # 工具函数
│   ├── App.js          # 主应用组件
│   ├── App.css         # 应用样式
│   ├── index.js        # 入口文件
│   └── index.css       # 全局样式
└── package.json        # 项目配置
```

## API接口

应用通过代理连接到后端API，主要使用以下端点：

- `GET /api/recipes` - 获取所有菜谱
- `GET /api/recipes/:id` - 获取单个菜谱详情
- `POST /api/recipes` - 创建新菜谱
- `PUT /api/recipes/:id` - 更新菜谱
- `DELETE /api/recipes/:id` - 删除菜谱 