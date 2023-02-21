import { Module, Global } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

// Service
import { AuthsService } from '../services/auths.service'

// Controller
import { AuthsController } from '../controllers/auths.controller'

// UseCase
import { CCMSLoginUseCase } from '../../use-cases/auth/ccmsLogin.useCase'

// Interface
import { IccmsLoginPorts } from '../../domain/ports/auth'
import { IauthService } from '../../domain/services/auth/iauth.service'
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from '../proto/auth.pb'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Global()
@Module({
  controllers: [AuthsController],
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('AppConfiguration.msAuth.url'),
            package: AUTH_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-ms-proto/proto/auth.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    {
      provide: IauthService,
      useClass: AuthsService,
    },
    {
      provide: IccmsLoginPorts,
      useClass: CCMSLoginUseCase,
    },
  ],
  exports: [IccmsLoginPorts, IauthService],
})
export class AuthsModule {}
