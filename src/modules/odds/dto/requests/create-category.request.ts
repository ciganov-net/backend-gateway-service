import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryRequest {
	@ApiProperty({
		example: 'Спорт'
	})
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		example: 'sport'
	})
	@IsNotEmpty()
	@IsString()
	slug: string
}
