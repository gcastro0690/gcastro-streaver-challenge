import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API con Swagger',
      version: '1.0.0',
      description: 'Documentación de la API sin Express',
    },
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Mi primer post' },
            body: { type: 'string', example: 'Este es el contenido del post.' },
            userId: { type: 'integer', example: 1 },
          },
        },
      },
    },
  },
  apis: ['./pages/api/**/*.ts', './src/pages/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
