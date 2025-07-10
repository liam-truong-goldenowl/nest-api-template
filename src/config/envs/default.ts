export const config = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  db: {
    type: process.env.DB_TYPE ?? 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 5432,
    ssl: process.env.DB_SSL === 'true' || false,

    username: process.env.DB_USERNAME ?? 'user',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'database',

    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
};
