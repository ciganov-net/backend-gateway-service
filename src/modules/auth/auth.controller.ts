import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import type { Response } from 'express'
import { lastValueFrom } from 'rxjs'

import { Protected } from '@/shared/decorators'

import { AuthClientGrpc } from './auth.grpc'
import { SendOtpRequest, VerifyOtpRequest } from './dto'
import { SendOtpResponse, VerifyOtpResponse } from './dto/responses'

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
	@ApiResponse({
		type: SendOtpResponse
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public async sendOtp(@Body() dto: SendOtpRequest): Promise<SendOtpResponse> {
		return await lastValueFrom(this.client.sendOtp(dto))
	}

	@ApiOperation({
		summary: 'Verify otp code',
		description: 'Verifies a verification code sent to the user email'
	})
	@Post('otp/verify')
	@ApiResponse({
		type: VerifyOtpResponse
	})
	@HttpCode(HttpStatus.OK)
	public async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response
	): Promise<VerifyOtpResponse> {
		const { token } = await lastValueFrom(this.client.verifyOtp(dto))
		res.cookie('x-session-token', token, {
			httpOnly: true,
			sameSite: 'lax',
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			maxAge: 30 * 24 * 60 * 60 * 1000
		})

		return { ok: true }
	}

	@Protected()
	@ApiOperation({
		summary: 'Refresh token',
		description: 'Refreshing session token to 30days from'
	})
	@Post('tokens/refresh')
	@HttpCode(HttpStatus.OK)
	public async refreshToken(@Req() req: Request) {
		const token = req.headers['x-session-token']

		if (typeof token !== 'string') {
			throw new UnauthorizedException()
		}

		this.client.refreshToken(token)
		return
	}

	@Protected()
	@ApiOperation({
		summary: 'Get user session',
		description: 'Getting user session by token'
	})
	@Get('tokens/sessions')
	@HttpCode(HttpStatus.OK)
	public async getUserSession(@Req() req: Request) {
		const token = req.headers['x-session-token']

		if (typeof token !== 'string') {
			throw new UnauthorizedException()
		}
		const { session } = await lastValueFrom(this.client.getSession(token))
		return session
	}

	@Protected()
	@ApiOperation({
		summary: 'Revoke token',
		description: 'Revoke user session and logout'
	})
	@Post('tokens/revoke')
	@HttpCode(HttpStatus.OK)
	public revoke(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const token = req.headers['x-session-token']

		if (typeof token !== 'string') {
			throw new UnauthorizedException()
		}

		this.client.revoke(token)

		res.cookie('x-session-token', '', {
			httpOnly: true,
			sameSite: 'lax',
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			expires: new Date(0)
		})
		return
	}

	@Protected()
	@ApiOperation({
		summary: 'Revoke all tokens',
		description: 'Revoke all user session and logout'
	})
	@Post('tokens/revoke-all')
	@HttpCode(HttpStatus.OK)
	public revokeAll(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const token = req.headers['x-session-token']

		if (typeof token !== 'string') {
			throw new UnauthorizedException()
		}

		this.client.revoke(token)

		res.cookie('x-session-token', '', {
			httpOnly: true,
			sameSite: 'lax',
			secure:
				this.configService.getOrThrow<string>('NODE_ENV') !== 'development',
			domain: this.configService.getOrThrow<string>('COOKIES_DOMAIN'),
			expires: new Date(0)
		})
		return
	}
}
