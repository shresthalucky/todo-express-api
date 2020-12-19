import connection from '../db';

const table = 'user_table';

const User = {
  addUser: function (data) {
    return new Promise((resolve, reject) => {
      connection
        .query(`INSERT INTO ${table}(username, password) VALUES ($<username>, $<password>) RETURNING id`, data)
        .then((list) => resolve(list[0].id))
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
  }
};

export default User;
