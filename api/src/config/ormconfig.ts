import * as dotenv from 'dotenv'
import * as PostgressConnectionStringParser from 'pg-connection-string'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

dotenv.config()
const databaseUrl: string = process.env.DATABASE_URL
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl)
const configs: PostgresConnectionOptions = {
  type: 'postgres',
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
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
