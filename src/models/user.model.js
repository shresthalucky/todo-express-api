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
  }
};

export default User;
