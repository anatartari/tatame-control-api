import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../types/api-response.type';
import { QueryFailedError } from 'typeorm';
import { ApiResponseFactory } from '../utils/api-response.factory';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorResponse: ApiResponse<null>;

        if (exception instanceof HttpException) {
            
            const error = exception.getResponse() as any;
            status = exception.getStatus();
            
            errorResponse = ApiResponseFactory.error(
                this.getErrorCode(status),
                error.message || error.error || exception.message,
                error.details
            );

        } else if (exception instanceof QueryFailedError) {
            status = HttpStatus.BAD_REQUEST;
            errorResponse = ApiResponseFactory.error(
                'DATABASE_ERROR',
                'Database operation failed',
                {
                    code: (exception as any).code,
                    detail: (exception as any).detail,
                }
            );
        } else if (exception instanceof Error) {
            errorResponse = ApiResponseFactory.fromError(exception);

        } else {
            errorResponse = ApiResponseFactory.error(
                'INTERNAL_SERVER_ERROR',
                'Internal server error'
            );
        }

        response.status(status).json(errorResponse);
    }

    private getErrorCode(status: number): string {
        const codes = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            409: 'CONFLICT',
            422: 'UNPROCESSABLE_ENTITY',
            429: 'TOO_MANY_REQUESTS',
            500: 'INTERNAL_SERVER_ERROR',
        };

        return codes[status] || 'INTERNAL_SERVER_ERROR';
    }
} 