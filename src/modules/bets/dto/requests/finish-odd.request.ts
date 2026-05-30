import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class FinishOddRequest {
	@ApiProperty({
		example: 'gz67RqfVsYULHfWvxT0bD'
	})
	@IsNotEmpty()
	@IsString()
	eventId: string

	@ApiProperty({
		example: 'FINISHED'
	})
	@IsNotEmpty()
	@IsString()
	status: 'FINISHED' | 'CANCELLED'

	@ApiProperty({
		example: ['gz67RqfVsYULHfWvxT0bD', 'gz67RqfVsYULHfWvxT0bD']
	})
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	winningOutcomes: string[]
}
