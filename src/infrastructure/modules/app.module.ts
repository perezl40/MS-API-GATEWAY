import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import { environments, config, JoiValidationSchema } from '../config'

import { GlobalMiddleware } from '../middlewares/global.middleware'
import { GrpcExceptionFilter } from '../filters/global-Rpc-exception.filter'

// Modules
import { AuthsModule } from './auths.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV],
      load: [config],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    AuthsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalMiddleware).forRoutes('*')
  }
}
