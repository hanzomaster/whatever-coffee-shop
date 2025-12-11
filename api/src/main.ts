import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  app.enableVersioning();

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV !== "development",
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Coffee API")
    .setDescription("Coffee shop API - modernized with Bun, NestJS 11, and Prisma")
    .setVersion("2.0.0")
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
      showRequestDuration: true,
    },
  });

  const port = process.env.PORT ?? 3333;
  await app.listen(port);

  Logger.log(`Documentation: http://localhost:${port}/${globalPrefix}/docs`, "Swagger");
  Logger.log(`API running on: http://localhost:${port}/${globalPrefix}`, "NestJS");
}

bootstrap();
