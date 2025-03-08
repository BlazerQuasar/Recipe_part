# Todo List API

基于Node.js、Express和MongoDB的Todo List后端API服务。

## 功能特点

- RESTful API设计
- MongoDB数据存储
- 异步/等待语法
- 错误处理
- 日志记录

## API端点

| 路由 | 方法 | 描述 |
|------|------|------|
| `/api/get-todo` | GET | 获取所有Todo项 |
| `/api/add-todo` | POST | 添加新的Todo项 |
| `/api/update-todo/:id` | POST | 更新指定Todo项的状态 |
| `/api/del-todo/:id` | POST | 删除指定的Todo项 |

## 安装与运行

1. 克隆项目
2. 安装依赖:
   ```
   npm install
   ```
3. 配置环境变量:
   - 创建`.env`文件并设置:
     ```
     PORT=3000
     MONGO_URI=你的MongoDB连接字符串
     NODE_ENV=development
     ```
4. 启动服务器:
   ```
   npm start
   ```

## 使用示例

### 获取所有Todo项

```
GET /api/get-todo
```

### 添加新Todo项

```
POST /api/add-todo
Content-Type: application/json

{
  "value": "完成项目文档",
  "isCompleted": false
}
```

### 更新Todo项状态

```
POST /api/update-todo/[todo_id]
```

### 删除Todo项

```
POST /api/del-todo/[todo_id]
``` 