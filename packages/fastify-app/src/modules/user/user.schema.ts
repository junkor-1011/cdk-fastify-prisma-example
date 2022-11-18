import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

export const userBase = z.object({
  id: z.string().uuid().describe('user id'),
  name: z.string().describe('user name'),
  email: z.string().email().optional().describe("user's email address"),
  rank: z.number().min(1).max(10).step(1).default(1).describe('the rank of user'),
  birthdate: z.date().describe('bitrth day of the user'),
  createdAt: z.date().describe('signup date'),
  updatedAt: z.date().describe('last modified date'),
});

export const userInputSchema = userBase.pick({ name: true, email: true, birthdate: true });
export type UserInputType = z.infer<typeof userInputSchema>;

export const userSchema = userBase;
export type UserType = z.infer<typeof userSchema>;

export const userListSchema = z.array(userBase);
export type userListType = z.infer<typeof userListSchema>;

export const getUsersQuerySchema = z.object({
  limit: z.number().min(1).step(1).default(100).describe('limit').optional(),
  offset: z.number().min(0).step(1).describe('offset').optional(),
});
export type GetUsersQueryType = z.infer<typeof getUsersQuerySchema>;

export const getUserParamsSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
});
export type GetUserParamsType = z.infer<typeof getUserParamsSchema>;

export const deleteUserParamsSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
});
export type DeleteUserParamsType = z.infer<typeof deleteUserParamsSchema>;

export const patchUserParamsSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
});
export type PatchUserParamsType = z.infer<typeof patchUserParamsSchema>;

export const patchUserRequestBodySchema = userBase
  .pick({
    name: true,
    email: true,
    rank: true,
  })
  .partial();
export type PatchUserRequestBodyType = z.infer<typeof patchUserRequestBodySchema>;

export const putUserParamsSchema = z.object({
  id: z.string().uuid().describe('id of the user'),
});
export type PutUserParamsType = z.infer<typeof putUserParamsSchema>;

export const putUserRequestBodySchema = userBase.pick({
  name: true,
  email: true,
  birthdate: true,
  rank: true,
});
export type PutUserRequestBodyType = z.infer<typeof putUserRequestBodySchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userInputSchema,
    userSchema,
    userListSchema,
    getUsersQuerySchema,
    getUserParamsSchema,
    putUserParamsSchema,
    putUserRequestBodySchema,
    patchUserParamsSchema,
    patchUserRequestBodySchema,
    deleteUserParamsSchema,
  },
  {
    $id: 'userSchemas',
  },
);
