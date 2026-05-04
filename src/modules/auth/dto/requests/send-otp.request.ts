import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SendOtpRequest {
	@ApiProperty({
		example: 'test@ciganov.net'
	})
	@IsString()
	@IsEmail()
	identifier: string
}
