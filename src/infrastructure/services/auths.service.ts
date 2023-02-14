import { Injectable } from '@nestjs/common'
import { LoginRequestDto, LoginResponseDto } from 'src/domain/dtos/auth'
import { IauthService } from 'src/domain/services/auth/iauth.service'

@Injectable()
export class AuthsService implements IauthService {
  ccmsLogin(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const userResponseDto: LoginResponseDto = {
      idccms: 111111,
      username: loginRequestDto.username,
      name: 'name',
      charge: 'charge',
      rol: 'rol',
      photo: 'photo',
      token: loginRequestDto.accessToken,
    }
    return Promise.resolve(userResponseDto)
  }
  validateToken(): Promise<any> {
    throw new Error('Method not implemented.')
  }
  userChangeRole(): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
