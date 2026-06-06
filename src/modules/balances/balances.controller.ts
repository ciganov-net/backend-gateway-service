import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { BalancesClientGrpc } from './balances.grpc'
import {
	AddTransactionRequest,
	AddTransactionResponse,
	GetBalanceResponse,
	GetTransactionsResponse
} from './dto'

@Controller('balances')
export class BalancesController {
	constructor(private readonly client: BalancesClientGrpc) {}

	@ApiOperation({
		summary: 'User balance',
		description: 'Retrieving the user balance'
	})
	@ApiOkResponse({
		type: GetBalanceResponse
	})
	@Protected()
	@Get('balance')
	@HttpCode(HttpStatus.OK)
	async getBalance(@CurrentUser('id') userId: string) {
		const balance = await lastValueFrom(this.client.getBalance(userId))
		return balance
	}

	@ApiOperation({
		summary: 'User transactions',
		description: 'Retrieving the user transactions'
	})
	@ApiOkResponse({
		type: GetTransactionsResponse
	})
	@Protected()
	@Get('transaction')
	@HttpCode(HttpStatus.OK)
	async getTransactions(@CurrentUser('id') userId: string) {
		return await lastValueFrom(this.client.getUserTransactions(userId))
	}

	@ApiOperation({
		summary: 'Create transaction',
		description: 'Creating a new transaction for the user'
	})
	@ApiOkResponse({
		type: AddTransactionResponse
	})
	@Protected()
	@Post('transaction')
	@HttpCode(HttpStatus.OK)
	async addTransactions(
		@Body() dto: AddTransactionRequest,
		@CurrentUser('id') userId: string
	): Promise<AddTransactionResponse> {
		return await lastValueFrom(this.client.addTransaction(dto, userId))
	}
}
