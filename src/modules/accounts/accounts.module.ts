import { PROTO_PATHS } from '@ciganov/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AccountsController } from './accounts.controller'
import { AccountsClientGrpc } from './accounts.grpc'

@Module({
	controllers: [AccountsController],
	providers: [AccountsClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'ACCOUNT_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'account.v1',
						protoPath: PROTO_PATHS.ACCOUNT,
						url: configService.getOrThrow<string>('AUTH_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	]
})
export class AccountsModule {}
