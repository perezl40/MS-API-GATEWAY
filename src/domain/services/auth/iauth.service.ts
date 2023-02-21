import {
  LoginResponseDto,
  LoginRequestDto,
  ValidateTokenReqDto,
  ValidateTokenRespDto,
} from 'src/domain/dtos/auth'

export abstract class IauthService {
  abstract ccmsLogin(
    loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto>

  abstract validateToken(
    validateTokenReqDto: ValidateTokenReqDto,
  ): Promise<ValidateTokenRespDto>
}
