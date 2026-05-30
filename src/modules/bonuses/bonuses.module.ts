import { PROTO_PATHS } from '@ciganov/contracts'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { BonusesController } from './bonuses.controller'
import { BonusesClientGrpc } from './bonuses.grpc'

@Module({
	controllers: [BonusesController],
	providers: [BonusesClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BONUS_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'bonus.v1',
						protoPath: PROTO_PATHS.BONUS,
						url: configService.getOrThrow<string>('BONUS_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	]
})
export class BonusesModule {}
