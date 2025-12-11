import { HttpModule } from "@nestjs/axios";
import { type MiddlewareConsumer, Module, type NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health/health.controller";
import { CustomerModule } from "./module/customer/customer.module";
import { OrderdetailsModule } from "./module/orderdetails/orderdetails.module";
import { OrdersModule } from "./module/orders/orders.module";
import { ProductsModule } from "./module/products/products.module";
import { StoresModule } from "./module/stores/stores.module";
import { SupplierdetailsModule } from "./module/supplierdetails/supplierdetails.module";
import { SuppliersModule } from "./module/suppliers/suppliers.module";
import { PrismaModule } from "./prisma/prisma.module";
import { LoggingMiddleware } from "./utils/logging.middleware";

@Module({
  controllers: [HealthController],
  imports: [
    HttpModule,
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
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
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes("/api/*");
  }
}
