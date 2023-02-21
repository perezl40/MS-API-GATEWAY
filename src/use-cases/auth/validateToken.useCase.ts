import { IvalidateTokenPorts } from '../../domain/ports/auth/validateToken.ports'
import { IauthService } from '../../domain/services/auth/iauth.service'
import {
  ValidateTokenReqDto,
  ValidateTokenRespDto,
} from '../../domain/dtos/auth'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidateTokeUseCase implements IvalidateTokenPorts {
  constructor(private readonly _authsService: IauthService) {}

  async handle(
    validateTokenReqDto: ValidateTokenReqDto,
  ): Promise<ValidateTokenRespDto> {
    return this._authsService.validateToken(validateTokenReqDto)
  }
}
