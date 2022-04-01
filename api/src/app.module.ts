import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import configs from './config/ormconfig'
import { HealthController } from './health/health.controller'
import { CustomerModule } from './module/customer/customer.module'
import { OrderdetailsModule } from './module/orderdetails/orderdetails.module'
import { OrdersModule } from './module/orders/orders.module'
import { ProductsModule } from './module/products/products.module'
import { StoresModule } from './module/stores/stores.module'
import { SupplierdetailsModule } from './module/supplierdetails/supplierdetails.module'
import { SuppliersModule } from './module/suppliers/suppliers.module'
import { LoggingMiddleware } from './utils/logging.middleware'

@Module({
  controllers: [HealthController],
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'web'),
    }),
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configs),
    CustomerModule,
    ProductsModule,
    StoresModule,
    SuppliersModule,
    SupplierdetailsModule,
    OrdersModule,
    OrderdetailsModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('/api/*')
  }
}
