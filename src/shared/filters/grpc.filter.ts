import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from '@nestjs/common'
import type { Response } from 'express'

import { grpcToHttpStatus } from '../utils'

@Catch()
export class GrpcFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		if (this.isGrpcError(exception)) {
			const status = grpcToHttpStatus[exception.code] || 500

			return response.status(status).json({
				statusCode: status,
				message: exception.details || 'gRPC error'
			})
		}

		if (exception instanceof HttpException) {
			const status = exception.getStatus()

			return response.status(status).json({
				statusCode: status,
				message: exception.message || 'HTTP error'
			})
		}

		return response.status(500).json({
			statusCode: 500,
			message: 'Internal server error'
		})
	}

	private isGrpcError(exception: any) {
		return (
			typeof exception === 'object' &&
			'code' in exception &&
			'details' in exception
		)
	}
}
