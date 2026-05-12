import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { AccountsClientGrpc } from './accounts.grpc'
import { ConfirmEmailChangeRequest, InitEmailChangeRequest } from './dto'

@Controller('accounts')
export class AccountsController {
	constructor(private readonly client: AccountsClientGrpc) {}

	
	@Protected()
	@ApiOperation({
		summary: 'Initialize email change',
		description: 'Sends a confirmation code to a new email address'
	})
	@Post('email/init')
	@HttpCode(HttpStatus.OK)
	public async initEmailChange(
		@CurrentUser('id') userId: string,
		@Body() dto: InitEmailChangeRequest
	) {
		return await lastValueFrom(this.client.initEmailChange(userId, dto))
	}
	@Protected()
	@ApiOperation({
		summary: 'Confirm email change',
		description: 'Verifies confirmation code and updates user email'
	})
	@Post('email/confirm')
	@HttpCode(HttpStatus.OK)
	public async confirmEmailChange(
		@CurrentUser('id') userId: string,
		@Body() dto: ConfirmEmailChangeRequest
	) {
		return await lastValueFrom(this.client.confirmEmailChange(userId, dto))
	}
}
