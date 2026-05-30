import { EventStatus } from '@ciganov/contracts/dist/gen/odd'
import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class CreateEventRequest {
	@ApiProperty({
		example: 'Пожмет ли диман сотку'
	})
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		example: EventStatus.LIVE
	})
	@IsNotEmpty()
	@IsEnum(EventStatus)
	status: EventStatus

	@ApiProperty({
		example: 'gz67RqfVsYULHfWvxT0bD'
	})
	@IsNotEmpty()
	@IsString()
	categoryId: string

	@ApiProperty({
		example: new Date()
	})
	@IsNotEmpty()
	@IsDate()
	start: Date

	@ApiProperty({
		example: new Date()
	})
	@IsNotEmpty()
	@IsDate()
	end: Date
}
