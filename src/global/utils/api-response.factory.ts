import { ApiResponse } from '../types/api-response.type';

export class ApiResponseFactory {
    static success<T>(data: T): ApiResponse<T> {
        return {
            success: true,
            data,
            timestamp: new Date().toISOString(),
        };
    }

    static error<T>(code: string, message: string, details?: any): ApiResponse<T> {
        return {
            success: false,
            error: {
                code,
                message,
                details,
            },
            timestamp: new Date().toISOString(),
        };
    }

    static fromError<T>(error: Error & { code?: string; details?: any }): ApiResponse<T> {
        return {
            success: false,
            error: {
                code: error.code || 'INTERNAL_SERVER_ERROR',
                message: error.message,
                details: error.details,
            },
            timestamp: new Date().toISOString(),
        };
    }
} 