import { Injectable, Inject } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { LoginRequestDto, LoginResponseDto } from '../../domain/dtos/auth'
import { IauthService } from '../../domain/services/auth/iauth.service'
import { AuthServiceClient, AUTH_SERVICE_NAME } from '../proto/auth.pb'
@Injectable()
export class AuthsService implements IauthService {
  private _authServiceGrpc: AuthServiceClient

  constructor(
    @Inject(AUTH_SERVICE_NAME) private readonly _client: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this._authServiceGrpc =
      this._client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  ccmsLogin(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return firstValueFrom(this._authServiceGrpc.ccmsLogin(loginRequestDto))
  }

  validateToken(): Promise<any> {
    throw new Error('Method not implemented.')
  }
  userChangeRole(): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
