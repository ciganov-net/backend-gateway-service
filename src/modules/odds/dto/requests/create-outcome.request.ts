import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOutcomeRequest {
	@ApiProperty({
		example: 'gz67RqfVsYULHfWvxT0bD'
	})
	@IsNotEmpty()
	@IsString()
	eventId: string

	@ApiProperty({
		example: 'Нет'
	})
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		example: 1.2
	})
	@IsNotEmpty()
	@IsNumber()
	coefficient: number
}
