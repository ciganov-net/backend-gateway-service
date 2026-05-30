import { Role } from '@ciganov/contracts/dist/gen/account'
import { protoToDate } from '@ciganov/core'
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post
} from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { lastValueFrom } from 'rxjs'

import { CurrentUser, Protected } from '@/shared/decorators'

import { BonusesClientGrpc } from './bonuses.grpc'
import {
	ActivatePromoRequest,
	ActivatePromoResponse,
	CreatePromoRequest,
	CreatePromoResponse,
	GetPromoCodesResponse
} from './dto'

@Controller('bonuses')
export class BonusesController {
	constructor(private readonly client: BonusesClientGrpc) {}

	@ApiOperation({
		summary: 'Get promo codes',
		description: 'Retrieving the list of promo codes'
	})
	@ApiOkResponse({
		type: GetPromoCodesResponse
	})
	@Protected(Role.ADMIN)
	@Get('all')
	async getPromoCodes(): Promise<GetPromoCodesResponse[]> {
		const response = await lastValueFrom(this.client.getPromoCodes())
		return response?.promocodes?.map(value => {
			return {
				...value,
				expiresAt: protoToDate(value.expiresAt)
			}
		})
	}

	@ApiOperation({
		summary: 'Activate promo code',
		description: 'Activate promo code for the user'
	})
	@ApiOkResponse({
		type: ActivatePromoResponse
	})
	@Protected()
	@Post('activate')
	@HttpCode(HttpStatus.OK)
	async activatePromo(
		@CurrentUser('id') userId: string,
		@Body() dto: ActivatePromoRequest
	): Promise<ActivatePromoResponse> {
		return await lastValueFrom(this.client.activatePromoCode(dto, userId))
	}

	@ApiOperation({
		summary: 'Create promo code',
		description: 'Create promo code'
	})
	@ApiOkResponse({
		type: CreatePromoResponse
	})
	@Protected()
	@Post('create')
	@HttpCode(HttpStatus.OK)
	async create(@Body() dto: CreatePromoRequest): Promise<CreatePromoResponse> {
		return await lastValueFrom(this.client.createPromoCode(dto))
	}
}
