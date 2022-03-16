import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

const configs: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

export default configs
