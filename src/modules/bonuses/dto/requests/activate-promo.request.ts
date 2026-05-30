import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ActivatePromoRequest {
	@ApiProperty({
		example: 'PROMO2023'
	})
	@IsNotEmpty()
	@IsString()
	code: string
}
