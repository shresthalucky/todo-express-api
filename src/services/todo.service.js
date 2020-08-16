import Todo from '../models/todo.model';

export function createTodo(todo, userId) {
  const { title, description, completeDate } = todo;
  const createDate = Date.now();
  const status = 'active';

  return Todo.addTodo(title, description, status, createDate, completeDate, userId);
}

export function getTodo(todoId, userId) {
  return Todo.getTodo(todoId, userId);
}
