import { Controller, Post, Body, Headers } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

import { LoginRequestDto, LoginResponseDto } from '../../domain/dtos/auth'
import { IccmsLoginPorts } from '../../domain/ports/auth'

@ApiTags('AUTHS')
@Controller('auths')
export class AuthsController {
  constructor(private readonly _ccmsLoginPorts: IccmsLoginPorts) {}

  @Post('ccmslogin')
  @ApiResponse({
    status: 200,
    description: 'OK Response',
    type: LoginResponseDto,
  })
  create(@Body() loginRequestDto: LoginRequestDto) {
    return this._ccmsLoginPorts.handle(loginRequestDto)
  }
}
