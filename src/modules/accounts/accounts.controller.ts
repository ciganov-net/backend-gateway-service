import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { AccountsClientGrpc } from './accounts.grpc'
import { ConfirmEmailChangeRequest, InitEmailChangeRequest } from './dto'
import { UserInfoResponse } from './dto/responses/user-info.response'

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
	@Protected()
	@ApiOperation({
		summary: 'Get user info',
		description: 'Getting user auth info: email, role etc'
	})
	@ApiResponse({
		type: UserInfoResponse
	})
	@Get('info')
	@HttpCode(HttpStatus.OK)
	public async userInfo(@CurrentUser('id') userId: string) {
		console.log(userId)
		return await lastValueFrom(this.client.getAccount(userId))
	}
}
