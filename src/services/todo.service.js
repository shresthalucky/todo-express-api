import Todo from '../models/todo.model';

export function createTodo(todo, userId) {
  const { title, description } = todo;
  const data = {
    title,
    description,
    status: 'active',
    user: userId
  };

  return Todo.addTodo(data);
}

export function getTodo(todoId, userId) {
  return Todo.getTodo(todoId, userId);
}

export function listTodos(userId) {
  return Todo.listTodos(userId);
}

export function deleteTodo(todoId, userId) {
  return Todo.deleteTodo(todoId, userId);
}

export function updateTodo(todo, todoId, userId) {
  const { title, description, status } = todo;
  const data = {
    title,
    description,
    status
  };

  return Todo.updateTodo(todoId, data, userId);
}
