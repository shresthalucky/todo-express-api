import connection from '../db';

const table = 'todo';

const Todo = {
  addTodo: function (title, description, status, createDate, completeDate, userId) {
    const data = {
      title,
      description,
      status,
      create_date: createDate,
      complete_date: completeDate,
      user_id: userId
    };

    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.insertId);
      });
    });
  },
  getTodo: function (id, userId) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id = ? AND user_id = ?`, [id, userId], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      });
    });
  },
  listTodos: function (userId) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id = ?`, [userId], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
};

export default Todo;