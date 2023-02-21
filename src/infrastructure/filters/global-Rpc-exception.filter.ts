import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Request, Response } from 'express'

import { ErrorStatusMapper } from '../utils/errorStatus.mapper'
import {
  CustomExceptionDetails,
  CustomException,
} from '../../domain/interfaces/errors/Ierrors'

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const err = exception.getError()
    let _exception: CustomException<string>
    let details: CustomExceptionDetails

    if (typeof err === 'object') {
      _exception = err as CustomException<string>
      details = <CustomExceptionDetails>JSON.parse(_exception.details)
    }

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const mapper = new ErrorStatusMapper()
    const status = mapper.grpcToHttpMapper(_exception.code)
    const type = HttpStatus[status]
    const req: Request = ctx.getRequest<Request>()
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(`${req.url}`, req.method)
      Logger.error(
        `Type: ${details.type}, Message: ${details.details}`,
        details.domain,
      )
      details.details = 'Internal Server Error'
    }

    response.status(status).json({
      statusCode: status,
      message: details.details,
      error: type,
    })
  }
}
