import { Module } from '@nestjs/common'
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
import { join } from 'path'

@Module({
  controllers: [AuthsController],
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'auth',
          protoPath: join(__dirname, '../proto/auth.proto'),
        },
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
  exports: [IccmsLoginPorts],
})
export class AuthsModule {}
