import User from '../models/user.model';

export function createUser(username, passwordHash) {
  return User.addUser({ username, password: passwordHash });
}
