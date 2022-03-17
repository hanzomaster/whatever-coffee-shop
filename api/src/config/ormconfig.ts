import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const configs: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
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
}

export default configs
