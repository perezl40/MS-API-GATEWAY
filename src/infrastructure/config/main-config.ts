import { INestApplication, ValidationPipe, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as compression from 'compression'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

import { LoggerValidation } from './joi.validation'
import { AppModule, AuthsModule } from '../modules'

export function configApp(app: INestApplication, configService: ConfigService) {
  const cors = configService.get('AppConfiguration.corsOrigins')

  if (process.env.NODE_ENV !== 'prod')
    LoggerValidation(configService.get('AppConfiguration'))

  app.enableCors({
    credentials: true,
    origin: cors,
  })
  app.use(helmet.hidePoweredBy())

  app.use(cookieParser())
  app.getHttpAdapter().getInstance().disable('x-powered-by')
  app.getHttpAdapter().getInstance().disable('X-Powered-By')
  app.use(compression())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
}

export function configSwagger(app: INestApplication) {
  if (process.env.NODE_ENV !== 'prod') {
    const configS = new DocumentBuilder()
      .setTitle('API GATEWAY')
      .setDescription('APIS Docs')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, configS, {
      include: [AppModule, AuthsModule],
    })
    SwaggerModule.setup('api/docs', app, document)
  }
}
