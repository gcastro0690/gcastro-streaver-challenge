import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API with Swagger',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'My first post' },
            body: { type: 'string', example: 'This is the post content.' },
            userId: { type: 'integer', example: 1 },
          },
        },
      },
    },
  },
  apis: ['./pages/api/**/*.ts', './src/pages/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
