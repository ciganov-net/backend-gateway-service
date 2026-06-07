import { OddFinishedEvent } from '@ciganov/contracts'
import { BettingServiceClient } from '@ciganov/contracts/dist/gen/betting'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc, ClientProxy } from '@nestjs/microservices'

import { PlaceBetRequest } from './dto'

@Injectable()
export class BetClientGrpc {
	private betService: BettingServiceClient

	public constructor(
		@Inject('BETTING_PACKAGE') private readonly clientPackage: ClientGrpc,
		@Inject('BETTING_CLIENT') private readonly clientClient: ClientProxy
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
}
