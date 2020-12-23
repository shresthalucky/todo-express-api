import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import * as UserServices from '../services/user.service';
import * as TodoServices from '../services/todo.service';

import { DatabaseError, ServerError } from '../helpers/error.helper';
import { generatePassword, generateToken, validatePassword, validateToken } from './helpers';

const inputUserType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

const inputTodoType = new GraphQLInputObjectType({
  name: 'TodoInput',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString }
  }
});

const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    created: { type: GraphQLFloat },
    updated: { type: GraphQLFloat }
  }
});

const deleteTodoType = new GraphQLObjectType({
  name: 'DeleteTodo',
  fields: {
    message: { type: GraphQLString },
    todo: { type: todoType }
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    todos: {
      type: new GraphQLList(todoType),
      resolve: ({ id }) => TodoServices.listTodos(id)
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: () => UserServices.getUsers()
    },
    user: {
      type: userType,
      args: { username: { type: GraphQLNonNull(GraphQLString) } },
      resolve: (source, { username }) => UserServices.getUser(username)
    },
    loginUser: {
      type: userType,
      args: { userData: { type: GraphQLNonNull(inputUserType) } },
      resolve: async (source, { userData }) => {
        try {
          const user = await UserServices.getUser(userData.username);

          await validatePassword(userData.password, user.password);

          user.token = await generateToken(user);

          return user;
        } catch (err) {
          throw new ServerError();
        }
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: { userData: { type: GraphQLNonNull(inputUserType) } },
      resolve: async (source, { userData }) => {
        try {
          const passwordHash = await generatePassword(userData.password);
          const user = await UserServices.createUser(userData.username, passwordHash);

          return user;
        } catch (err) {
          throw new DatabaseError();
        }
      }
    },
    createTodo: {
      type: todoType,
      args: { todoData: { type: GraphQLNonNull(inputTodoType) } },
      resolve: async (source, { todoData }, request) => {
        try {
          const user = await validateToken(request.headers.authorization);
          const todo = await TodoServices.createTodo(todoData, user.id);

          return todo;
        } catch (err) {
          throw new ServerError();
        }
      }
    },
    updateTodo: {
      type: todoType,
      args: { todoID: { type: GraphQLNonNull(GraphQLID) }, todoData: { type: GraphQLNonNull(inputTodoType) } },
      resolve: async (source, { todoID, todoData }, request) => {
        try {
          const user = await validateToken(request.headers.authorization);
          const todo = await TodoServices.updateTodo(todoData, todoID, user.id);

          return todo;
        } catch (err) {
          throw new ServerError();
        }
      }
    },
    deleteTodo: {
      type: deleteTodoType,
      args: { todoID: { type: GraphQLNonNull(GraphQLID) } },
      resolve: async (source, { todoID }, request) => {
        try {
          const user = await validateToken(request.headers.authorization);
          const todo = await TodoServices.getTodo(todoID, user.id);

          await TodoServices.deleteTodo(todoID, user.id);

          return { message: 'todo deleted', todo };
        } catch (err) {
          throw new ServerError();
        }
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
