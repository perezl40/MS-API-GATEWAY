/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

/** proto/auth.proto */

/** CcmsLogin */
export interface CcmsLoginRequest {
  accessToken: string;
  username: string;
}

export interface CcmsLoginResponse {
  idccms: number;
  username: string;
  name: string;
  charge: string;
  rol: string;
  photo: string;
  token: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  ccmsLogin(request: CcmsLoginRequest): Observable<CcmsLoginResponse>;
}

export interface AuthServiceController {
  ccmsLogin(request: CcmsLoginRequest): Promise<CcmsLoginResponse> | Observable<CcmsLoginResponse> | CcmsLoginResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["ccmsLogin"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
