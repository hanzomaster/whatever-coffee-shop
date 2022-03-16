import * as dotenv from 'dotenv'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

dotenv.config()
const configs: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
}

export default configs
