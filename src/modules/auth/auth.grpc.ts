import { AuthServiceClient } from '@ciganov/contracts/dist/gen/auth'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService: AuthServiceClient

	public constructor(
		@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.authService = this.client.getService<AuthServiceClient>('AuthService')
	}

	public sendOtp(request: SendOtpRequest) {
		return this.authService.sendOtp(request)
	}

	public verifyOtp(request: VerifyOtpRequest) {
		return this.authService.verifyOtp(request)
	}

	public refreshToken(token: string) {
		return this.authService.refreshToken({ token })
	}

	public getSession(token: string) {
		return this.authService.getSessionByToken({ token })
	}

	public revoke(token: string) {
		return this.authService.refreshToken({ token })
	}

	public revokeAll(userId: string) {
		return this.authService.revokeAllSessions({ userId })
	}
}
