import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { lastValueFrom } from 'rxjs'

import { AccountsClientGrpc } from '@/modules/accounts/accounts.grpc'
import { AuthClientGrpc } from '@/modules/auth/auth.grpc'

@Injectable()
export class SessionGuard implements CanActivate {
	constructor(
		private readonly authClient: AuthClientGrpc,
		private readonly accountClient: AccountsClientGrpc
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()
		const token = request.headers['x-session-token']

		if (typeof token !== 'string') throw new UnauthorizedException()

		if (!token) throw new UnauthorizedException()

		const { session } = await lastValueFrom(this.authClient.getSession(token))
		if (!session) throw new UnauthorizedException('Session expired')

		this.authClient.refreshToken(token)

		const user = await lastValueFrom(
			this.accountClient.getAccount(session.userId)
		)
		if (!user) throw new UnauthorizedException()

		request.user = user
		return true
	}
}
