import type { OddFinishedEvent } from '@ciganov/contracts'
import { Role } from '@ciganov/contracts/dist/gen/account'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { BetClientGrpc } from './bets.grpc'
import {
	FinishOddRequest,
	GetBetCountResponse,
	PlaceBetRequest,
	PlaceBetResponse
} from './dto'

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

	@ApiOperation({
		summary: 'Get bet count',
		description: 'Get bet count by event id'
	})
	@ApiOkResponse({
		type: GetBetCountResponse
	})
	@Protected()
	@Get('count/:eventId')
	@HttpCode(HttpStatus.OK)
	async getBetCount(
		@Param('eventId') id: string
	): Promise<GetBetCountResponse> {
		return await lastValueFrom(this.client.getCount(id))
	}

	@ApiOperation({
		summary: 'Finished the bet',
		description: 'Calculate the bid'
	})
	@ApiOkResponse({
		type: Boolean
	})
	@Protected(Role.ADMIN)
	@Post('finish-odd')
	@HttpCode(HttpStatus.OK)
	async finishedOdd(@Body() dto: FinishOddRequest): Promise<Boolean> {
		await lastValueFrom(this.client.finishedOdd(dto))
		return true
	}
}
