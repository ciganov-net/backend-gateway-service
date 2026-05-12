import type { GetAccountResponse } from '@ciganov/contracts/dist/gen/account'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'

export const CurrentUser = createParamDecorator(
	(key: keyof GetAccountResponse, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>()
		return key ? request.user[key] : request.user
	}
)
