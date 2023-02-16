import {
  Injectable,
  Inject,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientGrpc, RpcException } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { LoginRequestDto, LoginResponseDto } from '../../domain/dtos/auth'
import { IauthService } from '../../domain/services/auth/iauth.service'
import { AuthServiceClient, AUTH_SERVICE_NAME } from '../proto/auth.pb'
@Injectable()
export class AuthsService implements IauthService, OnModuleInit {
  private _authServiceGrpc: AuthServiceClient

  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly _client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this._authServiceGrpc =
      this._client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  async ccmsLogin(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const response = await firstValueFrom(
        this._authServiceGrpc.ccmsLogin(loginRequestDto),
      )
      return response
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
