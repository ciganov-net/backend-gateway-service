import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class InitEmailChangeRequest {
	@ApiProperty({
		example: 'vadim@test.ru'
	})
	@IsNotEmpty()
	@IsEmail()
	email: string
}
