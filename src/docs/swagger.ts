export const swaggerDocument = {
  openapi: '3.0.3',

  info: {
    title: 'Movie Reservation System API',
    version: '1.0.0',
    description:
      'API for managing movies, showtimes, seats, reservations and reports.',
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],

  tags: [
    {
      name: 'Health',
    },
    {
      name: 'Movies',
    },
    {
      name: 'Showtimes',
    },
    {
      name: 'Reservations',
    },
    {
      name: 'Reports',
    },
  ],

  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service is healthy',
          },
        },
      },
    },

    '/api/movies': {
      get: {
        tags: ['Movies'],
        summary: 'Get all movies',
        responses: {
          '200': {
            description: 'List of movies',
          },
        },
      },

      post: {
        tags: ['Movies'],
        summary: 'Create movie',
        responses: {
          '201': {
            description: 'Movie created',
          },
        },
      },
    },

    '/api/movies/{id}': {
      get: {
        tags: ['Movies'],
        summary: 'Get movie by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Movie details',
          },
        },
      },

      patch: {
        tags: ['Movies'],
        summary: 'Update movie',
        responses: {
          '200': {
            description: 'Movie updated',
          },
        },
      },

      delete: {
        tags: ['Movies'],
        summary: 'Delete movie',
        responses: {
          '204': {
            description: 'Movie deleted',
          },
        },
      },
    },

    '/api/showtimes': {
      get: {
        tags: ['Showtimes'],
        summary: 'Get all showtimes',
        responses: {
          '200': {
            description: 'List of showtimes',
          },
        },
      },

      post: {
        tags: ['Showtimes'],
        summary: 'Create showtime',
        responses: {
          '201': {
            description: 'Showtime created',
          },
        },
      },
    },

    '/api/showtimes/{id}/seats': {
      get: {
        tags: ['Showtimes'],
        summary: 'Get seat availability',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Seat availability list',
          },
        },
      },
    },

    '/api/reservations': {
      get: {
        tags: ['Reservations'],
        summary: 'Get all reservations',
        responses: {
          '200': {
            description: 'Reservation list',
          },
        },
      },

      post: {
        tags: ['Reservations'],
        summary: 'Create reservation',
        responses: {
          '201': {
            description: 'Reservation created',
          },
        },
      },
    },

    '/api/reports/summary': {
      get: {
        tags: ['Reports'],
        summary: 'Get summary report',
        responses: {
          '200': {
            description: 'Summary report',
          },
        },
      },
    },

    '/api/reports/showtimes/{id}': {
      get: {
        tags: ['Reports'],
        summary: 'Get showtime report',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Showtime report',
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};