import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ResponseDTO } from '../models/response.dto';

@Catch()
export class RestExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // HttpException이 아닌 경우
        let status = 500;
        let message = 'Runtime Error : Internal Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message || exception.getResponse()?.toString();
        } else {
            console.error('Unexpected error:', exception);
        }

        const errorResponse = new ResponseDTO(status, message, null, 0);
        response.status(status).json(errorResponse);
    }
}
