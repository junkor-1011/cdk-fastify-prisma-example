/* eslint-disable @typescript-eslint/no-floating-promises */

import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import { withRefResolver } from 'fastify-zod';
import { userSchemas } from '$fastify-app/modules/user/user.schema';
import userRoutes from '$fastify-app/modules/user/user.route';

const port = Number(process.env.PORT ?? 3000);

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

  if (process.env.STAGE === 'LOCAL') {
    server.register(swaggerUI, {
      routePrefix: '/docs',
      staticCSP: true,
    });
  }

  server.register(userRoutes, {
    prefix: '/user',
  });

  try {
    await server.listen({ port, host: '0.0.0.0' });
    console.log('Server listening on port 3000.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  if (process.env.STAGE === 'LOCAL') {
    const responseYaml = await server.inject('/docs/yaml');
    fs.writeFileSync('docs/openapi.yaml', responseYaml.payload);
  }
};
main();
