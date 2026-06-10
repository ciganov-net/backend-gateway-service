import { Role } from '@ciganov/contracts/dist/gen/account'
import { ApiProperty } from '@nestjs/swagger'

export class UserInfoResponse {
	@ApiProperty()
	id: string
	@ApiProperty()
	email: string
	@ApiProperty()
	role: Role
}
