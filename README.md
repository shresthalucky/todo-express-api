# Todo Express API

A REST API for user todo list application using Express. 

.env file example
```
HOST=127.0.0.1
PORT=1234
JWT_KEY=secret
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=db_name
SALT_ROUNDS=10
```

#### Base Url: /api

## Users
#### **GET** /users
- validate user token
- return user information if valid token

#### **POST** /users/register
- create new user
- return new user information with token

#### **POST** /users/login
- validate password
- return user information with token

## Todos
#### **GET** /todos
- retrieve user todos
- return list of user todos

#### **POST** /todos
- create new todo for user
- return new todo detail

#### **DELETE** /todos/{id}
- remove user todo of ```id```
- return ```204 No Content```

#### **PUT** /todos/{id}
- update user todo of ```id```
- returns todo detail of ```id```
