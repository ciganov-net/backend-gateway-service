import { ApiProperty } from '@nestjs/swagger'

export class GetWorstPlayersResponse {
	@ApiProperty()
	id: string
	@ApiProperty()
	displayName?: string
	@ApiProperty()
	avatar?: string
	@ApiProperty()
	bio?: string
	@ApiProperty()
	successRate?: number
	@ApiProperty()
	email: string
	@ApiProperty()
	loseAmount?: number
}
