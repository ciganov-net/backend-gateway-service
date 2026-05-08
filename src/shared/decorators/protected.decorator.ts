import { Role } from '@ciganov/contracts/gen/account'
import { applyDecorators, UseGuards } from '@nestjs/common'

import { RolesGuard, SessionGuard } from '../guards'

import { Roles } from './roles.decorator'

export const Protected = (...roles: Role[]) => {
	if (roles.length === 0) return applyDecorators(UseGuards(SessionGuard))

	return applyDecorators(Roles(...roles), UseGuards(SessionGuard, RolesGuard))
}
