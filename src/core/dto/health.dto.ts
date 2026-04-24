import { ApiProperty } from '@nestjs/swagger'

export class HealthResponse {
	@ApiProperty({
		example: 'ok'
	})
	public status: string

	@ApiProperty({
		example: '2025-12-30T07:34:59.990Z'
	})
	public timestamp: string
}
