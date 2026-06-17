import { OddFinishedEvent } from '@ciganov/contracts'
import { BettingServiceClient } from '@ciganov/contracts/dist/gen/betting'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc, ClientProxy, RmqContext } from '@nestjs/microservices'

import { RabbitmqService } from '@/infrastructure/rabbitmq/rabbitmq.service'

import { BetsWebsocketGateway } from './bets.ws'
import { PlaceBetRequest, WsPayload } from './dto'
import { GetUserBetsResponse } from './dto/responses/get-user-bets.response'

@Injectable()
export class BetClientGrpc {
	private betService: BettingServiceClient

	public constructor(
		@Inject('BETTING_PACKAGE') private readonly clientPackage: ClientGrpc,
		@Inject('BETTING_CLIENT') private readonly clientClient: ClientProxy,
		private readonly betWebsocket: BetsWebsocketGateway,
		private readonly rmqService: RabbitmqService
	) {}

	public onModuleInit() {
		this.betService =
			this.clientPackage.getService<BettingServiceClient>('BettingService')
	}

	public placeBet(request: PlaceBetRequest, userId: string) {
		return this.betService.placeBet({ ...request, userId })
	}

	public finishedOdd(request: OddFinishedEvent) {
		return this.clientClient.emit('odd.finished.request', request)
	}

	public getCount(eventId: string) {
		return this.betService.getBetCountByEvent({ eventId })
	}

	public notify(payload: WsPayload, ctx: RmqContext) {
		try {
			this.betWebsocket.notify(payload)
			this.rmqService.ack(ctx)
		} catch (e) {
			this.rmqService.nack(ctx)
		}
	}

	public getUserBets(id: string) {
		return this.betService.getUserBets({ userId: id })
	}
}
