import { UserServiceClient } from '@ciganov/contracts/dist/gen/user'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { PatchUserRequest } from './dto'

@Injectable()
export class UsersClientGrpc implements OnModuleInit {
	private userService: UserServiceClient

	public constructor(
		@Inject('USER_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.userService = this.client.getService<UserServiceClient>('UserService')
	}

	public getMe(userId: string) {
		return this.userService.getMe({ id: userId })
	}

	public patch(userId: string, request: PatchUserRequest) {
		return this.userService.patchUser({
			user: {
				email: '',
				id: userId,
				...request
			}
		})
	}
}
