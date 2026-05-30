import { PromoType } from '@ciganov/contracts/dist/gen/bonus'

export class GetPromoCodesResponse {
	id: string
	code: string
	amount: number
	type: PromoType
	description: string
	activationCount: number
	expiresAt: Date
	isActive: boolean
}
