import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class GetMeResponse {
	@ApiProperty({
		example: 'YtK38fyhp0rmnP-3slKWu'
	})
	id: string

	@ApiPropertyOptional({
		example: 'Vadim'
	})
	displayName?: string

	@ApiPropertyOptional({
		example: 'some bio info'
	})
	bio?: string

	@ApiProperty({
		example: 'vadimdev@dev.dev'
	})
	email: string

	@ApiPropertyOptional({
		example: 0
	})
	successRate: number

	@ApiPropertyOptional({
		example: 0
	})
	loseAmount: number

	@ApiPropertyOptional({
		example: 'https://dev.dev/users/asdasdasda'
	})
	avatar: string
}
