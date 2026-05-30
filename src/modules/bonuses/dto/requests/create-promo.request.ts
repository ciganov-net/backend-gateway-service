import { PromoType } from '@ciganov/contracts/dist/gen/bonus'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	IsDate,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString
} from 'class-validator'

export class CreatePromoRequest {
	@ApiProperty({
		example: 'PROMO2026'
	})
	@IsNotEmpty()
	@IsString()
	code: string

	@ApiProperty({
		example: 100
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number

	@ApiProperty({
		example: PromoType.FIXED
	})
	@IsNotEmpty()
	@IsEnum(PromoType)
	type: PromoType

	@ApiProperty({
		example: 'example description'
	})
	@IsNotEmpty()
	@IsString()
	description?: string

	@ApiProperty({
		example: new Date()
	})
	@Type(() => Date)
	@IsNotEmpty()
	@IsDate()
	expiresAt: Date

	@ApiProperty({
		example: 100
	})
	@IsNotEmpty()
	@IsInt()
	activationCount: number
}
