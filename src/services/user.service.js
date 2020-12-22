import User from '../models/user.model';

export function createUser(username, passwordHash) {
  return User.addUser({ username, password: passwordHash });
}

export function getUser(username) {
  return User.getUser(username);
}

export function getUsers() {
  return User.getUsers();
}
