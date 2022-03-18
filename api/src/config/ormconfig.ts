import * as dotenv from 'dotenv'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

dotenv.config()
const configs: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['dist/module/**/*.entity.js'],
  migrations: ['dist/db/migration/**/*.js'],
  subscribers: ['dist/db/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/module',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}

export default configs
