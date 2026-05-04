import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'
import type { Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly client: AuthClientGrpc,
		private readonly configService: ConfigService
	) {}

	@ApiOperation({
		summary: 'Send otp code',
		description: 'Sends a verification code to the user email'
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto)
	}

	@ApiOperation({
		summary: 'Verify otp code',
		description: 'Verifies a verification code sent to the user email'
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response
	) {
		const { token } = await lastValueFrom(this.client.verifyOtp(dto))
		res.cookie('session', token, {
			httpOnly: true,
			sameSite: 'lax',
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { ok: true }
	}
}
