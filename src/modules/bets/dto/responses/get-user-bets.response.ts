import { BetStatus } from '@ciganov/contracts/dist/gen/betting'
import { ApiProperty } from '@nestjs/swagger'

export class GetUserBetsResponse {
	@ApiProperty()
	status: BetStatus
	@ApiProperty()
	createdAt: Date
	@ApiProperty()
	outcomeName: string
	@ApiProperty()
	eventName: string
	@ApiProperty()
	amount: number
	@ApiProperty()
	coefficient: number
	@ApiProperty()
	potentialPayout: number
	@ApiProperty()
	actualPayout: number
}
