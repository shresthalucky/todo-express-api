import connection from '../db';

const table = 'todos';

const Todo = {
  addTodo: function (data) {
    return new Promise((resolve, reject) => {
      connection
        .query(
          `INSERT INTO ${table}(title, description, status, user_id) VALUES ($<title>, $<description>, $<status>, $<user_id>) RETURNING id`,
          data
        )
        .then((list) => resolve(list[0].id))
        .catch((err) => reject(err));
    });
  },

  getTodo: function (id, userId) {
    return new Promise((resolve, reject) => {
      connection
        .query(
          `SELECT id, title, description, status, extract(epoch from created) as created, extract(epoch from updated) as updated FROM ${table} WHERE id = $1 AND user_id = $2`,
          [id, userId]
        )
        .then((list) => resolve(list[0]))
        .catch((err) => reject(err));
    });
  },
  listTodos: function (userId) {
    return new Promise((resolve, reject) => {
      connection
        .query(
          `SELECT id, title, description, status, extract(epoch from created) as created, extract(epoch from updated) as updated FROM ${table} WHERE user_id = $1 ORDER BY id DESC`,
          [userId]
        )
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  deleteTodo: function (id, userId) {
    return new Promise((resolve, reject) => {
      connection
        .query(`DELETE FROM ${table} WHERE id = $1 AND user_id = $2`, [id, userId])
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  },

  updateTodo: function (id, data, userId) {
    return new Promise((resolve, reject) => {
      connection
        .query(
          `UPDATE ${table} SET title = $1, description = $2, status = $3, updated = now() WHERE id = $4 AND user_id = $5 RETURNING id`,
          [data.title, data.description, data.status, id, userId]
        )
        .then((list) => resolve(list[id]))
        .catch((err) => reject(err));
    });
  }
};

export default Todo;
