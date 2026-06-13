import { ApiProperty } from '@nestjs/swagger'

export class CoefficientResponse {
	@ApiProperty()
	coefficient: number
}
