import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class LoginRequestDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly accessToken: string

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly username?: string
}

export class LoginResponseDto {
  @ApiProperty({
    description: '',
    required: false,
  })
  idccms?: number

  @ApiProperty({
    description: '',
    required: false,
  })
  username?: string

  @ApiProperty({
    description: '',
    required: false,
  })
  name?: string

  @ApiProperty({
    description: '',
    required: false,
  })
  charge?: string

  @ApiProperty({
    description: '',
    required: false,
  })
  rol?: string

  @ApiProperty({
    description: '',
    required: false,
  })
  photo?: string

  @ApiProperty({
    description: '',
    required: false,
  })
  token?: string
}
