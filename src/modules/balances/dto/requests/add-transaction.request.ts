import { TransactionType } from '@ciganov/contracts/dist/gen/balance'
import { ApiProperty } from '@nestjs/swagger'
import {
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator'

export class AddTransactionRequest {
	@ApiProperty({
		example: TransactionType.BET_FREEZE
	})
	@IsNotEmpty()
	@IsEnum(TransactionType)
	type: TransactionType

	@ApiProperty({
		example: 100.0
	})
	@IsInt()
	@IsNotEmpty()
	amount: number

	@ApiProperty({
		example: 'gz67RqfVsYULHfWvxT0bD'
	})
	@IsOptional()
	@IsString()
	eventId?: string

	@ApiProperty({
		example: 1.2
	})
	@IsOptional()
	@IsInt()
	multiplier?: number
}
