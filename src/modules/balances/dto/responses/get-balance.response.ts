import { ApiProperty } from '@nestjs/swagger'

class Balance {
	@ApiProperty()
	id: string

	@ApiProperty()
	mainBalance: number

	@ApiProperty()
	bonusBalance: number

	@ApiProperty()
	freezeBalance: number
}

export class GetBalanceResponse {
	@ApiProperty()
	balance: Balance
}
