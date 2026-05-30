import { PROTO_PATHS } from '@ciganov/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { BalancesController } from './balances.controller'
import { BalancesClientGrpc } from './balances.grpc'

@Module({
	controllers: [BalancesController],
	providers: [BalancesClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BALANCE_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'balance.v1',
						protoPath: PROTO_PATHS.BALANCE,
						url: configService.getOrThrow<string>('BALANCE_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	]
})
export class BalancesModule {}
