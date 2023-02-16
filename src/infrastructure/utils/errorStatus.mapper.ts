import { status } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'
import { HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class ErrorStatusMapper {
  grpcToHttpMapper(status: status): HttpStatus {
    const errors = {
      [Status.OK]: HttpStatus.OK,
      [Status.CANCELLED]: HttpStatus.METHOD_NOT_ALLOWED,
      [Status.UNKNOWN]: HttpStatus.BAD_GATEWAY,
      [Status.INVALID_ARGUMENT]: HttpStatus.UNPROCESSABLE_ENTITY,
      [Status.DEADLINE_EXCEEDED]: HttpStatus.REQUEST_TIMEOUT,
      [Status.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [Status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
      [Status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
      [Status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
      [Status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_REQUIRED,
      [Status.ABORTED]: HttpStatus.METHOD_NOT_ALLOWED,
      [Status.OUT_OF_RANGE]: HttpStatus.PAYLOAD_TOO_LARGE,
      [Status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
      [Status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
      [Status.UNAVAILABLE]: HttpStatus.NOT_FOUND,
      [Status.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR,
      [Status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
    }
    return errors[status] || HttpStatus.INTERNAL_SERVER_ERROR
  }
}
