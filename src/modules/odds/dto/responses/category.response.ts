import { ApiProperty } from '@nestjs/swagger'

export class CategoryResponse {
	@ApiProperty()
	id: string
	@ApiProperty()
	name: string
	@ApiProperty()
	slug: string
	@ApiProperty()
	isActive: boolean
	@ApiProperty()
	description: string
	@ApiProperty()
	image: string
	@ApiProperty()
	badgeColor: string
}
