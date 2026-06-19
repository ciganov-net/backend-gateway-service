import { ApiPropertyOptional } from '@nestjs/swagger'

export class PatchUserRequest {
	@ApiPropertyOptional({
		example: 'Vadim'
	})
	displayName?: string

	@ApiPropertyOptional({
		example: 'some bio info'
	})
	bio?: string

	@ApiPropertyOptional({
		example: 0
	})
	successRate: number

	@ApiPropertyOptional({
		example: 0
	})
	loseAmount: number

	@ApiPropertyOptional({
		example: "somefile.png"
	})
	avatar?: string
}
