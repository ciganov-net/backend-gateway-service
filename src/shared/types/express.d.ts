import { GetAccountResponse } from '@ciganov/contracts/gen/account'

declare global {
	namespace Express {
		interface Request {
			user?: GetAccountResponse
		}
	}
}
