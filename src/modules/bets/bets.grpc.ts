import { BettingServiceClient } from '@ciganov/contracts/dist/gen/betting'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { PlaceBetRequest } from './dto'

@Injectable()
export class BetClientGrpc {
	private betService: BettingServiceClient

	public constructor(
		@Inject('BETTING_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.betService =
			this.client.getService<BettingServiceClient>('BettingService')
	}

	public placeBet(request: PlaceBetRequest, userId: string) {
		return this.betService.placeBet({ ...request, userId })
	}
}
