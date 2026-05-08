import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator'

export class ConfirmEmailChangeRequest {
	@ApiProperty({
		example: 'vadim@test.ru'
	})
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty({
		example: '123456'
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string
}
