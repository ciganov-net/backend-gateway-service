import { BalanceServiceClient } from '@ciganov/contracts/dist/gen/balance'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { AddTransactionRequest } from './dto'

@Injectable()
export class BalancesClientGrpc {
	private balanceService: BalanceServiceClient

	public constructor(
		@Inject('BALANCE_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.balanceService =
			this.client.getService<BalanceServiceClient>('BalanceService')
	}

	public addTransaction(request: AddTransactionRequest, userId: string) {
		return this.balanceService.addTransaction({ ...request, userId })
	}

	public getBalance(userId: string) {
		return this.balanceService.getBalance({ userId })
	}

	public getUserTransactions(userId: string) {
		return this.balanceService.getUserTransactions({ userId })
	}
}
