# 菜谱管理系统

基于Node.js、Express、MongoDB和React的全栈菜谱管理系统。

## 功能特点

- RESTful API设计
- MongoDB数据存储
- 图片上传功能
- 响应式前端界面
- 菜谱的增删改查操作

## 项目结构

```
/
├── client/             # React前端应用
├── controllers/        # API控制器
├── models/             # 数据模型
├── routes/             # API路由
├── uploads/            # 上传的图片存储目录
├── app.js              # 主应用入口
└── package.json        # 项目配置
```

## API端点

| 路由 | 方法 | 描述 |
|------|------|------|
| `/api/recipes` | GET | 获取所有菜谱 |
| `/api/recipes/:id` | GET | 获取单个菜谱详情 |
| `/api/recipes` | POST | 添加新菜谱 |
| `/api/recipes/:id` | PUT | 更新菜谱 |
| `/api/recipes/:id` | DELETE | 删除菜谱 |

## 安装与运行

### 后端

1. 安装依赖:
   ```
   npm install
   ```

2. 配置环境变量:
   - 创建`.env`文件并设置:
     ```
     PORT=3000
     MONGO_URI=你的MongoDB连接字符串
     NODE_ENV=development
     ```

3. 启动服务器:
   ```
   npm start
   ```

### 前端

1. 进入客户端目录:
   ```
   cd client
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 启动开发服务器:
   ```
   npm start
   ```

## 使用示例

### 获取所有菜谱

```
GET /api/recipes
```

### 添加新菜谱

```
POST /api/recipes
Content-Type: multipart/form-data

{
  "name": "红烧肉",
  "description": "经典家常菜",
  "ingredients": "五花肉500g\n生姜2片\n大葱1段\n料酒2勺\n酱油3勺\n冰糖适量",
  "steps": "1. 将五花肉切成块\n2. 冷水下锅焯水\n3. 热锅冷油，放入冰糖\n4. 糖色出来后放入肉块翻炒\n5. 加入调料炖煮40分钟",
  "cookingTime": 60,
  "servings": 4,
  "image": [文件]
}
```

### 更新菜谱

```
PUT /api/recipes/[recipe_id]
Content-Type: multipart/form-data

{
  "name": "红烧肉",
  "description": "更新的描述",
  ...
}
```

### 删除菜谱

```
DELETE /api/recipes/[recipe_id]
``` 