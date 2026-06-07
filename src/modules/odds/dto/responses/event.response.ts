import { EventStatus } from '@ciganov/contracts/dist/gen/odd'
import { ApiProperty } from '@nestjs/swagger'

import { OutcomeResponse } from './outcome.response'

export class EventResponse {
	@ApiProperty()
	id: string
	@ApiProperty()
	name: string
	@ApiProperty()
	status: EventStatus
	@ApiProperty()
	categoryId: string
	@ApiProperty()
	categoryTitle: string
	@ApiProperty()
	badgeColor: string
	@ApiProperty()
	start: Date
	@ApiProperty()
	end: Date
	@ApiProperty()
	isLive: boolean
	@ApiProperty()
	outcomes: OutcomeResponse[]
}
