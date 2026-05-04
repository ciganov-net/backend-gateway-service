import { ApiProperty } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length
} from 'class-validator'

export class VerifyOtpRequest {
	@ApiProperty({
		example: 'test@ciganov.net'
	})
	@IsString()
	@IsEmail()
	identifier: string

	@ApiProperty({
		example: '123456'
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string
}
