import { Controller, Post, Body, Headers } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import {
  LoginRequestDto,
  LoginResponseDto,
  ValidateTokenReqDto,
  ValidateTokenRespDto,
} from '../../domain/dtos/auth'
import { IccmsLoginPorts, IvalidateTokenPorts } from '../../domain/ports/auth'

@ApiTags('AUTHS')
@Controller('auths')
export class AuthsController {
  constructor(
    private readonly _ccmsLoginPorts: IccmsLoginPorts,
    private readonly _validateTokenPorts: IvalidateTokenPorts,
  ) {}

  @Post('ccmslogin')
  @ApiResponse({
    status: 200,
    description: 'OK Response',
    type: LoginResponseDto,
  })
  async ccmslogin(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this._ccmsLoginPorts.handle(loginRequestDto)
  }

  @Post('validate-token')
  @ApiResponse({
    status: 200,
    description: 'OK Response',
    type: ValidateTokenRespDto,
  })
  async validateToken(
    @Headers('authorization') ValidateTokenReqDto: ValidateTokenReqDto,
  ): Promise<ValidateTokenRespDto> {
    return this._validateTokenPorts.handle(ValidateTokenReqDto)
  }
}
