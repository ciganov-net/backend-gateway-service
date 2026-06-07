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

	@ApiProperty({
		example: 'description'
	})
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000.png'
	})
	@IsNotEmpty()
	@IsString()
	image: string

	@ApiProperty({
		example: 'red'
	})
	@IsNotEmpty()
	@IsString()
	badgeColor: string
}
