import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { HealthResponse } from './dto'

@Controller()
export class AppController {
	@ApiOperation({
		summary: 'Health check',
		description: 'Checks if the gateway is running'
	})
	@ApiOkResponse({
		type: HealthResponse
	})
	@Get('health')
	public health() {
		return {
			status: 'ok',
			timestamp: new Date().toISOString()
		}
	}
}
