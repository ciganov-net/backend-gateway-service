import { Role } from '@ciganov/contracts/dist/gen/account'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { AccountsClientGrpc } from '@/modules/accounts/accounts.grpc'
import { AuthClientGrpc } from '@/modules/auth/auth.grpc'

import { ROLES_KEY } from '../decorators'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (!required || required.length === 0) return true

		const request = context.switchToHttp().getRequest<Request>()

		const user = request.user

		if (!user) throw new ForbiddenException('User context missing')

		if (!required.includes(user.role))
			throw new ForbiddenException(
				'You dont have permission to access this resource'
			)
		return true
	}
}
