import { ValidateTokenReqDto, ValidateTokenRespDto } from '../../dtos/auth'

export abstract class IvalidateTokenPorts {
  abstract handle(
    autorization: ValidateTokenReqDto,
  ): Promise<ValidateTokenRespDto>
}
