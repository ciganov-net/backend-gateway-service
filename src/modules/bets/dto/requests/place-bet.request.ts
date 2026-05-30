import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PlaceBetRequest {
	@ApiProperty({
		example: 'gz67RqfVsYULHfWvxT0bD'
	})
	@IsNotEmpty()
	@IsString()
	outcomeId: string

	@ApiProperty({
		example: 100.0
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number

	@ApiProperty({
		example: 1.2
	})
	@IsNotEmpty()
	@IsNumber()
	coefficient: number
}
