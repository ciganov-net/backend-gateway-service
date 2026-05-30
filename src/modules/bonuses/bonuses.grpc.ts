import { BonusServiceClient } from '@ciganov/contracts/dist/gen/bonus'
import { dateToProto, protoToDate } from '@ciganov/core'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { ActivatePromoRequest, CreatePromoRequest } from './dto'

@Injectable()
export class BonusesClientGrpc {
	private bonusService: BonusServiceClient

	public constructor(
		@Inject('BONUS_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.bonusService =
			this.client.getService<BonusServiceClient>('BonusService')
	}

	public getPromoCodes() {
		return this.bonusService.getPromoCodes({})
	}

	public activatePromoCode(request: ActivatePromoRequest, userId: string) {
		return this.bonusService.activatePromoCode({ ...request, userId })
	}

	public createPromoCode(request: CreatePromoRequest) {
		return this.bonusService.createPromoCode({
			activationCount: request.activationCount,
			amount: request.amount,
			code: request.code,
			description: request.description,
			expiresAt: dateToProto(request.expiresAt),
			type: request.type
		})
	}
}
