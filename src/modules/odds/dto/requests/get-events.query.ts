import { GetEventsRequest_SortBy } from '@ciganov/contracts/dist/gen/odd'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

export class GetEventsQuery {
	@ApiPropertyOptional()
	search?: string
	@ApiPropertyOptional()
	take?: number
	@ApiPropertyOptional()
	skip?: number
	@ApiPropertyOptional({
		enum: ['POPULAR', 'NEWEST', 'CLOSING_SOON', 'MORE_BETS', 'UNRECOGNIZED'],
		enumName: 'OddsControllerGetEventsOrderBy'
	})
	@IsEnum(GetEventsRequest_SortBy)
	orderBy?: GetEventsRequest_SortBy
	@ApiPropertyOptional()
	minCoefficient: number
	@ApiPropertyOptional()
	maxCoefficient: number
	@ApiPropertyOptional()
	outcomeTypes: string[]
}
