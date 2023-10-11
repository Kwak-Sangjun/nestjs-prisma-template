import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDTO } from '../models/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDTO> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data)) {
                    return new ResponseDTO(200, 'Success', data, data.length);
                } else {
                    return new ResponseDTO(200, 'Success', data, 0);
                }
            }),
        );
    }
}
