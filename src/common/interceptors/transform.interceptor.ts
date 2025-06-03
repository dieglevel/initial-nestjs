/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Lấy thông tin request để tùy biến message (vd: lấy path và method)
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    // Tạo message động dựa trên method và url
    const message = `Request ${method} ${url} executed successfully`;

    return next.handle().pipe(
      map((data) => ({
        message,
        statusCode: 200,
        data,
      })),
    );
  }
}
