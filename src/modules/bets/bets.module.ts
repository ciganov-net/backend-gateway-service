import { PROTO_PATHS } from '@ciganov/contracts/dist/proto/paths'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { Transport } from '@nestjs/microservices/enums/transport.enum'
import { ClientsModule } from '@nestjs/microservices/module/clients.module'

import { BetsController } from './bets.controller'
import { BetClientGrpc } from './bets.grpc'

@Module({
	controllers: [BetsController],
	providers: [BetClientGrpc],
	imports: [
		ClientsModule.registerAsync([
			{
				name: 'BETTING_PACKAGE',
				useFactory: (configService: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'betting.v1',
						protoPath: PROTO_PATHS.BETTING,
						url: configService.getOrThrow<string>('BETTING_GRPC_URL')
					}
				}),
				inject: [ConfigService]
			}
		])
	]
})
export class BetsModule {}
