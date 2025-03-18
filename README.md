# Todo List API

A backend API service for a Todo List built with Node.js, Express, and MongoDB.

## Features

- RESTful API design
- MongoDB data storage
- Asynchronous/await syntax
- Error handling
- Logging

## API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/get-todo` | GET | Retrieve all Todo items |
| `/api/add-todo` | POST | Add a new Todo item |
| `/api/update-todo/:id` | POST | Update the status of a specified Todo item |
| `/api/del-todo/:id` | POST | Delete a specified Todo item |

## Installation and Running

1. Clone the project.
2. Install dependencies:

   ```
   npm install
   ```
3. Configure environment variables:
- Create a `.env` file and set:
  ```
  PORT=3000
  MONGO_URI=your MongoDB connection string
  NODE_ENV=development
  ```
4. Start the server:

   ```
   npm start
   ```

## Usage Examples

### Retrieve All Todo Items


```
GET /api/get-todo
```


### Add a New Todo Item



```
POST /api/add-todo
Content-Type: application/json

{
  "value": "Complete project documentation",
  "isCompleted": false
}
```

### Update Todo Item Status

```
POST /api/update-todo/[todo_id]
```

### Delete a Todo Item

```
POST /api/del-todo/[todo_id]
``` 
