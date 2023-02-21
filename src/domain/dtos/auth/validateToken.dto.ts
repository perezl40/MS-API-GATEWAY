import { IsEmpty } from 'class-validator'

export class ValidateTokenReqDto {
  @IsEmpty()
  autorization: string
}

export class ValidateTokenRespDto {
  auth: boolean
}
