import connection from '../db';

const table = 'user';

const User = {
  addUser: function (data) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  getUser: function (username) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE username = ?`, [username], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result[0]);
      });
    });
  }
};

export default User;
