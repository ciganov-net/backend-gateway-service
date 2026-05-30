import { EventStatus } from '@ciganov/contracts/dist/gen/odd'

import { OutcomeResponse } from './outcome.response'

export class EventResponse {
	id: string
	name: string
	status: EventStatus
	categoryId: string
	start: Date
	end: Date
	isLive: boolean
	outcomes: OutcomeResponse[]
}
