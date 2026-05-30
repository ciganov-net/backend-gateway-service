import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { GetMeResponse, PatchUserRequest } from './dto'
import { UsersClientGrpc } from './users.grpc'

@Controller('users')
export class UsersController {
	constructor(private readonly client: UsersClientGrpc) {}

	@ApiOperation({
		summary: 'Get current user profile',
		description: 'Returns authenticated user profile data'
	})
	@ApiOkResponse({
		type: GetMeResponse
	})
	@Protected()
	@Get('@me')
	@HttpCode(HttpStatus.OK)
	public async getMe(@CurrentUser('id') userId: string) {
		const { user } = await lastValueFrom(this.client.getMe(userId))
		return user
	}

	@ApiOperation({
		summary: 'Patch the user',
		description: 'Patching the user '
	})
	@ApiOkResponse({
		type: Boolean
	})
	@Protected()
	@Patch('@me')
	@HttpCode(HttpStatus.OK)
	public async patchUser(
		@Body() dto: PatchUserRequest,
		@CurrentUser('id') userId: string
	) {
		const { ok } = await lastValueFrom(this.client.patch(userId, dto))
		return ok
	}
}
