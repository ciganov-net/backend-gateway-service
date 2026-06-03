import { ApiProperty } from '@nestjs/swagger'

export class OutcomeResponse {
	@ApiProperty()
	id: string
	@ApiProperty()
	eventId: string
	@ApiProperty()
	name: string
	@ApiProperty()
	coefficient: number
	@ApiProperty()
	isActive: boolean
}
