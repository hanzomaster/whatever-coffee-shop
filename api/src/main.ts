import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.enableShutdownHooks()
  app.enableVersioning()

  app.use(helmet())
  app.use(compression())
  app.use(cookieParser())

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

  const PORT = process.env.PORT || 3333
  await app.listen(PORT, async () => {
    Logger.log(
      `Documentation is running on: http://localhost:3333/${globalPrefix}/docs`,
      'Documentation',
    )
    Logger.log(
      `Server is running on: http://localhost:3333/${globalPrefix}`,
      'NestAPI',
    )
    Logger.log(`App is running on: http://localhost:3333`, 'Frontend')
  })
}
bootstrap()
