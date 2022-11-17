/* eslint-disable @typescript-eslint/no-floating-promises */

import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import { withRefResolver } from 'fastify-zod';
import { userSchemas } from './modules/user/user.schema';
import userRoutes from './modules/user/user.route';

export const server = fastify({
  logger: true,
});

const main = async (): Promise<void> => {
  userSchemas.forEach((schema) => {
    server.addSchema(schema);
  });
  server.register(
    swagger,
    withRefResolver({
      openapi: {
        info: {
          title: 'Fastify Example',
          description: 'fastify zod example',
          version: '0.0.1',
        },
      },
    }),
  );

  if (process.env.STAGE !== 'PRODUCTION') {
    server.register(swaggerUI, {
      routePrefix: '/docs',
      staticCSP: true,
    });
  }

  server.register(userRoutes, {
    prefix: '/user',
  });

  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on port 3000.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  if (process.env.STAGE !== 'PRODUCTION') {
    const responseYaml = await server.inject('/docs/yaml');
    fs.writeFileSync('docs/openapi.yaml', responseYaml.payload);
  }
};
main();
