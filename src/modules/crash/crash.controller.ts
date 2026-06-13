import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { Protected } from '@/shared/decorators'

import { CrashService } from './crash.service'
import { CoefficientResponse } from './dto/responses'

@Controller('crash')
export class CrashController {
	constructor(private readonly crashService: CrashService) {}

	@Protected()
	@ApiOperation({
		summary: 'Generate coefficient',
		description: 'Generate coefficient for crash'
	})
	@ApiOkResponse({
		type: CoefficientResponse
	})
	@HttpCode(HttpStatus.OK)
	@Get('generate-coef')
	async generateCoef() {
		return await this.crashService.generateCoef()
	}
}
