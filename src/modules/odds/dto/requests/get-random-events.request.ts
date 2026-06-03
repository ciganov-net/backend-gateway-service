import { ApiProperty } from '@nestjs/swagger'

export class GetRandomEventsRequest {
	@ApiProperty()
	randomCount: number
}
