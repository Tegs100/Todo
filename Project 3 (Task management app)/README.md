# Task Management Application

## Description
A task management application where users can create, read, update, and delete tasks. Users can categorize tasks, set deadlines, and mark tasks as complete or incomplete.

## Features
- User registration and authentication
- CRUD operations for tasks
- Task categorization and deadlines
- User-specific task management

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication



## Project Structure
```
task-management-app/
│── node_modules/              
│── src/
│   ├── config/
│   │   ├── db.config.js          # Database connection setup
│   ├── controllers/
│   │   ├── auth.controller.js    # Handles authentication (login, signup)
│   │   ├── user.controller.js    # Handles user-specific actions (profile, deletion)
│   │   ├── task.controller.js    # Handles CRUD operations for tasks
│   ├── middlewares/
│   │   ├── auth.middleware.js    # Protects routes (JWT authentication)
│   ├── models/
│   │   ├── user.model.js         # User schema (name, email, password, etc.)
│   │   ├── task.model.js         # Task schema (title, status, category, due date, etc.)
│   ├── routes/
│   │   ├── auth.routes.js        # Routes for user authentication
│   │   ├── user.routes.js        # Routes for user profile management
│   │   ├── task.routes.js        # Routes for task CRUD operations
│   ├── utils/
│   │   ├── ApiError.utils.js     # Error handling utility
│   │   ├── ApiResponse.utils.js  # Standard API response format
│   │   ├── asyncHandler.utils.js # Async error handling wrapper
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server entry point
│── .env                          # Environment variables
│── .gitignore                    # Files to ignore in Git
│── package.json                  # Dependencies and scripts
│── README.md                     # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user

### Users
- `GET /api/users/me` - Get authenticated user details
- `DELETE /api/users/me` - Delete authenticated user account

### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/:id` - Get a single task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID

## Author
Oghenetega Godwin

## License
This project is licensed under the MIT License.

