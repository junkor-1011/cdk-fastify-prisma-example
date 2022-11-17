/* eslint-disable @typescript-eslint/require-await */

import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  patchUserHandler,
  putUserHandler,
} from './user.controller';
import { $ref } from './user.schema';

const userRoutes = async (server: FastifyInstance): Promise<void> => {
  server.post('/', {
    schema: {
      body: $ref('userInputSchema'),
      response: {
        201: { ...$ref('userSchema'), description: 'user was created' },
      },
      tags: ['User'],
    },
    handler: createUserHandler,
  });
  server.get('/', {
    schema: {
      querystring: $ref('getUsersQuerySchema'),
      response: {
        200: { ...$ref('userListSchema'), description: 'users' },
      },
      tags: ['User'],
    },
    handler: getUsersHandler,
  });
  server.get('/:id', {
    schema: {
      params: $ref('getUserParamsSchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
      },
      tags: ['User'],
    },
    handler: getUserHandler,
  });
  server.delete('/:id', {
    schema: {
      params: $ref('deleteUserParamsSchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
      },
      tags: ['User'],
    },
    handler: deleteUserHandler,
  });
  server.patch('/:id', {
    schema: {
      params: $ref('patchUserParamsSchema'),
      body: $ref('patchUserRequestBodySchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
      },
      tags: ['User'],
    },
    handler: patchUserHandler,
  });
  server.put('/:id', {
    schema: {
      params: $ref('putUserParamsSchema'),
      body: $ref('putUserRequestBodySchema'),
      response: {
        200: {
          ...$ref('userSchema'),
          description: 'user detail',
        },
      },
      tags: ['User'],
    },
    handler: putUserHandler,
  });
};
export default userRoutes;
