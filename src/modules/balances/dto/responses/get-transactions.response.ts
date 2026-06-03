import { TransactionType } from '@ciganov/contracts/dist/gen/balance'

export class GetTransactionsResponse {
	transactions: {
		id: string
		type: TransactionType
		amount: number
		eventId: string
		createdAt: Date
	}
}
