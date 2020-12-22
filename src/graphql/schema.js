import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLID
} from 'graphql';

import * as UserServices from '../services/user.service';
import * as TodoServices from '../services/todo.service';

import { DatabaseError, ServerError } from '../helpers/error.helper';
import { generatePassword, generateToken, validatePassword } from './helpers';

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
      args: { username: { type: GraphQLString } },
      resolve: (source, { username }) => UserServices.getUser(username)
    },
    loginUser: {
      type: userType,
      args: { username: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: async (source, { username, password }) => {
        try {
          const user = await UserServices.getUser(username);

          await validatePassword(password, user.password);

          user.token = await generateToken(user);

          return user;
        } catch (err) {
          throw new ServerError();
        }
      }
    }
  }
});

const inputUserType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: { userData: { type: inputUserType } },
      resolve: async (source, { userData }) => {
        try {
          const passwordHash = await generatePassword(userData.password);

          return await UserServices.createUser(userData.username, passwordHash);
        } catch (err) {
          throw new DatabaseError();
        }
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
