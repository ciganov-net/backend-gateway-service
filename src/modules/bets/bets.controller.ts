import type { OddFinishedEvent, OddResolvedEvent } from '@ciganov/contracts'
import { Role } from '@ciganov/contracts/dist/gen/account'
import { BetStatus } from '@ciganov/contracts/dist/gen/betting'
import { convertEnum, protoToDate } from '@ciganov/core'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
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
import { GetUserBetsResponse } from './dto/responses/get-user-bets.response'

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
	@Get('count/:eventId')
	@HttpCode(HttpStatus.OK)
	async getBetCount(
		@Param('eventId') id: string
	): Promise<GetBetCountResponse> {
		return await lastValueFrom(this.client.getCount(id))
	}

	@ApiOperation({
		summary: 'Get user bets',
		description: 'Get all user bets'
	})
	@ApiOkResponse({
		type: [GetUserBetsResponse]
	})
	@Protected()
	@Get('user-bets')
	@HttpCode(HttpStatus.OK)
	async getUserBets(
		@CurrentUser('id') id: string
	): Promise<GetUserBetsResponse[]> {
		const bets = await lastValueFrom(this.client.getUserBets(id))

		return bets.bets.map(value => ({
			status: convertEnum(BetStatus, value.status),
			actualPayout: value.actualPayout,
			amount: value.amount,
			coefficient: value.totalCoefficient,
			createdAt: protoToDate(value.createdAt),
			eventName: value.eventName,
			outcomeName: value.outcomeName,
			potentialPayout: value.potentialPayout
		}))
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

	@EventPattern('bet.resolved')
	async handleBetResolved(
		@Payload() data: OddResolvedEvent,
		@Ctx() ctx: RmqContext
	) {
		this.client.notify(data, ctx)
	}
}
