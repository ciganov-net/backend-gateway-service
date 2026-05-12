import { AccountServiceClient } from '@ciganov/contracts/dist/gen/account'
import { Inject, Injectable } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { ConfirmEmailChangeRequest, InitEmailChangeRequest } from './dto'

@Injectable()
export class AccountsClientGrpc {
	private accountsService: AccountServiceClient

	public constructor(
		@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.accountsService =
			this.client.getService<AccountServiceClient>('AccountService')
	}

	public getAccount(id: string) {
		return this.accountsService.getAccount({ id })
	}

	public initEmailChange(userId: string, request: InitEmailChangeRequest) {
		return this.accountsService.initEmailChange({
			email: request.email,
			userId
		})
	}

	public confirmEmailChange(
		userId: string,
		request: ConfirmEmailChangeRequest
	) {
		return this.accountsService.confirmEmailChange({
			code: request.code,
			email: request.email,
			userId
		})
	}
}
