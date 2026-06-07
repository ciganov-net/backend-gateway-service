import { ApiProperty } from '@nestjs/swagger'

export class GetBetCountResponse {
	@ApiProperty()
	count: number
}
