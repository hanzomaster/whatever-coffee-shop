import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.enableShutdownHooks()
  app.enableVersioning()

  app.use(helmet())
  app.use(compression())

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'development' ? false : true,
    }),
  )

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Coffee API')
    .setDescription('Coffee shop API for class project')
    .setVersion('1.0.0')
    .build()

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  })

  await app.listen(3000, async () => {
    Logger.log(
      `Documentation is running on: ${await app.getUrl()}/${globalPrefix}/docs`,
      'Documentation',
    )
    Logger.log(
      `Application is running on: ${await app.getUrl()}/${globalPrefix}`,
      'NestApplication',
    )
  })
}
bootstrap()