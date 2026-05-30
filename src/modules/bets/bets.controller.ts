import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { BetClientGrpc } from './bets.grpc'
import { PlaceBetRequest, PlaceBetResponse } from './dto'

@Controller('bets')
export class BetsController {
	constructor(private readonly client: BetClientGrpc) {}

	@ApiOperation({
		summary: 'Place a bet',
		description: 'Place a bet on a specific event'
	})
	@ApiOkResponse({
		type: PlaceBetResponse
	})
	@Protected()
	@Post('place')
	@HttpCode(HttpStatus.OK)
	async placeBet(
		@Body() dto: PlaceBetRequest,
		@CurrentUser('id') userId: string
	): Promise<PlaceBetResponse> {
		return await lastValueFrom(this.client.placeBet(dto, userId))
	}
}
