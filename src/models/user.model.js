import connection from '../db';

const table = 'users';

const User = {
  addUser: function (data) {
    return new Promise((resolve, reject) => {
      connection
        .query(
          `INSERT INTO ${table}(username, password) VALUES ($<username>, $<password>) RETURNING id, username, password`,
          data
        )
        .then((list) => resolve(list[0]))
        .catch((err) => reject(err));
    });
  },

  getUser: function (username) {
    return new Promise((resolve, reject) => {
      connection
        .query(`SELECT id, username, password FROM ${table} WHERE username = $1`, [username])
        .then((list) => resolve(list[0]))
        .catch((err) => reject(err));
    });
  },

  getUsers: function () {
    return new Promise((resolve, reject) => {
      connection
        .query(`SELECT id, username, password FROM ${table}`)
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  }
};

export default User;
