import awsLambdaFastify from '@fastify/aws-lambda';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { server } from './src/app';

const proxy = awsLambdaFastify(server);

// eslint-disable-next-line
exports.handler = async (event: APIGatewayProxyEvent, context: Context) => proxy(event, context);
