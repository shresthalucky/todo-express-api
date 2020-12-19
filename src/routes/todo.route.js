import express from 'express';

import * as TodoController from '../controllers/todo.controller';
import TodoValidator from '../validators/todo.validator';

const router = express.Router();

// permissions: {'todo': 'CRUD', 'someting', 'CR'}
async function PermissionValidator(permission, access) {
  return (req, res, next) => {
    // req.headers.token.get('permissions')
    const userPermissions = {'todo': 'CRUD', 'someting': 'CR'};
    if (userPermissions[permission] && userPermissions[permission].includes(access)) {
      next()
      return
    }
    next(new Error('ACCESS DENIED'))
  }
}



// route to list of todos
router.get('/', TodoController.listTodos);

// route to create a new todo
router.post('/', PermissionValidator('todo', 'W'), TodoValidator, TodoController.createTodo);

// route to delete a todo
router.delete('/:id', PermissionValidator('todo', 'W'), TodoController.deleteTodo);

// route to update a todo
router.put('/:id', TodoValidator, TodoController.updateTodo);

export default router;
